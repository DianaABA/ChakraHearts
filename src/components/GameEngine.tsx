import React, { useState, useEffect } from "react";
import { useGameStore } from "../stores/gameStore";
import { DialogueBox } from "./DialogueBox";
import { SceneBackground } from "./SceneBackground";
import { CharacterPortrait } from "./CharacterPortrait";
import { GameMenu } from "./GameMenu";
import { getScene } from "../utils/sceneLoader";
import type { Scene, DialogueLine } from "../types";
import "./GameEngine.css";

export const GameEngine: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [currentPortraits] = useState<Record<string, string>>({});

  const {
    currentScene,
    currentDialogue,
    setCurrentDialogue,
    setCurrentScene,
    addKarma,
    addRomance,
  } = useGameStore();

  const [scene, setScene] = useState<Scene | null>(null);

  useEffect(() => {
    const loadScene = async () => {
      const sceneData = await getScene(currentScene);
      setScene(sceneData);
    };
    loadScene();
  }, [currentScene]);

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
  const executeAction = (line: DialogueLine) => {
    if (line.action) {
      switch (line.action.type) {
        case "show_image":
          setCurrentImage(line.action.payload);
          break;
        case "goto_scene":
          setCurrentScene(line.action.payload);
          setCurrentDialogue(0);
          break;
        // Add more action handlers as needed
      }
    }
  };

  useEffect(() => {
    if (scene && scene.dialogues[currentDialogue]) {
      executeAction(scene.dialogues[currentDialogue]);
    }
  }, [scene, currentDialogue]);

  if (!scene) {
    return (
      <div className="game-engine loading">
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  const currentLine = scene.dialogues[currentDialogue];

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
