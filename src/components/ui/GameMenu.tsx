import React, { useEffect, useState } from "react";
import { useGameStore } from "../../stores/gameStore";
import PlayerSettings from "./PlayerSettings";
import "./GameMenu.css";

interface GameMenuProps {
  onClose: () => void;
}

export const GameMenu: React.FC<GameMenuProps> = ({ onClose }) => {
  const { saveGame, loadGame, resetGame, resetContentWarning, saveSlots } = useGameStore();
  const [currentSection, setCurrentSection] = useState<
    "main" | "settings" | "save" | "load"
  >("main");
  const [showPlayerSettings, setShowPlayerSettings] = useState(false);

  // Close menu on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleSaveGame = (slot: number) => {
    saveGame(slot);
    setCurrentSection("main");
  };

  const handleLoadGame = (slot: number) => {
    loadGame(slot);
    onClose();
  };

  const renderMainMenu = () => (
    <>
      <div className="menu-header">
        <h3>🎮 Game Menu</h3>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="menu-buttons">
        <button
          onClick={() => setCurrentSection("save")}
          className="menu-button primary"
        >
          💾 Save Game
        </button>
        <button
          onClick={() => setCurrentSection("load")}
          className="menu-button"
        >
          📁 Load Game
        </button>
        <button
          onClick={() => setCurrentSection("settings")}
          className="menu-button"
        >
          ⚙️ Settings
        </button>
        <button onClick={resetGame} className="menu-button warning">
          🔄 New Game
        </button>
        <button onClick={onClose} className="menu-button resume">
          ▶️ Resume
        </button>
      </div>
    </>
  );

  const fmt = (ts: number) =>
    ts
      ? new Date(ts).toLocaleString(undefined, {
          hour12: false,
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "empty";

  const renderSaveMenu = () => (
    <>
      <h3>💾 Save Game</h3>
      <div className="save-slots">
        {saveSlots.map((slot) => (
          <button
            key={slot.id}
            onClick={() => handleSaveGame(slot.id)}
            className="save-slot-button"
          >
            <div className="slot-header">Slot {slot.id + 1}</div>
            <div className="slot-info">
              {slot.timestamp ? (
                <>
                  <div>{fmt(slot.timestamp)}</div>
                  <div>Scene: {slot.sceneName || "?"}</div>
                  <div>Line: {slot.dialogueIndex}</div>
                </>
              ) : (
                <div>Empty — click to save</div>
              )}
            </div>
          </button>
        ))}
      </div>
      <button
        onClick={() => setCurrentSection("main")}
        className="menu-button back"
      >
        ← Back
      </button>
    </>
  );

  const renderLoadMenu = () => (
    <>
      <h3>📁 Load Game</h3>
      <div className="save-slots">
        {saveSlots.map((slot) => (
          <button
            key={slot.id}
            onClick={() => handleLoadGame(slot.id)}
            className="save-slot-button"
            disabled={!slot.timestamp}
          >
            <div className="slot-header">Slot {slot.id + 1}</div>
            <div className="slot-info">
              {slot.timestamp ? (
                <>
                  <div>{fmt(slot.timestamp)}</div>
                  <div>Scene: {slot.sceneName || "?"}</div>
                  <div>Line: {slot.dialogueIndex}</div>
                </>
              ) : (
                <div>Empty</div>
              )}
            </div>
          </button>
        ))}
      </div>
      <button
        onClick={() => setCurrentSection("main")}
        className="menu-button back"
      >
        ← Back
      </button>
    </>
  );

  const renderSettingsMenu = () => (
    <>
      <h3>⚙️ Settings</h3>
      <div className="settings-buttons">
        <button
          onClick={() => setShowPlayerSettings(true)}
          className="settings-button"
        >
          <div className="setting-title">👤 Player Settings</div>
          <div className="setting-desc">Change name and pronouns</div>
        </button>

        <button className="settings-button">
          <div className="setting-title">🔊 Audio Settings</div>
          <div className="setting-desc">Volume and music controls</div>
        </button>

        <button className="settings-button">
          <div className="setting-title">🎨 Display Settings</div>
          <div className="setting-desc">Visual preferences and themes</div>
        </button>

        <button className="settings-button">
          <div className="setting-title">🎮 Gameplay Settings</div>
          <div className="setting-desc">Auto-advance and preferences</div>
        </button>

        <button className="settings-button">
          <div className="setting-title">♿ Accessibility</div>
          <div className="setting-desc">Screen reader and contrast options</div>
        </button>

        <button 
          onClick={() => {
            resetContentWarning();
            alert("Content warning reset! Refresh the page to see it again.");
          }}
          className="settings-button"
        >
          <div className="setting-title">🔄 Reset Content Warning</div>
          <div className="setting-desc">Show content warning on next visit</div>
        </button>
      </div>
      <button
        onClick={() => setCurrentSection("main")}
        className="menu-button back"
      >
        ← Back
      </button>
    </>
  );

  return (
    <div className="game-menu-overlay">
      <div className="game-menu" onClick={(e) => e.stopPropagation()}>
        {currentSection === "main" && renderMainMenu()}
        {currentSection === "save" && renderSaveMenu()}
        {currentSection === "load" && renderLoadMenu()}
        {currentSection === "settings" && renderSettingsMenu()}
      </div>

      {/* Player Settings Modal */}
      <PlayerSettings
        isOpen={showPlayerSettings}
        onClose={() => setShowPlayerSettings(false)}
      />
    </div>
  );
};
