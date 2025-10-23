#!/usr/bin/env node
// Asset audit utility — see documentation block below for usage.
  /*
    Asset audit: Lists assets in public/ that are not referenced by the code.
    - Default: dry-run report
    - Use --delete to remove unreferenced files

    Strategy:
    1) Parse src/assets/*.ts to collect asset maps (e.g., BACKGROUNDS, PROLOGUE_BACKGROUNDS, PROPS, TRANSITIONS, UI).
    2) For each exported map, collect keys and file paths.
    3) Scan source files for usage patterns like MAP.KEY (e.g., BACKGROUNDS.LOTUS_BIRTH_VOID) to build a set of used keys.
    4) Convert used keys to used file paths. Everything else from the maps is considered unused (from the app code perspective).
    5) Compare used file paths to actual files in public/ and report unreferenced files. Optionally delete them with --delete.
  */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src");
const ASSETS_DIR = path.join(SRC, "assets");
const PUBLIC_DIR = path.join(ROOT, "public");

const DELETE = process.argv.includes("--delete");
const TRASH = process.argv.includes("--trash");

/** Read text file */
function read(file) {
  return fs.readFileSync(file, "utf8");
}

/** Recursively list files under dir matching extensions */
function listFiles(dir, exts = [".ts", ".tsx", ".js"]) {
  const out = [];
  (function walk(d) {
    const entries = fs.readdirSync(d, { withFileTypes: true });
    for (const e of entries) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (exts.includes(path.extname(p))) out.push(p);
    }
  })(dir);
  return out;
}

/** Gather maps from src/assets/*.ts by simple regex parsing */
function parseAssetMaps() {
  const files = [
    "backgrounds.ts",
    "props.ts",
    "ui.ts",
    "characters.ts",
  ].map((f) => path.join(ASSETS_DIR, f)).filter(fs.existsSync);

  const maps = {}; // mapName -> { key -> filePath }
  const mapDecl = /export\s+const\s+([A-Z_]+)\s*=\s*\{([\s\S]*?)\}\s*as\s*const\s*;/g;
  const entry = /(\w+)\s*:\s*"([^"]+)"/g;

  for (const file of files) {
    const txt = read(file);
    let m;
    while ((m = mapDecl.exec(txt))) {
      const mapName = m[1];
      const body = m[2];
      let e;
      while ((e = entry.exec(body))) {
        const key = e[1];
        const val = e[2];
        if (!maps[mapName]) maps[mapName] = {};
        maps[mapName][key] = val;
      }
    }
  }
  // Compose synthetic maps for combined exports
  if (maps.MENU_UI || maps.DIALOGUE_UI || maps.CHOICE_UI || maps.ROMANCE_UI || maps.PROGRESSION_UI || maps.EDUCATIONAL_UI) {
    maps.UI = Object.assign(
      {},
      maps.MENU_UI || {},
      maps.DIALOGUE_UI || {},
      maps.CHOICE_UI || {},
      maps.ROMANCE_UI || {},
      maps.PROGRESSION_UI || {},
      maps.EDUCATIONAL_UI || {}
    );
  }
  if (maps.MAIN_CHARACTERS || maps.SPIRITUAL_CHARACTERS) {
    maps.CHARACTERS = Object.assign({}, maps.MAIN_CHARACTERS || {}, maps.SPIRITUAL_CHARACTERS || {});
  }
  return maps;
}

/** Scan for usage of map keys like MAP.KEY in src */
function findUsedKeys(maps) {
  const codeFiles = listFiles(SRC, [".ts", ".tsx"]);
  const used = new Set(); // mapName.key
  for (const file of codeFiles) {
    const txt = read(file);
    for (const mapName of Object.keys(maps)) {
      const regex = new RegExp(`${mapName}\\.(\\w+)`, "g");
      let m;
      while ((m = regex.exec(txt))) {
        const key = m[1];
        if (maps[mapName] && maps[mapName][key]) {
          used.add(`${mapName}.${key}`);
        }
      }
    }
  }
  return used;
}

function toFileSet(maps, keySet) {
  const usedFiles = new Set();
  for (const mk of keySet) {
    const [mapName, key] = mk.split(".");
    const p = maps[mapName]?.[key];
    if (p) usedFiles.add(p);
  }
  return usedFiles;
}

/** List all files under public that look like assets */
function listPublicAssets() {
  const allowed = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"]);
  const files = [];
  (function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (allowed.has(path.extname(p).toLowerCase())) {
        const rel = "/" + path.relative(PUBLIC_DIR, p).split(path.sep).join("/");
        files.push({ abs: p, rel });
      }
    }
  })(PUBLIC_DIR);
  return files;
}

function main() {
  const maps = parseAssetMaps();
  const usedKeys = findUsedKeys(maps);
  const usedFiles = toFileSet(maps, usedKeys);
  const publicFiles = listPublicAssets();

  const unreferenced = publicFiles.filter((f) => !usedFiles.has(f.rel));

  console.log(`\nAsset Audit Report`);
  console.log(`──────────────────`);
  console.log(`Used assets (by code): ${usedFiles.size}`);
  console.log(`Public asset files:    ${publicFiles.length}`);
  console.log(`Unreferenced files:    ${unreferenced.length}`);

  if (unreferenced.length) {
    console.log(`\nUnreferenced assets:`);
    unreferenced.slice(0, 2000).forEach((f) => console.log(`  ${f.rel}`));
  }

  if ((DELETE || TRASH) && unreferenced.length) {
    if (TRASH) {
      const stamp = new Date().toISOString().replace(/[:.]/g, "-");
      const trashDir = path.join(PUBLIC_DIR, "_trash", stamp);
      fs.mkdirSync(trashDir, { recursive: true });
      console.log(`\nMoving ${unreferenced.length} files to ${path.relative(PUBLIC_DIR, trashDir)} ...`);
      for (const f of unreferenced) {
        try {
          const dest = path.join(trashDir, f.rel.replace(/^[\/\\]/, "").split("/").join(path.sep));
          const destDir = path.dirname(dest);
          fs.mkdirSync(destDir, { recursive: true });
          fs.renameSync(f.abs, dest);
          console.log(`moved: ${f.rel}`);
        } catch (e) {
          console.warn(`failed move: ${f.rel}`, e.message);
        }
      }
    } else if (DELETE) {
      console.log(`\nDeleting ${unreferenced.length} files...`);
      for (const f of unreferenced) {
        try {
          fs.unlinkSync(f.abs);
          console.log(`deleted: ${f.rel}`);
        } catch (e) {
          console.warn(`failed: ${f.rel}`, e.message);
        }
      }
    }
  } else if (!DELETE) {
    console.log(`\nDry run only. Re-run with --trash to move files to public/_trash or --delete to remove unreferenced files.`);
  }
}

main();
