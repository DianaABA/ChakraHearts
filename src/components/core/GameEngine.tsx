import React, { useState, useEffect, useCallback } from "react";
import { useGameStore } from "../../stores/gameStore";
import { DialogueBox } from "./DialogueBox";
import { SceneBackground } from "./SceneBackground";
import { CharacterPortrait } from "./CharacterPortrait";
import { GameMenu } from "../ui/GameMenu";
import Notifications from "../ui/Notifications";
import { GameHUD } from "../ui/GameHUD";
import Backlog from "../ui/Backlog";
import { getSceneForEpisode } from "../../utils/episodeSceneLoader";
import { AUDIO, CHARACTERS, AVATARS } from "../../assets";
import { audio } from "../../platform/audio";
import { display } from "../../platform/screen";
import type { Scene } from "../../types";
import "./GameEngine.css";
import { devLog } from "../../utils/logger";

export const GameEngine: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [currentPortraits, setCurrentPortraits] = useState<
    Record<string, string>
  >({});
  const [showUiHint, setShowUiHint] = useState(false);

  const [currentBGM, setCurrentBGM] = useState<string>("");

  const {
    currentEpisode,
    currentScene,
    currentDialogue,
    setCurrentDialogue,
    setCurrentScene,
    addKarma,
    addRomance,
    addNotification,
    awardBadge,
    unlockCodexEntry,
    getSelectedAvatar,
    addBacklogFromLine,
    addBacklogEntry,
    backlogOpen,
    setBacklogOpen,
    uiHidden,
    toggleUiHidden,
  } = useGameStore();

  // Character portrait mapping - switches between human and animal forms
  const getCharacterPortrait = useCallback(
    (character: string, sceneId: string) => {
  devLog(`🎭 Getting portrait for ${character} in scene ${sceneId}`);

      // Use human forms in prologue, animal forms in visions/spiritual scenes
      if (sceneId === "prologue") {
        switch (character) {
          case "AGNIVESH":
            devLog(`👤 Using human form for AGNIVESH in prologue`);
            return CHARACTERS.AGNIVESH_HUMAN;
          case "SANTI":
            devLog(`👤 Using human form for SANTI in prologue`);
            return CHARACTERS.SANTI_HUMAN;
          case "DAVID":
            return CHARACTERS.DAVID_BASE;
          case "ELENA":
            return CHARACTERS.ELENA_BASE;
          case "MC": {
            const selectedAvatar = getSelectedAvatar();
            devLog(`🔍 DEBUG MC: selectedAvatar = "${selectedAvatar}"`);
            devLog(`🔍 DEBUG MC: type = ${typeof selectedAvatar}`);
            if (selectedAvatar) {
              const avatarKey =
                selectedAvatar.toUpperCase() as keyof typeof AVATARS;
              devLog(`🔍 DEBUG MC: avatarKey = "${avatarKey}"`);
              devLog(
                `🔍 DEBUG MC: AVATARS[avatarKey] = "${AVATARS[avatarKey]}"`
              );
              devLog(
                `🎯 MC character using selected avatar: ${selectedAvatar}`
              );
              return AVATARS[avatarKey];
            }
            devLog(
              `🎯 MC character using fallback: ${CHARACTERS.MC_BASE}`
            );
            return CHARACTERS.MC_BASE;
          }
          default:
            break;
        }
      }

      // Vision scene - use animal forms for Agnivesh and Santi
      if (sceneId === "vision") {
        switch (character) {
          case "AGNIVESH":
            devLog(`🐾 Using panther form for AGNIVESH in vision`);
            return CHARACTERS.AGNIVESH_BASE;
          case "SANTI":
            devLog(`🐍 Using serpent form for SANTI in vision`);
            return CHARACTERS.SANTI_BASE;
          default:
            break;
        }
      }

      // Default mapping for all other scenes
      if (character === "MC") {
        const selectedAvatar = getSelectedAvatar();
  devLog(`🔍 Debug: selectedAvatar value: "${selectedAvatar}"`);
  devLog(`🔍 Debug: selectedAvatar type: ${typeof selectedAvatar}`);
        if (selectedAvatar) {
          const avatarKey =
            selectedAvatar.toUpperCase() as keyof typeof AVATARS;
          devLog(
            `🎯 MC character using selected avatar: ${selectedAvatar}`
          );
          return AVATARS[avatarKey];
        }
  devLog(`🎯 MC character using fallback: ${CHARACTERS.MC_BASE}`);
        return CHARACTERS.MC_BASE;
      }

      const CHARACTER_PORTRAITS: Record<string, string> = {
        DAVID: CHARACTERS.DAVID_BASE,
        ELENA: CHARACTERS.ELENA_BASE,
        AGNIVESH: CHARACTERS.AGNIVESH_BASE, // Animal form for most scenes
        SANTI: CHARACTERS.SANTI_BASE, // Animal form for most scenes
        AURORA: CHARACTERS.AURORA_BASE,
        UMBRA: CHARACTERS.UMBRA_BASE,
      };

      const result = CHARACTER_PORTRAITS[character];
      if (character === "MC") {
        devLog(
          `🎯 Default MC mapping: ${result} (from ${CHARACTERS.MC_BASE})`
        );
      }
      return result;
    },
    [getSelectedAvatar]
  );

  const [scene, setScene] = useState<Scene | null>(null);

  // Audio functions with overlap prevention
  const { playerSettings } = useGameStore();

  const playBGM = useCallback(
    (trackName: string) => {
      // Prevent playing the same BGM twice
      if (currentBGM === trackName) {
  devLog(`🎵 BGM ${trackName} already playing, skipping`);
        return;
      }

      try {
        const audioPath = AUDIO.BGM[trackName as keyof typeof AUDIO.BGM];
        if (audioPath) {
          audio.stopLoop();
          audio
            .playLoop(audioPath, { volume: playerSettings.bgmVolume ?? 0.3 })
            .then(() => {
              setCurrentBGM(trackName);
              devLog(`🎵 Playing BGM: ${trackName}`);
            })
            .catch(() => {
              setCurrentBGM("");
            });
        } else {
          devLog(`❌ BGM track not found: ${trackName}`);
        }
      } catch (error) {
  devLog("BGM error:", error);
        setCurrentBGM("");
      }
    },
    [currentBGM, playerSettings.bgmVolume]
  );

  const playSFX = useCallback((effectName: string) => {
    // SFX completely removed - BGM only audio experience
  devLog(`🔇 SFX removed: ${effectName}`);
  }, []);

  // Process current dialogue line for actions and character portraits
  useEffect(() => {
    if (!scene || currentDialogue >= scene.dialogues.length) return;

    const currentLine = scene.dialogues[currentDialogue];
    devLog(
      `🎬 Processing line ${currentDialogue}:`,
      currentLine.type,
      currentLine
    );

    // Update character portraits for dialogue lines
    if (currentLine.type === "dialogue" && currentLine.character) {
      const characterPortrait = getCharacterPortrait(
        currentLine.character,
        currentScene
      );
      if (characterPortrait) {
        setCurrentPortraits((prev) => ({
          ...prev,
          [currentLine.character!]: characterPortrait,
        }));
        devLog(
          `👤 Showing portrait for ${currentLine.character}: ${characterPortrait}`
        );
      } else {
        devLog(
          `⚠️ No portrait found for character: ${currentLine.character}`
        );
      }
    }

    // Handle action commands
    if (currentLine.type === "action" && currentLine.action) {
  devLog(`⚡ Executing action: ${currentLine.action.type}`);

      switch (currentLine.action.type) {
        case "play_bgm":
          if (typeof currentLine.action.payload === "string") {
            playBGM(currentLine.action.payload);
          }
          break;
        case "stop_bgm":
          audio.stopLoop();
          setCurrentBGM("");
          devLog("🔇 BGM stopped");
          break;
        case "show_image":
          if (typeof currentLine.action.payload === "string") {
            setCurrentImage(currentLine.action.payload);
            devLog(`🖼️ Showing image: ${currentLine.action.payload}`);
          }
          break;
        case "goto_scene":
          if (typeof currentLine.action.payload === "string") {
            setCurrentScene(currentLine.action.payload);
            setCurrentDialogue(0);
            return; // Don't auto-advance for scene changes
          }
          break;
        case "unlock_art":
          devLog(`🎨 Art unlocked: ${currentLine.action.payload}`);
          if (currentLine.action.title) {
            devLog(`   Title: ${currentLine.action.title}`);
          }
          break;
  case "award_badge": {
          devLog(
            `🏆 Badge awarded: ${JSON.stringify(currentLine.action.payload)}`
          );
          const payload = currentLine.action.payload as
            | { id?: string; title?: string }
            | undefined;
          const badgeId: string | undefined = payload?.id;
          const badgeTitle: string | undefined = payload?.title ?? payload?.id;
          if (badgeId) {
            try {
              awardBadge(badgeId);
            } catch {
              /* ignore */
            }
          }
          if (badgeTitle) {
            addNotification(`Badge: ${badgeTitle}`, { variant: "badge" });
          }
          break;
        }
        case "set_flag":
          devLog(
            `🚩 Flag set: ${JSON.stringify(currentLine.action.payload)}`
          );
          break;
  case "unlock_codex_entry": {
          devLog(
            `📚 Codex entry unlocked: ${JSON.stringify(
              currentLine.action.payload
            )}`
          );
          const payload = currentLine.action.payload as
            | { id?: string; title?: string }
            | undefined;
          const entryId: string | undefined = payload?.id;
          const entryTitle: string | undefined = payload?.title ?? payload?.id;
          if (entryId) {
            try {
              unlockCodexEntry(entryId);
            } catch {
              /* ignore */
            }
          }
          if (entryTitle) {
            addNotification(`Codex: ${entryTitle}`, { variant: "codex" });
          }
          break;
        }
  case "unlock_codex_entries": {
          devLog(
            `📚 Multiple codex entries unlocked: ${JSON.stringify(
              currentLine.action.payload
            )}`
          );
          const payload = currentLine.action.payload as
            | Array<{ id?: string; title?: string }>
            | undefined;
          if (Array.isArray(payload)) {
            try {
              payload.forEach((e) => e?.id && unlockCodexEntry(e.id));
            } catch {
              /* ignore */
            }
            const count = payload.length;
            if (count === 1) {
              const title = payload[0]?.title ?? payload[0]?.id ?? "Entry";
              addNotification(`Codex: ${title}`, { variant: "codex" });
            } else if (count > 1) {
              addNotification(`Codex updated (${count} entries)`, { variant: "codex" });
            }
          }
          break;
        }
        case "sfx":
          devLog(`🔊 SFX: ${currentLine.action.payload}`);
          break;
        case "vfx":
          devLog(`✨ VFX: ${currentLine.action.payload}`);
          break;
        case "fade_to_black":
          devLog("🌑 Fade to black");
          break;
        case "pause":
          devLog(`⏸️ Pause: ${currentLine.action.payload}ms`);
          break;
        case "conditional_badge":
          devLog(
            `🏆? Conditional badge: ${JSON.stringify(
              currentLine.action.payload
            )}`
          );
          break;
        case "open_codex":
          devLog(`📖 Opening codex: ${currentLine.action.payload}`);
          break;
        default:
          devLog(`❓ Unknown action type: ${currentLine.action.type}`);
      }

      // Auto-advance through action lines (except scene changes)
      devLog(
        `⏭️ Auto-advancing from line ${currentDialogue} to ${
          currentDialogue + 1
        }`
      );
      // Use immediate state update
      setCurrentDialogue(currentDialogue + 1);
    }
  }, [
    scene,
    currentDialogue,
    setCurrentDialogue,
    setCurrentScene,
    currentScene,
    playBGM,
    playSFX,
    getCharacterPortrait,
    addNotification,
    awardBadge,
    unlockCodexEntry,
  ]);

  useEffect(() => {
    const loadScene = async () => {
      const sceneData = await getSceneForEpisode(currentEpisode, currentScene);
      setScene(sceneData);

      // Clear portraits when changing scenes
      setCurrentPortraits({});

      // Clear current image to allow scene background to show
      setCurrentImage("");

      // Pre-load key characters for specific scenes
      const preloadCharacters: Record<string, string[]> = {
        rescue: ["DAVID", "ELENA"],
        chocolate_moment: ["DAVID", "ELENA"],
        safe_perimeter: ["DAVID", "ELENA"],
        vision: [], // Characters will be added dynamically
        shore_opening: ["DAVID", "ELENA"],
      };

      if (preloadCharacters[currentScene]) {
        const newPortraits: Record<string, string> = {};
        preloadCharacters[currentScene].forEach((character) => {
          const portrait = getCharacterPortrait(character, currentScene);
          devLog(`🔍 Preloading ${character}: ${portrait}`);
          if (portrait) {
            newPortraits[character] = portrait;
          } else {
            devLog(
              `⚠️ No portrait found for preload character: ${character}`
            );
          }
        });
        setCurrentPortraits(newPortraits);
        devLog(
          `🎬 Scene ${currentScene}: Preloaded characters:`,
          Object.keys(newPortraits),
          newPortraits
        );
      }

  devLog(`🎬 Scene changed to: ${currentScene}`);
    };
    loadScene();
  }, [currentEpisode, currentScene, getCharacterPortrait]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      audio.stopLoop();
    };
  }, []);

  const handleNext = useCallback(() => {
    if (!scene) return;
    const currentLine = scene.dialogues[currentDialogue];
    // Add to backlog before advancing
    addBacklogFromLine(currentLine);
    const nextIndex = currentDialogue + 1;
    if (nextIndex < scene.dialogues.length) {
      setCurrentDialogue(nextIndex);
    } else {
      // Scene complete - could advance to next scene
  devLog("Scene complete");
    }
  }, [scene, currentDialogue, addBacklogFromLine, setCurrentDialogue]);

  const handleChoice = (choiceIndex: number) => {
    const currentLine = scene?.dialogues[currentDialogue];
    if (currentLine?.type === "choice" && currentLine.choices) {
      const choice = currentLine.choices[choiceIndex];

      // Execute the choice action
      choice.action();

      // Apply any side effects declared on the choice (e.g., show_image, open_codex)
      if (Array.isArray(choice.effects)) {
        choice.effects.forEach((effect: { type: string; payload?: string | number | Record<string, unknown> }) => {
          if (!effect || typeof effect !== "object") return;
          const { type, payload } = effect;
          switch (type) {
            case "show_image":
              if (typeof payload === "string") {
                setCurrentImage(payload);
                devLog(`🖼️ (choice) Showing image: ${payload}`);
              }
              break;
            case "open_codex": {
              // Treat as an unlock + toast for now (UI codex panel can open separately)
              const id = typeof payload === "string" ? payload : (payload && typeof payload === "object" && "id" in payload ? String((payload as Record<string, unknown>).id) : undefined);
              if (id) {
                try { unlockCodexEntry(id); } catch { /* ignore */ }
                addNotification(`Codex: ${id}`, { variant: "codex" });
                devLog(`📖 (choice) Open/Unlock codex: ${id}`);
              }
              break; }
            case "unlock_codex_entry": {
              const id = typeof payload === "string" ? payload : (payload && typeof payload === "object" && "id" in payload ? String((payload as Record<string, unknown>).id) : undefined);
              if (id) {
                try { unlockCodexEntry(id); } catch { /* ignore */ }
                addNotification(`Codex: ${id}`, { variant: "codex" });
                devLog(`📚 (choice) Codex entry unlocked: ${id}`);
              }
              break; }
            case "award_badge": {
              const id = typeof payload === "string" ? payload : (payload && typeof payload === "object" && "id" in payload ? String((payload as Record<string, unknown>).id) : undefined);
              const title = (payload && typeof payload === "object" && "title" in payload ? String((payload as Record<string, unknown>).title) : undefined) || id || "Badge";
              if (id) {
                try { awardBadge(id); } catch { /* ignore */ }
              }
              if (title) addNotification(`Badge: ${title}`, { variant: "badge" });
              devLog(`🏆 (choice) Badge awarded: ${title}`);
              break; }
            case "play_bgm":
              if (typeof payload === "string") {
                playBGM(payload);
                devLog(`🎵 (choice) Playing BGM: ${payload}`);
              }
              break;
            case "sfx":
              devLog(`🔊 (choice) SFX: ${payload}`);
              break;
            case "vfx":
              devLog(`✨ (choice) VFX: ${payload}`);
              break;
            case "goto_scene":
              if (typeof payload === "string") {
                setCurrentScene(payload);
                setCurrentDialogue(0);
                devLog(`🎬 (choice) Jumping to scene: ${payload}`);
              }
              break;
            case "set_flag":
              devLog(`🚩 (choice) Flag set: ${JSON.stringify(payload)}`);
              break;
            default:
              devLog(`❓ (choice) Unknown effect type: ${type}`);
          }
        });
      }

      // Handle karma changes
      if (choice.karma) {
        addKarma(choice.karma);
        const sign = choice.karma > 0 ? "+" : "";
        addNotification(`Karma ${sign}${choice.karma}`, { variant: "karma" });
      }

      // Handle single romance change
      if (choice.romance) {
        addRomance(choice.romance.character, choice.romance.points);
        const sign = choice.romance.points > 0 ? "+" : "";
        addNotification(
          `${choice.romance.character} ${sign}${choice.romance.points} Affection`,
          { variant: "romance" }
        );
      }

      // Handle multiple romance changes
      if (choice.romanceOptions) {
        choice.romanceOptions.forEach((romance) => {
          addRomance(romance.character, romance.points);
          const sign = romance.points > 0 ? "+" : "";
          addNotification(`${romance.character} ${sign}${romance.points} Affection`, { variant: "romance" });
        });
      }

  // Advance to the next line unless a goto_scene effect already changed the scene
  handleNext();

      // Record choice in backlog
      addBacklogEntry({ type: "choice", text: choice.text });
    }
  };

  // Global hotkeys: H hide UI, F fullscreen, B backlog
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "h" || e.key === "H") {
        toggleUiHidden();
      } else if (e.key === "f" || e.key === "F") {
        display.toggleFullscreen();
      } else if (e.key === "b" || e.key === "B") {
        setBacklogOpen(!backlogOpen);
      } else if ((e.ctrlKey && (e.key === "s" || e.key === "S"))) {
        // Quick save to slot 1
        e.preventDefault();
        try {
          useGameStore.getState().saveGame(0);
        } catch {
          // ignore
        }
      } else if ((e.ctrlKey && (e.key === "l" || e.key === "L"))) {
        // Quick load from slot 1
        e.preventDefault();
        try {
          useGameStore.getState().loadGame(0);
        } catch {
          // ignore
        }
      } else if (e.key === "Escape") {
        if (backlogOpen) setBacklogOpen(false);
        else if (uiHidden) toggleUiHidden();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleUiHidden, setBacklogOpen, backlogOpen, uiHidden]);

  // Auto / Skip progression
  useEffect(() => {
    if (!scene) return;
    const line = scene.dialogues[currentDialogue];
    if (!line) return;

    // Stop on choices or actions
    if (line.type === "choice" || line.type === "action") return;

    let t: number | undefined;
    const { autoMode, skipMode, isLineRead } = useGameStore.getState();
    const key = `${currentEpisode ?? 1}:${currentScene}:${currentDialogue}`;
    if (skipMode) {
      // Skip only read lines; stop at first unread
      if (isLineRead(key)) {
        t = window.setTimeout(() => handleNext(), 10);
      }
      return () => {
        if (t) clearTimeout(t);
      };
    }
    if (autoMode) {
      const chars = (line.text || "").length;
      const perChar = playerSettings.textSpeed ?? 25;
      const base = playerSettings.autoDelay ?? 500;
      const delay = Math.min(6000, base + chars * perChar);
      t = window.setTimeout(() => handleNext(), delay);
      return () => clearTimeout(t);
    }
  }, [scene, currentDialogue, currentEpisode, currentScene, playerSettings.textSpeed, playerSettings.autoDelay, handleNext]);

  // Mark current line as read when displayed (dialogue/narration only)
  useEffect(() => {
    if (!scene) return;
    const line = scene.dialogues[currentDialogue];
    if (!line) return;
    if (line.type === "dialogue" || line.type === "narration") {
      const key = `${currentEpisode ?? 1}:${currentScene}:${currentDialogue}`;
      try {
        useGameStore.getState().markLineRead(key);
      } catch {
        // ignore
      }
    }
  }, [scene, currentDialogue, currentEpisode, currentScene]);

  // Apply volume updates live
  useEffect(() => {
    audio.setLoopVolume(playerSettings.bgmVolume ?? 0.3);
  }, [playerSettings.bgmVolume]);

  // Show a temporary hint when UI is hidden
  useEffect(() => {
    if (uiHidden) {
      setShowUiHint(true);
      const t = setTimeout(() => setShowUiHint(false), 2500);
      return () => clearTimeout(t);
    }
  }, [uiHidden]);

  // Episode-based automatic Codex unlocks (Kübler-Ross stages)
  useEffect(() => {
    const stageByEpisode: Record<number, string> = {
      1: "denial",
      2: "anger",
      3: "bargaining",
      4: "depression",
      5: "testing",
      6: "acceptance",
    };
    const ep = (currentEpisode ?? 1) as number;
    const stage = stageByEpisode[ep];
    if (!stage) return;
    try {
      const st = useGameStore.getState();
      const id = `grief:${stage}`;
      const already = (st.codexEntries || []).includes(id);
      if (!already) {
        st.unlockCodexEntry(id);
        devLog(`📖 Auto-unlocked grief stage for episode ${ep}: ${id}`);
      }
    } catch {
      // ignore
    }
  }, [currentEpisode]);

  if (!scene) {
    return (
      <div className="game-engine loading loading-fade">
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  if (currentDialogue >= scene.dialogues.length) {
  devLog("⚠️ Dialogue index out of bounds, resetting to 0");
    setCurrentDialogue(0);
    return (
      <div className="game-engine loading loading-fade">
        <div className="loading-text">Scene Complete</div>
      </div>
    );
  }

  const currentLine = scene.dialogues[currentDialogue];
  // Get character positioning based on number of active characters
  const getCharacterPosition = (index: number, total: number) => {
    if (total === 1) return "center";
    if (total === 2) return index === 0 ? "left" : "right";
    if (total === 3) {
      if (index === 0) return "left";
      if (index === 1) return "center";
      return "right";
    }
    // For 4+ characters, use smart positioning to prevent overlaps
    if (total === 4) {
      const positions = ["left", "center", "center", "right"];
      return positions[index];
    }
    // For many characters, alternate left/right
    return index % 2 === 0 ? "left" : "right";
  };

  const activeCharacters = Object.entries(currentPortraits);
  const currentSpeaker =
    currentLine?.type === "dialogue" ? currentLine.character : null;

  devLog(
    `📋 Rendering dialogue ${currentDialogue}/${scene.dialogues.length - 1}:`,
    currentLine
  );
  devLog(
    `👥 Active characters:`,
    activeCharacters.map(([char]) => char)
  );

  

  return (
    <div className="game-engine scene-transition">
      <SceneBackground background={currentImage || scene.background} />
      {!uiHidden && <GameHUD />}

      {activeCharacters.map(([character, portrait], index) => (
        <CharacterPortrait
          key={character}
          character={character}
          portrait={portrait}
          position={
            getCharacterPosition(index, activeCharacters.length) as
              | "left"
              | "right"
              | "center"
          }
          positionIndex={index}
          totalCharacters={activeCharacters.length}
          isActive={currentSpeaker === character || currentSpeaker === null}
        />
      ))}

      {!uiHidden && (
        <DialogueBox
          line={currentLine}
          onNext={handleNext}
          onChoice={handleChoice}
        />
      )}

      {!uiHidden && (
        <button
          className="engine-menu-button btn-smooth"
          onClick={() => setShowMenu(!showMenu)}
          aria-label={showMenu ? "Close menu" : "Open menu"}
          title={showMenu ? "Close menu" : "Open menu"}
          type="button"
        >
          ☰
        </button>
      )}

      {showMenu && <GameMenu onClose={() => setShowMenu(false)} />}
      {uiHidden && (
        <>
          <button
            className="ui-reveal-handle"
            onClick={() => toggleUiHidden()}
            aria-label="Show UI"
            title="Show UI (H)"
            type="button"
          />
          {showUiHint && (
            <div className="ui-hidden-hint">UI hidden — tap top-right or press H</div>
          )}
        </>
      )}
      {/* Lightweight toasts for choice outcomes */}
      <Notifications />
      <Backlog />
    </div>
  );
};
