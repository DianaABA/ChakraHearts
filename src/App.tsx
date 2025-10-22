import { useState } from "react";
import { GameEngine } from "./components/GameEngine";
import { MainMenu } from "./components/MainMenu";
import { useGameStore } from "./stores/gameStore";
import "./App.css";

function App() {
  const [gameState, setGameState] = useState<"menu" | "playing">("menu");
  const { resetGame } = useGameStore();

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

  return (
    <div className="app">
      {gameState === "menu" ? (
        <MainMenu onStartGame={handleStartGame} onLoadGame={handleLoadGame} />
      ) : (
        <GameEngine />
      )}
    </div>
  );
}

export default App;
