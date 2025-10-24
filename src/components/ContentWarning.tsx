import React, { useState } from "react";
import "./ContentWarning.css";

interface PlayerSettings {
  name: string;
  pronouns: "he/him" | "she/her" | "they/them";
}

interface ContentWarningProps {
  isOpen: boolean;
  onAccept: (settings: PlayerSettings) => void;
}

export const ContentWarning: React.FC<ContentWarningProps> = ({
  isOpen,
  onAccept,
}) => {
  const [playerName, setPlayerName] = useState("");
  const [pronouns, setPronouns] =
    useState<PlayerSettings["pronouns"]>("they/them");
  const [hasAcceptedWarning, setHasAcceptedWarning] = useState(false);

  if (!isOpen) return null;

  const handleAccept = () => {
    if (playerName.trim() && hasAcceptedWarning) {
      onAccept({ name: playerName.trim(), pronouns });
    }
  };

  return (
    <div className="content-warning-overlay">
      <div className="content-warning-panel">
        <div className="warning-header">
          <h2 className="neon-subtle">Important Notice — Chakra Hearts</h2>
        </div>

        <div className="warning-content">
          {/* Religious Respect Disclaimer */}
          <div className="disclaimer-section">
            <h3>Religious and Spiritual Respect</h3>
            <p>
              <strong>Chakra Hearts</strong> draws inspiration from various
              spiritual and religious traditions, including Hinduism, Buddhism,
              and other wisdom traditions. We approach these sacred concepts
              with deep respect and reverence.
            </p>
            <p>
              Our use of terms like "chakras," references to the{" "}
              <em>Bhagavad Gita</em>, and other spiritual concepts is intended
              as respectful exploration of universal themes of growth, love, and
              consciousness. We honor the profound wisdom of these traditions
              while creating an interactive narrative experience.
            </p>
          </div>

          {/* Content Warnings */}
          <div className="disclaimer-section">
            <h3>Content Warnings</h3>
            <p>
              This visual novel contains mature themes that some players may
              find sensitive:
            </p>
            <ul>
              <li>
                <strong>Grief and Loss:</strong> Death of loved ones, mourning,
                and emotional trauma
              </li>
              <li>
                <strong>Mental Health:</strong> Depression, anxiety, and
                psychological healing journeys
              </li>
              <li>
                <strong>Family Trauma:</strong> Authoritarian family dynamics,
                emotional abuse, codependency
              </li>
              <li>
                <strong>Betrayal and Abandonment:</strong> Broken trust,
                isolation, and spiritual crisis
              </li>
              <li>
                <strong>Reality and Consciousness:</strong> Questions about the
                nature of reality and existence
              </li>
              <li>
                <strong>Spiritual Corruption:</strong> Dark themes involving
                revenge and loss of faith
              </li>
            </ul>
            <p>
              <em>
                This game is designed as a healing journey, but please
                prioritize your mental health. Take breaks if needed, and seek
                support if any content triggers difficult emotions.
              </em>
            </p>
          </div>

          {/* Player Customization */}
          <div className="disclaimer-section">
            <h3>Your Journey Begins</h3>
            <p>Before we start, let's personalize your experience:</p>

            <div className="player-settings">
              <div className="setting-group">
                <label htmlFor="player-name">Your Name:</label>
                <input
                  id="player-name"
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Enter your name..."
                  maxLength={20}
                  className="name-input"
                />
              </div>

              <div className="setting-group">
                <label>Your Pronouns:</label>
                <div className="pronoun-options">
                  <label className="pronoun-option">
                    <input
                      type="radio"
                      name="pronouns"
                      value="he/him"
                      checked={pronouns === "he/him"}
                      onChange={(e) =>
                        setPronouns(
                          e.target.value as PlayerSettings["pronouns"]
                        )
                      }
                    />
                    <span>He/Him</span>
                  </label>
                  <label className="pronoun-option">
                    <input
                      type="radio"
                      name="pronouns"
                      value="she/her"
                      checked={pronouns === "she/her"}
                      onChange={(e) =>
                        setPronouns(
                          e.target.value as PlayerSettings["pronouns"]
                        )
                      }
                    />
                    <span>She/Her</span>
                  </label>
                  <label className="pronoun-option">
                    <input
                      type="radio"
                      name="pronouns"
                      value="they/them"
                      checked={pronouns === "they/them"}
                      onChange={(e) =>
                        setPronouns(
                          e.target.value as PlayerSettings["pronouns"]
                        )
                      }
                    />
                    <span>They/Them</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Acknowledgment */}
          <div className="disclaimer-section">
            <label className="acceptance-checkbox">
              <input
                type="checkbox"
                checked={hasAcceptedWarning}
                onChange={(e) => setHasAcceptedWarning(e.target.checked)}
              />
              <span>
                I acknowledge the content warnings and understand that this game
                explores mature themes. I confirm that I approach the spiritual
                content with respect and am prepared for an emotionally complex
                narrative experience.
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="warning-actions">
            <button
              className="accept-button"
              onClick={handleAccept}
              disabled={!playerName.trim() || !hasAcceptedWarning}
            >
              Begin My Journey
            </button>
            <p className="privacy-note">
              <em>
                Your settings are stored locally and never shared. You can
                change your name and pronouns in the settings menu at any time.
              </em>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentWarning;
