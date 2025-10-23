// ===================================
// AUDIO ASSETS - CHAKRA HEARTS
// ===================================

// === BACKGROUND MUSIC ===
export const BGM = {
  AURORA_THEME: "/audio/bgm/aurora_theme.mp3",
  COMBAT_THEME: "/audio/bgm/combat_theme.mp3",
  TENSION_THEME: "/audio/bgm/tension_theme.mp3",
  TEMPLE_AMBIENT: "/audio/bgm/temple_ambient.mp3",
  MENU_THEME: "/audio/bgm/menu_theme.wav",
} as const;

// === SOUND EFFECTS ===
export const SFX = {
  // Note: SFX system disabled for cleaner audio experience
  // Add future sound effects here if needed
} as const;

// === VOICE ACTING ===
export const VOICE = {
  // Add voice acting files here when implemented
} as const;

// === COMBINED AUDIO EXPORT ===
export const AUDIO = {
  BGM,
  SFX,
  VOICE,
} as const;
