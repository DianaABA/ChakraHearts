import React from "react";
import { useGameStore } from "../stores/gameStore";
import "./GameMenu.css";

interface GameMenuProps {
  onClose: () => void;
}

export const GameMenu: React.FC<GameMenuProps> = ({ onClose }) => {
  const { saveGame, loadGame, resetGame } = useGameStore();

  return (
    <div className="game-menu-overlay" onClick={onClose}>
      <div className="game-menu" onClick={(e) => e.stopPropagation()}>
        <h3>Game Menu</h3>
        <button onClick={() => saveGame(0)}>Save Game</button>
        <button onClick={() => loadGame(0)}>Load Game</button>
        <button onClick={resetGame}>New Game</button>
        <button onClick={onClose}>Resume</button>
      </div>
    </div>
  );
};
