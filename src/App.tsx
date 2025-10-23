import { useState } from "react";
import { GameEngine } from "./components/core/GameEngine";
import { MainMenu } from "./components/ui/MainMenu";
import ContentWarning from "./components/ContentWarning";
import { useGameStore } from "./stores/gameStore";
import "./App.css";

function App() {
  const [gameState, setGameState] = useState<"menu" | "playing">("menu");
  const {
    resetGame,
    playerSettings,
    setPlayerSettings,
    markContentWarningSeen,
  } = useGameStore();

  const handleStartGame = () => {
    // Stop all audio before starting game
    const allAudio = document.querySelectorAll("audio");
    allAudio.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });

    resetGame(); // Reset the game state for a fresh start
    setGameState("playing");
  };

  const handleLoadGame = () => {
    // Stop all audio before loading game
    const allAudio = document.querySelectorAll("audio");
    allAudio.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });

    setGameState("playing");
  };

  const handleContentWarningAccept = (settings: {
    name: string;
    pronouns: "he/him" | "she/her" | "they/them";
  }) => {
    setPlayerSettings(settings);
    markContentWarningSeen();
  };

  // Show content warning if not seen yet
  const showContentWarning = !playerSettings.hasSeenContentWarning;

  return (
    <div className="app">
      {showContentWarning && (
        <ContentWarning isOpen={true} onAccept={handleContentWarningAccept} />
      )}

      {gameState === "menu" ? (
        <MainMenu onStartGame={handleStartGame} onLoadGame={handleLoadGame} />
      ) : (
        <GameEngine />
      )}
    </div>
  );
}

export default App;
