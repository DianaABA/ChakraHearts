/**
 * Optimized Background Assets Configuration
 */

export const OPTIMIZED_BACKGROUNDS = {
  // Original paths for fallback
  ORIGINAL: {
    NAGA_FIGHT_EPIC: "/backgrounds/sc1a_naga_fight_epic.png",
    TEMPLE_BURNING: "/backgrounds/pro_ep1_temple_burning_destruction.png",
    FOREST_ANCIENT: "/backgrounds/sc1a_ancient_forest.png",
    MYSTIC_TEMPLE: "/backgrounds/sc1a_mystic_temple.png",
  },

  // WebP optimized paths
  WEBP: {
    NAGA_FIGHT_EPIC: "/optimized/webp/sc1a_naga_fight_epic.webp",
    TEMPLE_BURNING: "/optimized/webp/pro_ep1_temple_burning_destruction.webp",
    FOREST_ANCIENT: "/optimized/webp/sc1a_ancient_forest.webp",
    MYSTIC_TEMPLE: "/optimized/webp/sc1a_mystic_temple.webp",
  },
} as const;
