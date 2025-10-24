// ===================================
// CHARACTER ASSETS - CHAKRA HEARTS
// ===================================

// === MAIN CHARACTERS ===
export const MAIN_CHARACTERS = {
  // David - The Soldier
  // Append a version to bust browser cache when the image is updated
  DAVID_BASE: "/characters/finaldavid.png?v=3",

  // Elena - The Former Reality Star Turned Mystic
  ELENA_BASE: "/characters/elena_base_portrait.png",

  // MC - Player Character (Customizable)
  MC_BASE: "/characters/mc_avatar_portrait.png",
} as const;

// === SPIRITUAL CHARACTERS ===
export const SPIRITUAL_CHARACTERS = {
  // Agnivesh - The Panther Spirit
  AGNIVESH_BASE: "/characters/agnivesh_panther_base.png", // Animal form
  AGNIVESH_HUMAN: "/characters/agnivesh_human_portrait.png", // Human form

  // Santi - The Serpent Spirit
  SANTI_BASE: "/characters/santi_serpent_base.png", // Animal form
  SANTI_HUMAN: "/characters/finalsanti.png", // Human form

  // System Consciousnesses
  AURORA_BASE: "/characters/aurora.png",
  // Temporary placeholder until Umbra art is available
  UMBRA_BASE: "/characters/aurora.png",
} as const;

// === PLAYER AVATARS ===
export const AVATARS = {
  BINARY: "/avatars/av_binary.png",
  IRON: "/avatars/av_iron.png",
  LOTUS: "/avatars/av_lotus.png",
  NOMAD: "/avatars/av_nomad.png",
  OCEAN: "/avatars/av_ocean.png",
  SKY: "/avatars/av_sky.png",
  STONE: "/avatars/av_stone.png",
} as const;

// === EPISODE 2 CHARACTERS ===
export const EP2_CHARACTERS = {
  CAMILLA: "/characters/ep2/episode2/camilla.png",
  CAMILLA_SACRAL_GLOW: "/characters/ep2/episode2/camilla_sacral_glow.png",
  MERT: "/characters/ep2/episode2/mert.png",
  DIEGO: "/characters/ep2/episode2/diego.png",
};

// === COMBINED CHARACTERS EXPORT ===
export const CHARACTERS = {
  // Main characters
  ...MAIN_CHARACTERS,

  // Spiritual characters
  ...SPIRITUAL_CHARACTERS,

  // Episode 2
  ...EP2_CHARACTERS,

  // Legacy compatibility
  DAVID_BASE: MAIN_CHARACTERS.DAVID_BASE,
  ELENA_BASE: MAIN_CHARACTERS.ELENA_BASE,
  AGNIVESH_BASE: SPIRITUAL_CHARACTERS.AGNIVESH_BASE,
  AGNIVESH_HUMAN: SPIRITUAL_CHARACTERS.AGNIVESH_HUMAN,
  SANTI_BASE: SPIRITUAL_CHARACTERS.SANTI_BASE,
  SANTI_HUMAN: SPIRITUAL_CHARACTERS.SANTI_HUMAN,
  AURORA_BASE: SPIRITUAL_CHARACTERS.AURORA_BASE,
  UMBRA_BASE: SPIRITUAL_CHARACTERS.UMBRA_BASE,
  MC_BASE: MAIN_CHARACTERS.MC_BASE,
} as const;
