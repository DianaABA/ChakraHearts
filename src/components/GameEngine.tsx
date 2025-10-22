import React, { useState, useEffect, useRef } from "react";
import { useGameStore } from "../stores/gameStore";
import { DialogueBox } from "./DialogueBox";
import { SceneBackground } from "./SceneBackground";
import { CharacterPortrait } from "./CharacterPortrait";
import { GameMenu } from "./GameMenu";
import { getScene } from "../utils/sceneLoader";
import { AUDIO, CHARACTERS } from "../assets";
import type { Scene } from "../types";
import "./GameEngine.css";

export const GameEngine: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [currentPortraits, setCurrentPortraits] = useState<
    Record<string, string>
  >({});

  // Character portrait mapping - switches between human and animal forms
  const getCharacterPortrait = (character: string, sceneId: string) => {
    // Use human forms in prologue, animal forms in visions/spiritual scenes
    if (sceneId === "prologue") {
      switch (character) {
        case "AGNIVESH":
          return CHARACTERS.AGNIVESH_HUMAN;
        case "SANTI":
          return CHARACTERS.SANTI_HUMAN;
        default:
          break;
      }
    }

    // Default mapping for all scenes
    const CHARACTER_PORTRAITS: Record<string, string> = {
      DAVID: CHARACTERS.DAVID_BASE,
      ELENA: CHARACTERS.ELENA_BASE,
      AGNIVESH: CHARACTERS.AGNIVESH_BASE, // Animal form for spiritual scenes
      SANTI: CHARACTERS.SANTI_BASE, // Animal form for spiritual scenes
      AURORA: CHARACTERS.AURORA_BASE,
      UMBRA: CHARACTERS.UMBRA_BASE,
      MC: CHARACTERS.MC_BASE,
    };

    return CHARACTER_PORTRAITS[character];
  };

  // Audio references for background music and sound effects
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const sfxRef = useRef<HTMLAudioElement | null>(null);

  const {
    currentScene,
    currentDialogue,
    setCurrentDialogue,
    setCurrentScene,
    addKarma,
    addRomance,
  } = useGameStore();

  const [scene, setScene] = useState<Scene | null>(null);

  // Audio functions
  const playBGM = (trackName: string) => {
    try {
      const audioPath = AUDIO.BGM[trackName as keyof typeof AUDIO.BGM];
      if (audioPath) {
        // Stop current BGM if playing
        if (bgmRef.current) {
          bgmRef.current.pause();
        }

        // Create new audio element
        bgmRef.current = new Audio(audioPath);
        bgmRef.current.loop = true;
        bgmRef.current.volume = 0.4; // Reduced volume for better experience

        // Add error handling
        bgmRef.current.onerror = () => {
          console.log(`❌ Failed to load BGM: ${trackName}`);
        };

        bgmRef.current.play().catch(() => {
          console.log("🔇 BGM play blocked - user needs to interact first");
        });

        console.log(`🎵 Playing BGM: ${trackName}`);
      } else {
        console.log(`❌ BGM track not found: ${trackName}`);
      }
    } catch (error) {
      console.log("BGM error:", error);
    }
  };

  const playSFX = (effectName: string) => {
    try {
      const audioPath = AUDIO.SFX[effectName as keyof typeof AUDIO.SFX];
      if (audioPath) {
        // Create new audio element for SFX
        sfxRef.current = new Audio(audioPath);
        sfxRef.current.volume = 0.6; // Balanced volume

        // Add error handling
        sfxRef.current.onerror = () => {
          console.log(`❌ Failed to load SFX: ${effectName}`);
        };

        sfxRef.current.play().catch(() => {
          console.log("🔇 SFX play blocked - user needs to interact first");
        });

        console.log(`🔊 Playing SFX: ${effectName}`);
      } else {
        console.log(`❌ SFX not found: ${effectName}`);
      }
    } catch (error) {
      console.log("SFX error:", error);
    }
  };

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
        case "play_sfx":
          playSFX(currentLine.action.payload);
          break;
        case "play_bgm":
          playBGM(currentLine.action.payload);
          break;
        case "stop_bgm":
          if (bgmRef.current) {
            bgmRef.current.pause();
            bgmRef.current = null;
          }
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
    currentScene,
    getCharacterPortrait,
  ]);

  useEffect(() => {
    const loadScene = async () => {
      const sceneData = await getScene(currentScene);
      setScene(sceneData);
      // Clear portraits when changing scenes
      setCurrentPortraits({});
      console.log(`🎬 Scene changed to: ${currentScene}, cleared portraits`);
    };
    loadScene();
  }, [currentScene]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
      }
      if (sfxRef.current) {
        sfxRef.current.pause();
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
  console.log(
    `📋 Rendering dialogue ${currentDialogue}/${scene.dialogues.length - 1}:`,
    currentLine
  );

  return (
    <div className="game-engine">
      <SceneBackground background={currentImage || scene.background} />

      {Object.entries(currentPortraits).map(([character, portrait]) => (
        <CharacterPortrait
          key={character}
          character={character}
          portrait={portrait}
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
