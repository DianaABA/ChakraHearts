import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GameState, SaveSlot } from "../types";

interface GameStore extends GameState {
  // Actions
  setCurrentScene: (scene: string) => void;
  setCurrentDialogue: (index: number) => void;
  setFlag: (key: string, value: boolean) => void;
  getFlag: (key: string) => boolean;
  addKarma: (points: number) => void;
  addRomance: (character: string, points: number) => void;
  unlockArt: (artId: string) => void;
  awardBadge: (badgeId: string) => void;
  unlockCodexEntry: (entryId: string) => void;
  saveGame: (slotId: number) => void;
  loadGame: (slotId: number) => void;
  resetGame: () => void;
}

const initialState: GameState = {
  currentScene: "prologue",
  currentDialogue: 0,
  flags: {},
  karma: 0,
  romance: {},
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

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...initialState,

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

      resetGame: () => set(initialState),
    }),
    {
      name: "chakra-hearts-save",
    }
  )
);
