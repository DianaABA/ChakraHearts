import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GameState, SaveSlot } from "../types";

interface PlayerSettings {
  name: string;
  pronouns: "he/him" | "she/her" | "they/them";
  hasSeenContentWarning: boolean;
}

interface GameStore extends GameState {
  // Player Settings
  playerSettings: PlayerSettings;

  // Actions
  setCurrentScene: (scene: string) => void;
  setCurrentDialogue: (index: number) => void;
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
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      playerSettings: initialPlayerSettings,

      setCurrentScene: (scene: string) => set({ currentScene: scene }),

      setCurrentDialogue: (index: number) => set({ currentDialogue: index }),

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
