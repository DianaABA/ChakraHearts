import React, { useState } from "react";
import { useGameStore } from "../../stores/gameStore";
import "./PlayerSettings.css";

interface PlayerSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlayerSettings: React.FC<PlayerSettingsProps> = ({
  isOpen,
  onClose,
}) => {
  const { playerSettings, setPlayerSettings } = useGameStore();
  const [tempName, setTempName] = useState(playerSettings.name);
  const [tempPronouns, setTempPronouns] = useState(playerSettings.pronouns);

  if (!isOpen) return null;

  const handleSave = () => {
    setPlayerSettings({
      name: tempName.trim() || "Player",
      pronouns: tempPronouns,
    });
    onClose();
  };

  const handleReset = () => {
    setTempName(playerSettings.name);
    setTempPronouns(playerSettings.pronouns);
  };

  return (
    <div className="player-settings-overlay">
      <div className="player-settings-panel">
        <div className="settings-header">
          <h2>⚙️ Player Settings</h2>
          <button className="settings-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="settings-content">
          <div className="setting-section">
            <h3>👤 Personal Information</h3>

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
            <h3>🛡️ Content & Accessibility</h3>
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
        </div>

        <div className="settings-actions">
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
          <button className="save-button" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerSettings;
