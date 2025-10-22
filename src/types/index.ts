// Game state types
export interface GameState {
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
}

// Game actions
export interface GameAction {
  type:
    | "show_image"
    | "play_sfx"
    | "play_bgm"
    | "stop_bgm"
    | "play_vfx"
    | "fade_to_black"
    | "pause"
    | "goto_scene"
    | "unlock_art"
    | "award_badge"
    | "set_flag";
  payload?: any;
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
  style?: any; // React Native uses different style objects
  children?: any;
}

export interface TextProps {
  style?: any;
  children?: any;
  numberOfLines?: number;
}

export interface ImageProps {
  source: { uri: string } | string;
  style?: any;
  resizeMode?: "contain" | "cover" | "stretch" | "center";
}
