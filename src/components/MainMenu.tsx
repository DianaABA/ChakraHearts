import React, { useState } from "react";
import { useGameStore } from "../stores/gameStore";
import { AVATARS, UI } from "../assets";
import "./MainMenu.css";

export interface AvatarOption {
  id: string;
  name: string;
  description: string;
  image: string;
  chakra: string;
}

const AVATAR_OPTIONS: AvatarOption[] = [
  {
    id: "binary",
    name: "Binary Seeker",
    description:
      "Between 0 and 1, you find infinite possibility. Master of digital consciousness.",
    image: AVATARS.BINARY,
    chakra: "Crown",
  },
  {
    id: "iron",
    name: "Iron Guardian",
    description:
      "Forged in fire, tempered by will. Your strength protects the vulnerable.",
    image: AVATARS.IRON,
    chakra: "Root",
  },
  {
    id: "lotus",
    name: "Lotus Mystic",
    description:
      "From mud to enlightenment, you transform darkness into light.",
    image: AVATARS.LOTUS,
    chakra: "Heart",
  },
  {
    id: "nomad",
    name: "Digital Nomad",
    description:
      "Free from constraints, you walk between worlds with ancient wisdom.",
    image: AVATARS.NOMAD,
    chakra: "Throat",
  },
  {
    id: "ocean",
    name: "Ocean Sage",
    description:
      "Deep as the abyss, flowing like time itself. Emotions are your domain.",
    image: AVATARS.OCEAN,
    chakra: "Sacral",
  },
  {
    id: "sky",
    name: "Sky Walker",
    description:
      "Above the clouds, beyond limitations. Your vision sees all possibilities.",
    image: AVATARS.SKY,
    chakra: "Third Eye",
  },
  {
    id: "stone",
    name: "Stone Keeper",
    description:
      "Ancient as mountains, steady as earth. You are the foundation of truth.",
    image: AVATARS.STONE,
    chakra: "Solar Plexus",
  },
];

interface MainMenuProps {
  onStartGame: () => void;
  onLoadGame: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onStartGame,
  onLoadGame,
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");
  const [showAvatarSelect, setShowAvatarSelect] = useState(false);
  const { setFlag } = useGameStore();

  const handleNewGame = () => {
    setShowAvatarSelect(true);
  };

  const handleAvatarSelect = (avatarId: string) => {
    setSelectedAvatar(avatarId);
    setFlag("selectedAvatar", true);
    // Store avatar ID as a separate flag
    setFlag(`avatar_${avatarId}`, true);
    setShowAvatarSelect(false);
    onStartGame();
  };

  const handleLoadGame = () => {
    onLoadGame();
  };

  if (showAvatarSelect) {
    return (
      <div className="main-menu avatar-selection">
        <div
          className="menu-background"
          style={{ backgroundImage: `url(${UI.MAIN_MENU_BG})` }}
        >
          <div className="cyber-overlay"></div>
          <div className="spiritual-particles"></div>
        </div>

        <div className="avatar-selection-container">
          <div className="selection-header">
            <h1 className="cyber-title">
              <span className="glitch" data-text="CHOOSE YOUR ESSENCE">
                CHOOSE YOUR ESSENCE
              </span>
            </h1>
            <p className="spiritual-subtitle">
              Every soul carries a unique chakra signature. Select the avatar
              that resonates with your inner energy.
            </p>
          </div>

          <div className="avatar-grid">
            {AVATAR_OPTIONS.map((avatar) => (
              <div
                key={avatar.id}
                className={`avatar-card ${
                  selectedAvatar === avatar.id ? "selected" : ""
                }`}
                onClick={() => setSelectedAvatar(avatar.id)}
              >
                <div className="avatar-image-container">
                  <img
                    src={avatar.image}
                    alt={avatar.name}
                    className="avatar-image"
                  />
                  <div
                    className="chakra-glow"
                    data-chakra={avatar.chakra.toLowerCase()}
                  ></div>
                </div>
                <div className="avatar-info">
                  <h3 className="avatar-name">{avatar.name}</h3>
                  <div className="chakra-tag">{avatar.chakra} Chakra</div>
                  <p className="avatar-description">{avatar.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="selection-controls">
            {selectedAvatar && (
              <button
                className="cyber-button primary"
                onClick={() => handleAvatarSelect(selectedAvatar)}
              >
                <span className="button-text">Begin Journey</span>
                <div className="button-glow"></div>
              </button>
            )}
            <button
              className="cyber-button secondary"
              onClick={() => setShowAvatarSelect(false)}
            >
              <span className="button-text">Back</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-menu">
      <div
        className="menu-background"
        style={{ backgroundImage: `url(${UI.MAIN_MENU_BG})` }}
      >
        <div className="cyber-overlay"></div>
        <div className="spiritual-particles"></div>
      </div>

      <div className="menu-content">
        <div className="title-section">
          <h1 className="game-title">
            <span className="glitch" data-text="CHAKRA HEARTS">
              CHAKRA HEARTS
            </span>
          </h1>
          <div className="subtitle-container">
            <p className="episode-text">EPISODE 1</p>
            <div className="lotus-divider">
              <div className="lotus-symbol">🪷</div>
            </div>
            <p className="tagline">
              Where ancient wisdom meets digital consciousness
            </p>
          </div>
        </div>

        <div className="menu-buttons">
          <button className="cyber-button primary" onClick={handleNewGame}>
            <span className="button-text">New Journey</span>
            <div className="button-glow"></div>
          </button>

          <button className="cyber-button secondary" onClick={handleLoadGame}>
            <span className="button-text">Continue Path</span>
          </button>

          <button className="cyber-button secondary">
            <span className="button-text">Settings</span>
          </button>

          <button className="cyber-button secondary">
            <span className="button-text">Gallery</span>
          </button>
        </div>

        <div className="menu-footer">
          <div className="chakra-symbols">
            <span className="chakra-dot root">●</span>
            <span className="chakra-dot sacral">●</span>
            <span className="chakra-dot solar">●</span>
            <span className="chakra-dot heart">●</span>
            <span className="chakra-dot throat">●</span>
            <span className="chakra-dot third-eye">●</span>
            <span className="chakra-dot crown">●</span>
          </div>
          <p className="version-text">v1.0.0 - Digital Enlightenment Build</p>
        </div>
      </div>
    </div>
  );
};
