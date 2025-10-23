import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GameState, SaveSlot, EpisodeId, DialogueLine, BacklogEntry } from "../types";

interface PlayerSettings {
  name: string;
  pronouns: "he/him" | "she/her" | "they/them";
  hasSeenContentWarning: boolean;
  // Audio & reading
  bgmVolume?: number; // 0..1
  sfxVolume?: number; // 0..1
  textSpeed?: number; // ms per char
  autoDelay?: number; // base ms
}

interface GameStore extends GameState {
  // Player Settings
  playerSettings: PlayerSettings;
  // VN Backlog & UI state
  backlog: BacklogEntry[];
  backlogOpen: boolean;
  uiHidden: boolean;
  autoMode: boolean;
  skipMode: boolean; // simple skip-all for now

  // Actions
  setCurrentEpisode: (episode: EpisodeId) => void;
  setCurrentScene: (scene: string) => void;
  setCurrentDialogue: (index: number) => void;
  addBacklogFromLine: (line: DialogueLine) => void;
  addBacklogEntry: (entry: BacklogEntry) => void;
  clearBacklog: () => void;
  setBacklogOpen: (open: boolean) => void;
  toggleUiHidden: () => void;
  setAutoMode: (on: boolean) => void;
  toggleAutoMode: () => void;
  setSkipMode: (on: boolean) => void;
  toggleSkipMode: () => void;
  setFlag: (key: string, value: boolean) => void;
  getFlag: (key: string) => boolean;
  addKarma: (points: number) => void;
  addRomance: (character: string, points: number) => void;
  getSelectedAvatar: () => string;
  setSelectedAvatar: (avatarId: string) => void;
  unlockArt: (artId: string) => void;
  awardBadge: (badgeId: string) => void;
  unlockCodexEntry: (entryId: string) => void;
  saveGame: (slotId: number) => void;
  loadGame: (slotId: number) => void;
  resetGame: () => void;

  // Player Settings Actions
  setPlayerSettings: (settings: Partial<PlayerSettings>) => void;
  getPlayerName: () => string;
  getPlayerPronouns: () => PlayerSettings["pronouns"];
  markContentWarningSeen: () => void;
  resetContentWarning: () => void;
}

const initialState: GameState = {
  currentEpisode: 1,
  currentScene: "prologue",
  currentDialogue: 0,
  flags: {},
  karma: 0,
  romance: {
    // Initialize with small values to show meters from start
    DAVID: 0,
    ELENA: 0,
    AGNIVESH: 0,
    SANTI: 0,
  },
  unlockedArt: [],
  badges: [],
  codexEntries: [],
  saveSlots: Array(10)
    .fill(null)
    .map((_, i) => ({
      id: i,
      timestamp: 0,
      sceneName: "",
      dialogueIndex: 0,
      gameState: {},
    })),
};

const initialPlayerSettings: PlayerSettings = {
  name: "",
  pronouns: "they/them",
  hasSeenContentWarning: false,
  bgmVolume: 0.3,
  sfxVolume: 0.5,
  textSpeed: 25,
  autoDelay: 500,
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      playerSettings: initialPlayerSettings,
      backlog: [],
      backlogOpen: false,
      uiHidden: false,
  autoMode: false,
  skipMode: false,

      setCurrentEpisode: (episode: EpisodeId) => set({ currentEpisode: episode }),

      setCurrentScene: (scene: string) => set({ currentScene: scene }),

      setCurrentDialogue: (index: number) => set({ currentDialogue: index }),

      addBacklogFromLine: (line: DialogueLine) => {
        if (!line) return;
        if (line.type === "dialogue" || line.type === "narration") {
          const entry: BacklogEntry = {
            type: line.type,
            character: line.character,
            text: line.text || "",
            timestamp: Date.now(),
          };
          set((state) => {
            const next = [...state.backlog, entry];
            // keep last 200
            if (next.length > 200) next.splice(0, next.length - 200);
            return { backlog: next };
          });
        }
      },

      addBacklogEntry: (entry: BacklogEntry) =>
        set((state) => {
          const next = [...state.backlog, { ...entry, timestamp: Date.now() }];
          if (next.length > 200) next.splice(0, next.length - 200);
          return { backlog: next };
        }),

      clearBacklog: () => set({ backlog: [] }),
      setBacklogOpen: (open: boolean) => set({ backlogOpen: open }),
      toggleUiHidden: () => set((s) => ({ uiHidden: !s.uiHidden })),
  setAutoMode: (on: boolean) => set({ autoMode: on }),
  toggleAutoMode: () => set((s) => ({ autoMode: !s.autoMode })),
  setSkipMode: (on: boolean) => set({ skipMode: on }),
  toggleSkipMode: () => set((s) => ({ skipMode: !s.skipMode })),

      setFlag: (key: string, value: boolean) =>
        set((state) => ({
          flags: { ...state.flags, [key]: value },
        })),

      getFlag: (key: string) => get().flags[key] || false,

      addKarma: (points: number) =>
        set((state) => ({
          karma: state.karma + points,
        })),

      addRomance: (character: string, points: number) =>
        set((state) => ({
          romance: {
            ...state.romance,
            [character]: (state.romance[character] || 0) + points,
          },
        })),

      getSelectedAvatar: () => {
        const state = get();
        console.log(`🔍 STORE DEBUG: All flags:`, state.flags);
        // Check which avatar flag is set
        const avatarFlags = Object.keys(state.flags).filter((flag) =>
          flag.startsWith("avatar_")
        );
        console.log(`🔍 STORE DEBUG: Avatar flags:`, avatarFlags);
        if (avatarFlags.length > 0) {
          const selectedAvatar = avatarFlags[0].replace("avatar_", "");
          console.log(
            `🔍 STORE DEBUG: Returning selected avatar:`,
            selectedAvatar
          );
          return selectedAvatar;
        }
        console.log(
          `🔍 STORE DEBUG: No avatar flags found, returning default: LOTUS`
        );
        return "LOTUS"; // Default avatar
      },

      setSelectedAvatar: (avatarId: string) => {
        console.log(`🔍 SETTING AVATAR: ${avatarId}`);
        const state = get();
        console.log(`🔍 CURRENT FLAGS BEFORE:`, state.flags);
        // Clear all avatar flags first
        const clearedFlags = { ...state.flags };
        Object.keys(clearedFlags).forEach((key) => {
          if (key.startsWith("avatar_")) {
            delete clearedFlags[key];
          }
        });
        // Set the new avatar flag
        const newFlags = {
          ...clearedFlags,
          [`avatar_${avatarId}`]: true,
          selectedAvatar: true,
        };
        console.log(`🔍 NEW FLAGS:`, newFlags);
        set({
          flags: newFlags,
        });
        console.log(`🔍 AVATAR SET COMPLETE`);
      },

      unlockArt: (artId: string) =>
        set((state) => ({
          unlockedArt: [...new Set([...state.unlockedArt, artId])],
        })),

      awardBadge: (badgeId: string) =>
        set((state) => ({
          badges: [...new Set([...state.badges, badgeId])],
        })),

      unlockCodexEntry: (entryId: string) =>
        set((state) => ({
          codexEntries: [...new Set([...state.codexEntries, entryId])],
        })),

      saveGame: (slotId: number) => {
        const currentState = get();
        const saveData: SaveSlot = {
          id: slotId,
          timestamp: Date.now(),
          sceneName: currentState.currentScene,
          dialogueIndex: currentState.currentDialogue,
          gameState: {
            currentEpisode: currentState.currentEpisode,
            flags: currentState.flags,
            karma: currentState.karma,
            romance: currentState.romance,
            unlockedArt: currentState.unlockedArt,
            badges: currentState.badges,
            codexEntries: currentState.codexEntries,
          },
        };

        set((state) => ({
          saveSlots: state.saveSlots.map((slot, i) =>
            i === slotId ? saveData : slot
          ),
        }));
      },

      loadGame: (slotId: number) => {
        const saveSlot = get().saveSlots[slotId];
        if (saveSlot && saveSlot.timestamp > 0) {
          set({
            currentScene: saveSlot.sceneName,
            currentDialogue: saveSlot.dialogueIndex,
            ...saveSlot.gameState,
          });
        }
      },

      resetGame: () => {
        const state = get();
        // Preserve avatar selection and player settings when resetting
        const avatarFlags: Record<string, boolean> = {};
        Object.keys(state.flags).forEach((key) => {
          if (key.startsWith("avatar_") || key === "selectedAvatar") {
            avatarFlags[key] = state.flags[key];
          }
        });
        console.log(`🔄 Resetting game, preserving avatar flags:`, avatarFlags);
        set({
          ...initialState,
          flags: avatarFlags,
          playerSettings: state.playerSettings, // Preserve player settings
        });
      },

      // Player Settings Actions
      setPlayerSettings: (settings: Partial<PlayerSettings>) =>
        set((state) => ({
          playerSettings: { ...state.playerSettings, ...settings },
        })),

      getPlayerName: () => {
        const settings = get().playerSettings;
        return settings.name || "Player";
      },

      getPlayerPronouns: () => {
        const settings = get().playerSettings;
        return settings.pronouns;
      },

      markContentWarningSeen: () =>
        set((state) => ({
          playerSettings: {
            ...state.playerSettings,
            hasSeenContentWarning: true,
          },
        })),

      resetContentWarning: () =>
        set((state) => ({
          playerSettings: {
            ...state.playerSettings,
            hasSeenContentWarning: false,
          },
        })),
    }),
    {
      name: "chakra-hearts-save",
    }
  )
);
