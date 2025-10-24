#!/usr/bin/env node
/* eslint-disable */
/* global require, __dirname, process, module */
/*
Find duplicate asset files by content hash under public/.
Usage:
  node scripts/find-duplicate-assets.js [--paths backgrounds,characters,props,ui,audio] [--ext png,jpg,jpeg,webp,svg,mp3,wav,ogg]
*/
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..', 'public');
const arg = (k, d) => {
  const i = process.argv.findIndex(a => a === k || a.startsWith(k+'='));
  if (i === -1) return d;
  const v = process.argv[i].includes('=') ? process.argv[i].split('=')[1] : process.argv[i+1];
  return v ?? d;
};

const includePaths = (arg('--paths', 'backgrounds,characters,props,ui,audio') || '').split(',').filter(Boolean);
const exts = (arg('--ext', 'png,jpg,jpeg,webp,svg,mp3,wav,ogg') || '').split(',').map(s=>s.trim().toLowerCase());

function* walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      yield* walk(p);
    } else if (e.isFile()) {
      yield p;
    }
  }
}

function sha1File(file) {
  const h = crypto.createHash('sha1');
  const data = fs.readFileSync(file);
  h.update(data);
  return h.digest('hex');
}

function main() {
  const targets = includePaths.map(p => path.join(root, p));
  const files = [];
  for (const t of targets) {
    if (!fs.existsSync(t)) continue;
    for (const f of walk(t)) {
      const ext = path.extname(f).slice(1).toLowerCase();
      if (!exts.includes(ext)) continue;
      files.push(f);
    }
  }
  const byHash = new Map();
  for (const f of files) {
    try {
      const h = sha1File(f);
      const arr = byHash.get(h) || [];
      arr.push(f.replace(root, 'public'));
      byHash.set(h, arr);
  } catch (e) { /* ignore read/hash errors */ }
  }
  const dups = [...byHash.entries()].filter(([_, arr]) => arr.length > 1);
  if (dups.length === 0) {
    console.log('No duplicate assets found by content hash.');
    return;
  }
  console.log(`Found ${dups.length} duplicate groups:`);
  dups.forEach(([h, arr], i) => {
    console.log(`\n#${i+1} ${h}`);
    arr.forEach(p => console.log(' -', p));
  });
}

if (require.main === module) main();
