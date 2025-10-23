// ===================================
// UI COMPONENTS - CHAKRA HEARTS
// ===================================

// === MENU INTERFACES ===
export const MENU_UI = {
  MAIN_MENU_BG: "/ui/ui_main_menu_bg.png",
} as const;

// === DIALOGUE SYSTEM ===
export const DIALOGUE_UI = {
  DIALOGUE_FRAME: "/ui/ui_dialogue_frame.png",
} as const;

// === CHOICE SYSTEM ===
export const CHOICE_UI = {
  CHOICE_NORMAL: "/ui/ui_choice_normal.png",
  CHOICE_HOVER: "/ui/ui_choice_hover.png",
  CHOICE_KARMA_GOOD: "/ui/ui_choice_karma_good.png",
  CHOICE_KARMA_BAD: "/ui/ui_choice_karma_bad.png",
} as const;

// === ROMANCE SYSTEM ===
export const ROMANCE_UI = {
  ROMANCE_AGNIVESH: "/ui/ui_romance_agnivesh.png",
  ROMANCE_AURORA: "/ui/ui_romance_aurora.png",
  ROMANCE_DAVID: "/ui/ui_romance_david.png",
  ROMANCE_ELENA: "/ui/ui_romance_elena.png",
  ROMANCE_SANTI: "/ui/ui_romance_santi.png",
} as const;

// === PROGRESSION SYSTEM ===
export const PROGRESSION_UI = {
  CHAKRA_UNLOCK_ROOT: "/ui/ui_chakra_unlock_root.png",
  // Add more chakra unlock screens here
} as const;

// === EDUCATIONAL CARDS ===
export const EDUCATIONAL_UI = {
  // Chakra explanation cards
  EDU_ROOT_CHAKRA: "/backgrounds/edu/edu_root_chakra.png",
  EDU_SACRAL_CHAKRA: "/backgrounds/edu/edu_sacral_chakra.png",
  EDU_SOLAR_PLEXUS_CHAKRA: "/backgrounds/edu/edu_solar_plexus_chakra.png",
  EDU_THROAT_CHAKRA: "/backgrounds/edu/edu_throat_chakra.png",
  EDU_CROWN_CHAKRA: "/backgrounds/edu/edu_crown_chakra.png",

  // System explanation cards
  EDU_KARMA_EXPLANATION: "/backgrounds/edu/edu_karma_explanation.png",
  EDU_ROMANCE_EXPLANATION: "/backgrounds/edu/edu_romance_explanation.png",

  // Background temple
  BG_TEMPLE: "/backgrounds/edu/bg_temple.png",
} as const;

// === HUD ELEMENTS ===
export const HUD_UI = {
  // Add HUD elements here (health bars, karma meters, etc.)
} as const;

// === NOTIFICATION SYSTEM ===
export const NOTIFICATION_UI = {
  // Add notification banners, badges, etc.
} as const;

// === COMBINED UI EXPORT ===
export const UI = {
  // Menu interfaces
  ...MENU_UI,

  // Dialogue system
  ...DIALOGUE_UI,

  // Choice system
  ...CHOICE_UI,

  // Romance system
  ...ROMANCE_UI,

  // Progression system
  ...PROGRESSION_UI,

  // Educational cards
  ...EDUCATIONAL_UI,

  // Legacy compatibility
  MAIN_MENU_BG: MENU_UI.MAIN_MENU_BG,
  CHAKRA_UNLOCK_ROOT: PROGRESSION_UI.CHAKRA_UNLOCK_ROOT,
  CHOICE_HOVER: CHOICE_UI.CHOICE_HOVER,
  CHOICE_KARMA_BAD: CHOICE_UI.CHOICE_KARMA_BAD,
  CHOICE_KARMA_GOOD: CHOICE_UI.CHOICE_KARMA_GOOD,
  CHOICE_NORMAL: CHOICE_UI.CHOICE_NORMAL,
  DIALOGUE_FRAME: DIALOGUE_UI.DIALOGUE_FRAME,
  ROMANCE_AGNIVESH: ROMANCE_UI.ROMANCE_AGNIVESH,
  ROMANCE_AURORA: ROMANCE_UI.ROMANCE_AURORA,
  ROMANCE_DAVID: ROMANCE_UI.ROMANCE_DAVID,
  ROMANCE_ELENA: ROMANCE_UI.ROMANCE_ELENA,
  ROMANCE_SANTI: ROMANCE_UI.ROMANCE_SANTI,
} as const;
