import React, { useState, useEffect, useRef, useCallback } from "react";
import { useGameStore } from "../stores/gameStore";
import { DialogueBox } from "./DialogueBox";
import { SceneBackground } from "./SceneBackground";
import { CharacterPortrait } from "./CharacterPortrait";
import { GameMenu } from "./GameMenu";
import { GameHUD } from "./GameHUD";
import { getScene } from "../utils/sceneLoader";
import { AUDIO, CHARACTERS, AVATARS } from "../assets";
import type { Scene } from "../types";
import "./GameEngine.css";

export const GameEngine: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [currentPortraits, setCurrentPortraits] = useState<
    Record<string, string>
  >({});

  // Audio reference for background music only
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const [currentBGM, setCurrentBGM] = useState<string>("");

  const {
    currentScene,
    currentDialogue,
    setCurrentDialogue,
    setCurrentScene,
    addKarma,
    addRomance,
    getSelectedAvatar,
  } = useGameStore();

  // Character portrait mapping - switches between human and animal forms
  const getCharacterPortrait = useCallback(
    (character: string, sceneId: string) => {
      console.log(`🎭 Getting portrait for ${character} in scene ${sceneId}`);

      // Use human forms in prologue, animal forms in visions/spiritual scenes
      if (sceneId === "prologue") {
        switch (character) {
          case "AGNIVESH":
            console.log(`👤 Using human form for AGNIVESH in prologue`);
            return CHARACTERS.AGNIVESH_HUMAN;
          case "SANTI":
            console.log(`👤 Using human form for SANTI in prologue`);
            return CHARACTERS.SANTI_HUMAN;
          case "DAVID":
            return CHARACTERS.DAVID_BASE;
          case "ELENA":
            return CHARACTERS.ELENA_BASE;
          case "MC": {
            const selectedAvatar = getSelectedAvatar();
            console.log(`🔍 DEBUG MC: selectedAvatar = "${selectedAvatar}"`);
            console.log(`🔍 DEBUG MC: type = ${typeof selectedAvatar}`);
            if (selectedAvatar) {
              const avatarKey =
                selectedAvatar.toUpperCase() as keyof typeof AVATARS;
              console.log(`🔍 DEBUG MC: avatarKey = "${avatarKey}"`);
              console.log(
                `🔍 DEBUG MC: AVATARS[avatarKey] = "${AVATARS[avatarKey]}"`
              );
              console.log(
                `🎯 MC character using selected avatar: ${selectedAvatar}`
              );
              return AVATARS[avatarKey];
            }
            console.log(
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
            console.log(`🐾 Using panther form for AGNIVESH in vision`);
            return CHARACTERS.AGNIVESH_BASE;
          case "SANTI":
            console.log(`🐍 Using serpent form for SANTI in vision`);
            return CHARACTERS.SANTI_BASE;
          default:
            break;
        }
      }

      // Default mapping for all other scenes
      if (character === "MC") {
        const selectedAvatar = getSelectedAvatar();
        console.log(`🔍 Debug: selectedAvatar value: "${selectedAvatar}"`);
        console.log(`🔍 Debug: selectedAvatar type: ${typeof selectedAvatar}`);
        if (selectedAvatar) {
          const avatarKey =
            selectedAvatar.toUpperCase() as keyof typeof AVATARS;
          console.log(
            `🎯 MC character using selected avatar: ${selectedAvatar}`
          );
          return AVATARS[avatarKey];
        }
        console.log(`🎯 MC character using fallback: ${CHARACTERS.MC_BASE}`);
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
        console.log(
          `🎯 Default MC mapping: ${result} (from ${CHARACTERS.MC_BASE})`
        );
      }
      return result;
    },
    [getSelectedAvatar]
  );

  const [scene, setScene] = useState<Scene | null>(null);

  // Audio functions with overlap prevention
  const playBGM = useCallback(
    (trackName: string) => {
      // Prevent playing the same BGM twice
      if (currentBGM === trackName) {
        console.log(`🎵 BGM ${trackName} already playing, skipping`);
        return;
      }

      try {
        const audioPath = AUDIO.BGM[trackName as keyof typeof AUDIO.BGM];
        if (audioPath) {
          // Stop current BGM if playing
          if (bgmRef.current) {
            bgmRef.current.pause();
            bgmRef.current.currentTime = 0;
          }

          // Create new audio element
          bgmRef.current = new Audio(audioPath);
          bgmRef.current.loop = true;
          bgmRef.current.volume = 0.3; // Reduced volume to prevent overlap issues

          // Add error handling
          bgmRef.current.onerror = () => {
            console.log(`❌ Failed to load BGM: ${trackName}`);
            setCurrentBGM("");
          };

          bgmRef.current.onended = () => {
            setCurrentBGM("");
          };

          bgmRef.current.play().catch(() => {
            console.log("🔇 BGM play blocked - user needs to interact first");
            setCurrentBGM("");
          });

          setCurrentBGM(trackName);
          console.log(`🎵 Playing BGM: ${trackName}`);
        } else {
          console.log(`❌ BGM track not found: ${trackName}`);
        }
      } catch (error) {
        console.log("BGM error:", error);
        setCurrentBGM("");
      }
    },
    [currentBGM]
  );

  const playSFX = useCallback((effectName: string) => {
    // SFX completely removed - BGM only audio experience
    console.log(`🔇 SFX removed: ${effectName}`);
  }, []);

  // Process current dialogue line for actions and character portraits
  useEffect(() => {
    if (!scene || currentDialogue >= scene.dialogues.length) return;

    const currentLine = scene.dialogues[currentDialogue];
    console.log(
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
        console.log(
          `👤 Showing portrait for ${currentLine.character}: ${characterPortrait}`
        );
      } else {
        console.warn(
          `⚠️ No portrait found for character: ${currentLine.character}`
        );
      }
    }

    // Handle action commands
    if (currentLine.type === "action" && currentLine.action) {
      console.log(`⚡ Executing action: ${currentLine.action.type}`);

      switch (currentLine.action.type) {
        case "play_bgm":
          playBGM(currentLine.action.payload);
          break;
        case "stop_bgm":
          if (bgmRef.current) {
            bgmRef.current.pause();
            bgmRef.current.currentTime = 0;
            bgmRef.current = null;
          }
          setCurrentBGM("");
          console.log("🔇 BGM stopped");
          break;
        case "show_image":
          setCurrentImage(currentLine.action.payload);
          console.log(`🖼️ Showing image: ${currentLine.action.payload}`);
          break;
        case "goto_scene":
          setCurrentScene(currentLine.action.payload);
          setCurrentDialogue(0);
          return; // Don't auto-advance for scene changes
      }

      // Auto-advance through action lines (except scene changes)
      console.log(
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
  ]);

  useEffect(() => {
    const loadScene = async () => {
      const sceneData = await getScene(currentScene);
      setScene(sceneData);

      // Clear portraits when changing scenes
      setCurrentPortraits({});

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
          console.log(`🔍 Preloading ${character}: ${portrait}`);
          if (portrait) {
            newPortraits[character] = portrait;
          } else {
            console.log(
              `⚠️ No portrait found for preload character: ${character}`
            );
          }
        });
        setCurrentPortraits(newPortraits);
        console.log(
          `🎬 Scene ${currentScene}: Preloaded characters:`,
          Object.keys(newPortraits),
          newPortraits
        );
      }

      console.log(`🎬 Scene changed to: ${currentScene}`);
    };
    loadScene();
  }, [currentScene, getCharacterPortrait]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
      }
    };
  }, []);

  const handleNext = () => {
    if (!scene) return;

    const nextIndex = currentDialogue + 1;
    if (nextIndex < scene.dialogues.length) {
      setCurrentDialogue(nextIndex);
    } else {
      // Scene complete - could advance to next scene
      console.log("Scene complete");
    }
  };

  const handleChoice = (choiceIndex: number) => {
    const currentLine = scene?.dialogues[currentDialogue];
    if (currentLine?.type === "choice" && currentLine.choices) {
      const choice = currentLine.choices[choiceIndex];

      // Execute the choice action
      choice.action();

      // Handle karma changes
      if (choice.karma) {
        addKarma(choice.karma);
      }

      // Handle single romance change
      if (choice.romance) {
        addRomance(choice.romance.character, choice.romance.points);
      }

      // Handle multiple romance changes
      if (choice.romanceOptions) {
        choice.romanceOptions.forEach((romance) => {
          addRomance(romance.character, romance.points);
        });
      }

      handleNext();
    }
  };

  if (!scene) {
    return (
      <div className="game-engine loading">
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  if (currentDialogue >= scene.dialogues.length) {
    console.log("⚠️ Dialogue index out of bounds, resetting to 0");
    setCurrentDialogue(0);
    return (
      <div className="game-engine loading">
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

  console.log(
    `📋 Rendering dialogue ${currentDialogue}/${scene.dialogues.length - 1}:`,
    currentLine
  );
  console.log(
    `👥 Active characters:`,
    activeCharacters.map(([char]) => char)
  );

  return (
    <div className="game-engine">
      <SceneBackground background={currentImage || scene.background} />

      <GameHUD />

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

      <DialogueBox
        line={currentLine}
        onNext={handleNext}
        onChoice={handleChoice}
      />

      <button className="menu-button" onClick={() => setShowMenu(!showMenu)}>
        ☰
      </button>

      {showMenu && <GameMenu onClose={() => setShowMenu(false)} />}
    </div>
  );
};
