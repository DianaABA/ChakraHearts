// ===================================
// PROPS & EFFECTS - CHAKRA HEARTS
// ===================================

// === INTERACTIVE PROPS ===
export const PROPS = {
  BRACELET_MUD: "/props/prop_bracelet_mud.png",
  CHOCOLATE_MASTER: "/props/prop_chocolate_master.png",
  DOGTAG_CLOSEUP: "/props/prop_dogtag_closeup.png",
  DOGTAG_IN_HAND: "/props/prop_dogtag_in_hand.png",
  DOGTAG_MASTER: "/props/prop_dogtag_master.png",
} as const;

// === VISUAL TRANSITIONS ===
export const TRANSITIONS = {
  BEACH_FADE_IN: "/transitions/trans_beach_fade_in.png",
  COLLAPSE_WATER_RUSH: "/transitions/trans_collapse_water_rush.png",
  DUST_SETTLING: "/transitions/trans_dust_settling.png",
  FLASHBACK_DISTORTION: "/transitions/trans_flashback_distortion.png",
  RAIN_TO_LOTUS: "/transitions/trans_rain_to_lotus.png",
} as const;

// === VISUAL EFFECTS ===
export const VFX = {
  // Screen effects (handled by CSS/JS)
  SCREEN_SHAKE: "screen_shake",
  SCREEN_FLASH: "screen_flash",
  FADE_TO_BLACK: "fade_to_black",
  RED_GLOW: "red_glow_flood",
  HUD_FLICKER: "hud_flicker_soft",

  // Particle effects
  RED_PETALS_RISE: "red_petals_rise",
  DUST_CASCADE: "dust_cascade",
} as const;
