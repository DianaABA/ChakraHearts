// ===================================
// CHAKRA HEARTS - ASSET MANIFEST
// ===================================
// Organized asset management for visual novel
// Separated by category for better maintainability

// === IMPORT ORGANIZED ASSET MODULES ===
import {
  BACKGROUNDS,
  EPISODE_BACKGROUNDS,
  PROLOGUE_BACKGROUNDS,
  EPILOGUE_BACKGROUNDS,
} from "./backgrounds";

import {
  CHARACTERS,
  MAIN_CHARACTERS,
  SPIRITUAL_CHARACTERS,
  AVATARS,
} from "./characters";

import {
  UI,
  MENU_UI,
  DIALOGUE_UI,
  CHOICE_UI,
  ROMANCE_UI,
  PROGRESSION_UI,
} from "./ui";

import { PROPS, TRANSITIONS, VFX } from "./props";

import { AUDIO, BGM, SFX } from "./audio";

// === MAIN EXPORTS ===
// These maintain backward compatibility with existing code

export {
  // Background systems
  BACKGROUNDS,
  PROLOGUE_BACKGROUNDS,
  EPILOGUE_BACKGROUNDS,

  // Character systems
  CHARACTERS,
  AVATARS,

  // UI systems
  UI,

  // Props & effects
  PROPS,
  TRANSITIONS,

  // Audio systems
  AUDIO,
};

// === ORGANIZED EXPORTS ===
// These provide the new organized structure

export {
  // Background categories
  EPISODE_BACKGROUNDS,

  // Character categories
  MAIN_CHARACTERS,
  SPIRITUAL_CHARACTERS,

  // UI categories
  MENU_UI,
  DIALOGUE_UI,
  CHOICE_UI,
  ROMANCE_UI,
  PROGRESSION_UI,

  // Effect categories
  VFX,

  // Audio categories
  BGM,
  SFX,
};

// === COMBINED ASSETS OBJECT ===
// For compatibility with existing asset loading systems
export const ASSETS = {
  // Main categories
  backgrounds: BACKGROUNDS,
  prologueBackgrounds: PROLOGUE_BACKGROUNDS,
  epilogueBackgrounds: EPILOGUE_BACKGROUNDS,
  characters: CHARACTERS,
  props: PROPS,
  ui: UI,
  transitions: TRANSITIONS,
  avatars: AVATARS,
  audio: AUDIO,

  // Organized subcategories
  episodeBackgrounds: EPISODE_BACKGROUNDS,
  mainCharacters: MAIN_CHARACTERS,
  spiritualCharacters: SPIRITUAL_CHARACTERS,
  menuUI: MENU_UI,
  dialogueUI: DIALOGUE_UI,
  choiceUI: CHOICE_UI,
  romanceUI: ROMANCE_UI,
  progressionUI: PROGRESSION_UI,
  vfx: VFX,
  bgm: BGM,
  sfx: SFX,
} as const;

// === ASSET CATEGORIES ===
// For dynamic asset loading and organization
export const ASSET_CATEGORIES = {
  BACKGROUNDS: "backgrounds",
  PROLOGUE: "prologue",
  EPILOGUE: "epilogue",
  CHARACTERS: "characters",
  UI: "ui",
  PROPS: "props",
  AUDIO: "audio",
  TRANSITIONS: "transitions",
} as const;

// === ASSET MANIFEST INFO ===
export const ASSET_INFO = {
  version: "1.0.0",
  lastUpdated: "2025-10-22",
  totalAssets: Object.keys(ASSETS).length,
  categories: Object.keys(ASSET_CATEGORIES),
} as const;
