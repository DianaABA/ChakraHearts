import React, { useEffect, useRef, useState } from "react";
import { useGameStore } from "../../stores/gameStore";
import { display } from "../../platform/screen";
import "./PlayerSettings.css";

interface PlayerSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  initialSection?: "personal" | "audio" | "display" | "reading" | "content";
}

export const PlayerSettings: React.FC<PlayerSettingsProps> = ({
  isOpen,
  onClose,
  initialSection,
}) => {
  const { playerSettings, setPlayerSettings, resetContentWarning } = useGameStore();
  const [tempName, setTempName] = useState(playerSettings.name);
  const [tempPronouns, setTempPronouns] = useState(playerSettings.pronouns);
  const [bgmVolume, setBgmVolume] = useState(playerSettings.bgmVolume ?? 0.3);
  const [textSpeed, setTextSpeed] = useState(playerSettings.textSpeed ?? 25);
  const [autoDelay, setAutoDelay] = useState(playerSettings.autoDelay ?? 500);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Refs to scroll to sections
  const panelRef = useRef<HTMLDivElement | null>(null);
  const personalRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLDivElement | null>(null);
  const displayRef = useRef<HTMLDivElement | null>(null);
  const readingRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Sync fullscreen state and listen to changes
  useEffect(() => {
    if (!isOpen) return;
    const updateFs = () => setIsFullscreen(display.isFullscreen());
    updateFs();
    document.addEventListener("fullscreenchange", updateFs);
    return () => document.removeEventListener("fullscreenchange", updateFs);
  }, [isOpen]);

  // Scroll to initial section when opened
  useEffect(() => {
    if (!isOpen) return;
    const target =
      initialSection === "audio"
        ? audioRef.current
        : initialSection === "display"
        ? displayRef.current
        : initialSection === "reading"
        ? readingRef.current
        : initialSection === "content"
        ? contentRef.current
        : personalRef.current;
    if (target) {
      // Use setTimeout to ensure layout is ready
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }, [isOpen, initialSection]);

  if (!isOpen) return null;

  const handleSave = () => {
    setPlayerSettings({
      name: tempName.trim() || "Player",
      pronouns: tempPronouns,
      bgmVolume,
      textSpeed,
      autoDelay,
    });
    onClose();
  };

  const handleReset = () => {
    setTempName(playerSettings.name);
    setTempPronouns(playerSettings.pronouns);
    setBgmVolume(playerSettings.bgmVolume ?? 0.3);
    setTextSpeed(playerSettings.textSpeed ?? 25);
    setAutoDelay(playerSettings.autoDelay ?? 500);
  };

  return (
    <div
      className="player-settings-overlay"
      onClick={(e) => {
        if (e.currentTarget === e.target) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Player Settings"
    >
      <div
        className="player-settings-panel"
        onClick={(e) => e.stopPropagation()}
        ref={panelRef}
      >
        <div className="settings-header">
          <h2 className="neon-subtle">Player Settings</h2>
          <button className="settings-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="settings-content">
          <div className="setting-section" ref={personalRef}>
            <h3>Personal Information</h3>

            <div className="setting-group">
              <label htmlFor="settings-name">Your Name:</label>
              <input
                id="settings-name"
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Enter your name..."
                maxLength={20}
                className="settings-input"
              />
              <p className="setting-hint">
                This is how you'll be addressed in the story
              </p>
            </div>

            <div className="setting-group">
              <label>Your Pronouns:</label>
              <div className="pronoun-options">
                <label className="pronoun-option">
                  <input
                    type="radio"
                    name="settings-pronouns"
                    value="he/him"
                    checked={tempPronouns === "he/him"}
                    onChange={(e) =>
                      setTempPronouns(
                        e.target.value as "he/him" | "she/her" | "they/them"
                      )
                    }
                  />
                  <span>He/Him</span>
                </label>
                <label className="pronoun-option">
                  <input
                    type="radio"
                    name="settings-pronouns"
                    value="she/her"
                    checked={tempPronouns === "she/her"}
                    onChange={(e) =>
                      setTempPronouns(
                        e.target.value as "he/him" | "she/her" | "they/them"
                      )
                    }
                  />
                  <span>She/Her</span>
                </label>
                <label className="pronoun-option">
                  <input
                    type="radio"
                    name="settings-pronouns"
                    value="they/them"
                    checked={tempPronouns === "they/them"}
                    onChange={(e) =>
                      setTempPronouns(
                        e.target.value as "he/him" | "she/her" | "they/them"
                      )
                    }
                  />
                  <span>They/Them</span>
                </label>
              </div>
              <p className="setting-hint">
                Used for character dialogue referring to you
              </p>
            </div>
          </div>

          <div className="setting-section">
            <h3>Content & Accessibility</h3>
            <p className="accessibility-note">
              Chakra Hearts explores mature themes including grief, trauma, and
              spiritual journey. If you need to step away at any time, your
              progress is automatically saved.
            </p>
            <p className="respect-note">
              We approach all spiritual and religious content with deep respect
              and reverence. Our use of sacred concepts is intended for healing
              and growth.
            </p>
          </div>

          <div className="setting-section" ref={audioRef}>
            <h3>Audio</h3>
            <div className="setting-group">
              <label htmlFor="bgm-volume">BGM Volume: {Math.round(bgmVolume * 100)}%</label>
              <input
                id="bgm-volume"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={bgmVolume}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  setBgmVolume(v);
                  // Live-apply so changes are responsive immediately
                  setPlayerSettings({ bgmVolume: v });
                }}
              />
            </div>
            {/* SFX currently disabled for a cleaner audio experience */}
          </div>

          <div className="setting-section" ref={displayRef}>
            <h3>Display</h3>
            <div className="setting-group">
              <label htmlFor="fullscreen-toggle">Fullscreen</label>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <input
                  id="fullscreen-toggle"
                  type="checkbox"
                  checked={isFullscreen}
                  onChange={async (e) => {
                    const next = e.target.checked;
                    setIsFullscreen(next);
                    if (next) {
                      await display.enterFullscreen();
                    } else {
                      await display.exitFullscreen();
                    }
                  }}
                />
                <span style={{ color: "#bdc3c7", fontSize: 14 }}>
                  {isFullscreen ? "Fullscreen enabled" : "Windowed mode"}
                </span>
              </div>
              <p className="setting-hint">Press F to toggle anytime.</p>
            </div>
          </div>

          <div className="setting-section" ref={readingRef}>
            <h3>Reading</h3>
            <div className="setting-group">
              <label htmlFor="text-speed">Text Speed (ms/char): {textSpeed}</label>
              <input
                id="text-speed"
                type="range"
                min={5}
                max={60}
                step={1}
                value={textSpeed}
                onChange={(e) => {
                  const v = parseInt(e.target.value);
                  setTextSpeed(v);
                  setPlayerSettings({ textSpeed: v });
                }}
              />
            </div>
            <div className="setting-group">
              <label htmlFor="auto-delay">Auto Delay (ms): {autoDelay}</label>
              <input
                id="auto-delay"
                type="range"
                min={0}
                max={1500}
                step={50}
                value={autoDelay}
                onChange={(e) => {
                  const v = parseInt(e.target.value);
                  setAutoDelay(v);
                  setPlayerSettings({ autoDelay: v });
                }}
              />
            </div>
          </div>
        </div>

        <div className="settings-actions">
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
          <button className="save-button" onClick={handleSave}>
            Save Changes
          </button>
        </div>

        <div className="setting-section content-warning-controls" ref={contentRef}>
          <h3>Content Warning</h3>
          <p className="warning-status">
            Status: {playerSettings.hasSeenContentWarning ? "Seen" : "Not seen"}
          </p>
          <button
            type="button"
            className="reset-warning-button"
            onClick={() => resetContentWarning()}
          >
            Reset Content Warning
          </button>
          <p className="setting-hint">
            The Content Warning will appear again the next time you open the Main Menu or reload the app.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerSettings;
