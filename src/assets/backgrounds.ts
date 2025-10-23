// ===================================
// BACKGROUND ASSETS - CHAKRA HEARTS
// ===================================

// === MAIN EPISODE BACKGROUNDS ===
export const EPISODE_BACKGROUNDS = {
  // Scene 0 - Lotus Birth & Awakening
  LOTUS_BIRTH_VOID: "/backgrounds/scenes/sc0_lotus_birth_void.png",
  LOTUS_UNFURLING: "/backgrounds/scenes/sc0_lotus_unfurling.png",

  // Scene 1 - Collapse & Rescue
  COLLAPSE_ENVIRONMENT: "/backgrounds/scenes/sc1_collapse_environment_wide.png",
  DUST_CLOUD: "/backgrounds/scenes/sc1_dust_cloud_silhouettes.png",

  // Scene 1A - Naga Encounter & Aftermath
  GROUP_EXHAUSTED: "/backgrounds/scenes/sc1a_group_exhausted_aftermath.png",
  NAGA_EMERGENCE: "/backgrounds/scenes/sc1a_naga_emergence_wide.png",
  NAGA_FIGHT_EPIC: "/backgrounds/sc1a_naga_fight_epic.png",
  TEMPLE_AFTERMATH_REST: "/backgrounds/temple_aftermath_rest.png", // Post-naga defeat rest scene

  // Scene 1B - Chocolate Moment & Discoveries
  CHOCOLATE_MOMENT: "/backgrounds/chocolate_moment_closeup.png", // David's chocolate sharing scene
  DOGTAG_CLOSEUP_MUD: "/backgrounds/dogtag_closeup_mud.png", // Dog tag in mud/dirt close-up
  DOGTAG_CLOSEUP_HAND: "/backgrounds/dogtag_closeup_hand.png", // Dog tag in hand close-up

  // Scene 2 - Safe Perimeter & Temple Exploration
  SAFE_PERIMETER: "/backgrounds/scenes/sc2_safe_perimeter_alcove.png",
  COW_CARVING: "/backgrounds/scenes/sc2_cow_carving_wall.jpg",

  // Scene 5 - Visions & Manifestations
  RED_MANIFESTATION: "/backgrounds/scenes/sc5_red_light_manifestation.png",

  // Scene 6 - Shore & Journey
  AURORA_LOTUS: "/backgrounds/scenes/sc6_aurora_lotus_distant.png",
  BLACK_STONES: "/backgrounds/scenes/sc6_black_stones_path.png",
  SHORE_DAWN: "/backgrounds/scenes/sc6_shore_dawn_wide.png",
} as const;

// === PROLOGUE BACKGROUNDS ===
export const PROLOGUE_BACKGROUNDS = {
  // Core Prologue Scenes
  TEMPLE_BURNING: "/backgrounds/pro_ep1_temple_burning_destruction.png",
  BETRAYAL_HALL: "/backgrounds/prologue/pro_ep1_betrayal_hall_wide.png",
  PSYCH_WARD: "/backgrounds/prologue/pro_ep1_psych_ward_corridor.png",

  // Character Emotional Moments
  AGNIVESH_HAPPY_BEFORE: "/backgrounds/pro_ep1_agnivesh_hospital_2.png",
  AGNIVESH_SANTI_SORROW: "/backgrounds/pro_ep1_santi_traditional.png",
  CRYING_IN_RAIN: "/backgrounds/pro_ep1_agnivesh_rain_emotion_1.png",
  CRYING_IN_RAIN_ALT: "/backgrounds/pro_ep1_agnivesh_rain_emotion_2.png",

  // Epic Awakening & Discovery Scenes (New)
  ELENA_CHAKRA_AWAKENING_NEW: "/backgrounds/elena_chakra_awakening_new.png", // New stunning chakra awakening scene
  AGNIVESH_DOGTAG_DISCOVERY_NEW:
    "/backgrounds/agnivesh_dogtag_discovery_new.png", // New dramatic dog tag scene

  // Legacy Backgrounds (Fallbacks)
  ELENA_CHAKRA_AWAKENING: "/backgrounds/pro_ep1_elena_chakra_awakening.png",
  AGNIVESH_DOGTAG_DISCOVERY: "/backgrounds/pro_ep1_agnivesh_finds_dogtag.png",
  ELENA_DOGTAG_EMOTION: "/backgrounds/pro_ep1_elena_portrait_correct.png",
  ROOT_CHAKRA_VFX: "/backgrounds/pro_ep1_elena_chakra_awakening.png",

  // Active Backgrounds (Used in scenes)
  ELENA_TRANSFORMATION: "/backgrounds/elena_chakra_awakening_new.png", // Using new chakra awakening image
  AGNIVESH_FINDS_DOGTAG: "/backgrounds/agnivesh_dogtag_discovery_new.png", // Using new dramatic dog tag image
  TEMPLE_DESTRUCTION: "/backgrounds/pro_ep1_temple_burning_destruction.png",
} as const;

// === EPILOGUE BACKGROUNDS ===
export const EPILOGUE_BACKGROUNDS = {
  // Stinger & Conclusion Scenes
  RUIN_ASH: "/backgrounds/stingers/stinger_ruin_cool_ash.png",
  TWO_SOLDIERS: "/characters/flash_two_soldiers_silhouettes.png",

  // Episode Completion Scenes
  // (Add future epilogue backgrounds here)
} as const;

// === TRANSITION BACKGROUNDS ===
export const TRANSITION_BACKGROUNDS = {
  BEACH_FADE: "/transitions/trans_beach_fade_in.png",
  WATER_RUSH: "/transitions/trans_collapse_water_rush.png",
  DUST_SETTLING: "/transitions/trans_dust_settling.png",
  FLASHBACK_DISTORTION: "/transitions/trans_flashback_distortion.png",
  RAIN_TO_LOTUS: "/transitions/trans_rain_to_lotus.png",
} as const;

// === SPECIAL EFFECT BACKGROUNDS ===
export const SPECIAL_BACKGROUNDS = {
  // Flashback & Memory Effects
  FLASHBACK_DISTORTION: "/transitions/trans_flashback_distortion.png",

  // Transition Effects
  FADE_TO_BLACK: null, // Handled by CSS/VFX
  WHITE_FLASH: null, // Handled by CSS/VFX
} as const;

// === COMBINED BACKGROUNDS EXPORT ===
export const BACKGROUNDS = {
  // Main episode scenes
  ...EPISODE_BACKGROUNDS,

  // Legacy compatibility (maintain old names)
  LOTUS_BIRTH_VOID: EPISODE_BACKGROUNDS.LOTUS_BIRTH_VOID,
  LOTUS_UNFURLING: EPISODE_BACKGROUNDS.LOTUS_UNFURLING,
  GROUP_EXHAUSTED: EPISODE_BACKGROUNDS.GROUP_EXHAUSTED,
  NAGA_EMERGENCE: EPISODE_BACKGROUNDS.NAGA_EMERGENCE,
  NAGA_FIGHT_EPIC: EPISODE_BACKGROUNDS.NAGA_FIGHT_EPIC,
  COLLAPSE_ENVIRONMENT: EPISODE_BACKGROUNDS.COLLAPSE_ENVIRONMENT,
  DUST_CLOUD: EPISODE_BACKGROUNDS.DUST_CLOUD,
  CHOCOLATE_MOMENT: EPISODE_BACKGROUNDS.CHOCOLATE_MOMENT,
  TEMPLE_AFTERMATH_REST: EPISODE_BACKGROUNDS.TEMPLE_AFTERMATH_REST,
  DOGTAG_CLOSEUP_MUD: EPISODE_BACKGROUNDS.DOGTAG_CLOSEUP_MUD,
  DOGTAG_CLOSEUP_HAND: EPISODE_BACKGROUNDS.DOGTAG_CLOSEUP_HAND,
  COW_CARVING: EPISODE_BACKGROUNDS.COW_CARVING,
  SAFE_PERIMETER: EPISODE_BACKGROUNDS.SAFE_PERIMETER,
  RED_MANIFESTATION: EPISODE_BACKGROUNDS.RED_MANIFESTATION,
  AURORA_LOTUS: EPISODE_BACKGROUNDS.AURORA_LOTUS,
  BLACK_STONES: EPISODE_BACKGROUNDS.BLACK_STONES,
  SHORE_DAWN: EPISODE_BACKGROUNDS.SHORE_DAWN,

  // Epilogue scenes
  RUIN_ASH: EPILOGUE_BACKGROUNDS.RUIN_ASH,
  TWO_SOLDIERS: EPILOGUE_BACKGROUNDS.TWO_SOLDIERS,
} as const;
