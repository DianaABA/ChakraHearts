// Asset manifest for Chakra Hearts Episode 1
// This file helps with asset loading and organization

export const BACKGROUNDS = {
  // Scene backgrounds
  LOTUS_BIRTH_VOID: "/src/assets/images/backgrounds/sc0_lotus_birth_void.png",
  LOTUS_UNFURLING: "/src/assets/images/backgrounds/sc0_lotus_unfurling.png",
  GROUP_EXHAUSTED:
    "/src/assets/images/backgrounds/sc1a_group_exhausted_aftermath.png",
  NAGA_EMERGENCE: "/src/assets/images/backgrounds/sc1a_naga_emergence_wide.png",
  COLLAPSE_ENVIRONMENT:
    "/src/assets/images/backgrounds/sc1_collapse_environment_wide.png",
  DUST_CLOUD: "/src/assets/images/backgrounds/sc1_dust_cloud_silhouettes.png",
  COW_CARVING: "/src/assets/images/backgrounds/sc2_cow_carving_wall.jpg",
  SAFE_PERIMETER:
    "/src/assets/images/backgrounds/sc2_safe_perimeter_alcove.png",
  RED_MANIFESTATION:
    "/src/assets/images/backgrounds/sc5_red_light_manifestation.png",
  AURORA_LOTUS: "/src/assets/images/backgrounds/sc6_aurora_lotus_distant.png",
  BLACK_STONES: "/src/assets/images/backgrounds/sc6_black_stones_path.png",
  SHORE_DAWN: "/src/assets/images/backgrounds/sc6_shore_dawn_wide.png",

  // Prologue backgrounds
  ELENA_CHAKRA_AWAKENING: "/backgrounds/pro_ep1_elena_chakra_awakening.png",
  AGNIVESH_DOGTAG_DISCOVERY:
    "/src/assets/images/backgrounds/pro_ep1_agnivesh_dogtag_discovery.png",
  TEMPLE_BURNING: "/backgrounds/pro_ep1_temple_burning_destruction.png",
  AGNIVESH_SANTI_SORROW: "/backgrounds/pro_ep1_agnivesh_santi_sorrow.png",
  BETRAYAL_HALL:
    "/src/assets/images/backgrounds/pro_ep1_betrayal_hall_wide.png",
  PSYCH_WARD: "/src/assets/images/backgrounds/pro_ep1_psych_ward_corridor.png",

  // Special cinematic scenes
  RUIN_ASH: "/src/assets/images/backgrounds/stinger_ruin_cool_ash.png",
  TWO_SOLDIERS:
    "/src/assets/images/backgrounds/flash_two_soldiers_silhouettes.png",
} as const;

export const CHARACTERS = {
  // Character portraits - Absolute paths for Vite public folder
  DAVID_BASE: "/characters/david_base_portrait.png",
  ELENA_BASE: "/characters/elena_base_portrait.png",
  AGNIVESH_BASE: "/characters/agnivesh_panther_base.png",
  AGNIVESH_HUMAN: "/characters/agnivesh_human_portrait.png",
  SANTI_BASE: "/characters/santi_serpent_base.png",
  SANTI_HUMAN: "/characters/santi_human_portrait.png",
  AURORA_BASE: "/characters/aurora.png",
  UMBRA_BASE: "/characters/aurora.png",
  MC_BASE: "/characters/mc_avatar_portrait.png", // Separate MC avatar
} as const;
export const PROPS = {
  BRACELET_MUD: "/src/assets/images/props/prop_bracelet_mud.png",
  CHOCOLATE_MASTER: "/props/prop_chocolate_master.png",
  DOGTAG_CLOSEUP: "/src/assets/images/props/prop_dogtag_closeup.png",
  DOGTAG_IN_HAND: "/src/assets/images/props/prop_dogtag_in_hand.png",
  DOGTAG_MASTER: "/src/assets/images/props/prop_dogtag_master.png",
} as const;

export const UI = {
  MAIN_MENU_BG: "/src/assets/images/ui/ui_main_menu_bg.png",
  CHAKRA_UNLOCK_ROOT: "/src/assets/images/ui/ui_chakra_unlock_root.png",
  CHOICE_HOVER: "/src/assets/images/ui/ui_choice_hover.png",
  CHOICE_KARMA_BAD: "/src/assets/images/ui/ui_choice_karma_bad.png",
  CHOICE_KARMA_GOOD: "/src/assets/images/ui/ui_choice_karma_good.png",
  CHOICE_NORMAL: "/src/assets/images/ui/ui_choice_normal.png",
  DIALOGUE_FRAME: "/src/assets/images/ui/ui_dialogue_frame.png",
  ROMANCE_AGNIVESH: "/src/assets/images/ui/ui_romance_agnivesh.png",
  ROMANCE_AURORA: "/src/assets/images/ui/ui_romance_aurora.png",
  ROMANCE_DAVID: "/src/assets/images/ui/ui_romance_david.png",
  ROMANCE_ELENA: "/src/assets/images/ui/ui_romance_elena.png",
  ROMANCE_SANTI: "/src/assets/images/ui/ui_romance_santi.png",
} as const;

export const TRANSITIONS = {
  BEACH_FADE_IN: "/src/assets/images/transitions/trans_beach_fade_in.png",
  COLLAPSE_WATER_RUSH:
    "/src/assets/images/transitions/trans_collapse_water_rush.png",
  DUST_SETTLING: "/src/assets/images/transitions/trans_dust_settling.png",
  FLASHBACK_DISTORTION:
    "/src/assets/images/transitions/trans_flashback_distortion.png",
  RAIN_TO_LOTUS: "/src/assets/images/transitions/trans_rain_to_lotus.png",
} as const;

export const AVATARS = {
  BINARY: "/src/assets/images/avatars/av_binary.png",
  IRON: "/src/assets/images/avatars/av_iron.png",
  LOTUS: "/src/assets/images/avatars/av_lotus.png",
  NOMAD: "/src/assets/images/avatars/av_nomad.png",
  OCEAN: "/src/assets/images/avatars/av_ocean.png",
  SKY: "/src/assets/images/avatars/av_sky.png",
  STONE: "/src/assets/images/avatars/av_stone.png",
} as const;

export const AUDIO = {
  BGM: {
    AURORA_THEME: "/src/assets/audio/bgm/aurora_theme.mp3",
    COMBAT_THEME: "/src/assets/audio/bgm/combat_theme.mp3",
    TENSION_THEME: "/src/assets/audio/bgm/tension_theme.mp3",
    TEMPLE_AMBIENT: "/src/assets/audio/bgm/temple_ambient.mp3",
  },
  SFX: {
    LOW_HEARTBEAT: "/src/assets/audio/sfx/low_heartbeat.mp3",
    STONE_CRACK: "/src/assets/audio/sfx/stone_crack.mp3",
  },
} as const;

// Combined assets object
export const ASSETS = {
  backgrounds: BACKGROUNDS,
  characters: CHARACTERS,
  props: PROPS,
  ui: UI,
  transitions: TRANSITIONS,
  avatars: AVATARS,
  audio: AUDIO,
} as const;
