import { useState } from "react";
import { GameEngine } from "./components/GameEngine";
import { MainMenu } from "./components/MainMenu";
import "./App.css";

function App() {
  const [gameState, setGameState] = useState<"menu" | "playing">("menu");

  const handleStartGame = () => {
    setGameState("playing");
  };

  const handleLoadGame = () => {
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
