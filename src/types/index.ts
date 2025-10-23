// Game state types
export interface GameState {
  /**
   * Currently active episode (1..9). Used to scope scenes, assets, and progression.
   */
  currentEpisode?: EpisodeId;
  currentScene: string;
  currentDialogue: number;
  flags: Record<string, boolean>;
  karma: number;
  romance: Record<string, number>;
  unlockedArt: string[];
  badges: string[];
  codexEntries: string[];
  saveSlots: SaveSlot[];
}

export interface SaveSlot {
  id: number;
  timestamp: number;
  sceneName: string;
  dialogueIndex: number;
  gameState: Partial<GameState>;
}

// Character and dialogue types
export interface Character {
  id: string;
  name: string;
  portraits: Record<string, string>; // mood -> image path
}

export interface DialogueLine {
  type: "dialogue" | "narration" | "choice" | "action";
  character?: string;
  text?: string;
  choices?: Choice[];
  action?: GameAction;
}

export interface Choice {
  text: string;
  action: () => void;
  karma?: number;
  romance?: { character: string; points: number };
  romanceOptions?: Array<{ character: string; points: number }>;
  flags?: Record<string, boolean | string | number>;
  unlocks?: {
    art?: { id: string; title: string };
    codex?: { id: string; title: string };
    badge?: { id: string; title: string };
  };
  responseText?: string;
  additionalText?: string;
  effects?: Array<{
    type: string;
    payload: string | number | Record<string, unknown>;
  }>;
}

// Game actions
export interface GameAction {
  type:
    | "show_image"
    | "play_bgm"
    | "stop_bgm"
    | "play_vfx"
    | "fade_to_black"
    | "pause"
    | "goto_scene"
    | "unlock_art"
    | "award_badge"
    | "set_flag"
    | "unlock_codex_entry"
    | "unlock_codex_entries"
    | "sfx"
    | "vfx"
    | "conditional_badge"
    | "open_codex";
  payload?:
    | string
    | number
    | Record<string, unknown>
    | Array<Record<string, string>>;
  title?: string; // For unlock actions that need titles
}

// Scene definition
export interface Scene {
  id: string;
  name: string;
  dialogues: DialogueLine[];
  background?: string;
}

// Portrait moods for sprite-reduced system
export type PortraitMood = "neutral" | "smile" | "angry";
export type CharacterID = "DAVID" | "ELENA" | "MC" | "AGNIVESH" | "SANTI";

// Asset management
export interface AssetManifest {
  images: Record<string, string>;
  audio: Record<string, string>;
  portraits: Record<string, string>;
}

// Component props for React Native compatibility
export interface ViewProps {
  style?: Record<string, unknown>; // React Native uses different style objects
  children?: unknown;
}

export interface TextProps {
  style?: Record<string, unknown>;
  children?: unknown;
  numberOfLines?: number;
}

export interface ImageProps {
  source: { uri: string } | string;
  style?: Record<string, unknown>;
  resizeMode?: "contain" | "cover" | "stretch" | "center";
}

// Episodes
export type EpisodeId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface EpisodeSceneRef {
  /** Scene identifier within the episode */
  id: string;
  /** Display name for menus/debug */
  name: string;
}

export interface EpisodeConfig {
  id: EpisodeId;
  title: string;
  /** Optional short slug used in paths, URLs, or asset names */
  slug?: string;
  /** Ordered list of scene identifiers in this episode */
  scenes: EpisodeSceneRef[];
  /** Optional summary and notes */
  summary?: string;
}

// VN UX: Backlog entries for message history
export interface BacklogEntry {
  type: "dialogue" | "narration" | "choice" | "system";
  character?: string;
  text: string;
  timestamp?: number;
}
