import React, { useState, useEffect, useCallback, useRef } from "react";
import { useGameStore } from "../../stores/gameStore";
import { AVATARS, UI, AUDIO } from "../../assets";
import { PaymentOptions } from "../PaymentOptions";
import PlayerSettings from "./PlayerSettings";
import Gallery from "../Gallery";
import type { GalleryArtwork } from "../Gallery";
import "./MainMenu.css";

export interface AvatarOption {
  id: string;
  name: string;
  description: string;
  image: string;
  chakra: string;
}

interface PaymentOption {
  id: string;
  character: string;
  avatar: string;
  title: string;
  description: string;
  price: string;
  message: string;
  className: string;
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
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showPlayerSettings, setShowPlayerSettings] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [focusedButtonIndex, setFocusedButtonIndex] = useState(0);
  const {
    setSelectedAvatar: setGameStoreAvatar,
    currentEpisode,
    setCurrentEpisode,
  } = useGameStore();

  // Gallery artworks for the main menu
  const galleryArtworks: GalleryArtwork[] = [
    {
      id: "elena_awakening",
      title: "Elena's Root Awakening",
      description: "The moment Elena connects with her Root Chakra",
      imageSrc: "/backgrounds/elena_chakra_awakening_new.png",
      category: "characters",
      unlocked: true,
    },
    {
      id: "temple_burning",
      title: "Temple Destruction",
      description: "The ancient temple burning in spiritual fire",
      imageSrc: "/backgrounds/pro_ep1_temple_burning_destruction.png",
      category: "scenes",
      unlocked: true,
    },
    {
      id: "lotus_birth",
      title: "Lotus Birth",
      description: "Aurora's consciousness emerging from the void",
      imageSrc: "/backgrounds/sc0_lotus_birth_void.png",
      category: "concepts",
      unlocked: true,
    },
    {
      id: "naga_fight",
      title: "Naga Battle",
      description: "Epic confrontation with the shadow serpent",
      imageSrc: "/backgrounds/sc1a_naga_fight_epic.png",
      category: "scenes",
      unlocked: true,
    },
    {
      id: "shore_dawn",
      title: "Dawn at the Shore",
      description: "The peaceful ending shore where healing begins",
      imageSrc: "/backgrounds/sc6_shore_dawn_wide.png",
      category: "scenes",
      unlocked: true,
    },
    {
      id: "sacred_cow",
      title: "Sacred Cow Carving",
      description: "Ancient wall carving of the sacred cow spirit",
      imageSrc: "/backgrounds/sc2_cow_carving_wall.jpg",
      category: "special",
      unlocked: true,
    },
  ];

  // Audio reference for menu music
  const menuAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioStartedRef = useRef<boolean>(false);
  const avatarGridRef = useRef<HTMLDivElement | null>(null);

  // Start background music when component mounts
  useEffect(() => {
    // Don't start music if it's already been started
    if (audioStartedRef.current) {
      return;
    }

    const audio = new Audio(AUDIO.BGM.MENU_THEME);
    audio.loop = true;
    audio.volume = 0.3; // Set to 30% volume for ambient background
    menuAudioRef.current = audio;
    audioStartedRef.current = true;

    const playAudio = async () => {
      try {
        await audio.play();
        console.log("🎵 Menu music started successfully");
  } catch {
        console.log("Audio autoplay prevented, will start on user interaction");

        // Single event listener that removes itself after first use
        const handleFirstInteraction = async () => {
          try {
            if (menuAudioRef.current && menuAudioRef.current.paused) {
              await menuAudioRef.current.play();
              console.log("🎵 Menu music started on user interaction");
            }
          } catch (playError) {
            console.log("Failed to start audio on interaction:", playError);
          }
          // Remove listeners after first use (they should auto-remove with { once: true })
        };

        // Use { once: true } to ensure listeners are automatically removed
        document.addEventListener("click", handleFirstInteraction, {
          once: true,
        });
        document.addEventListener("keydown", handleFirstInteraction, {
          once: true,
        });
        // Also handle touch/pointer for mobile devices
        document.addEventListener("pointerdown", handleFirstInteraction, {
          once: true,
        });
      }
    };

    playAudio();

    // Cleanup function to stop audio when component unmounts
    return () => {
      if (menuAudioRef.current) {
        console.log("🛑 Cleaning up menu music");
        menuAudioRef.current.pause();
        menuAudioRef.current.currentTime = 0;
        menuAudioRef.current = null;
      }
      audioStartedRef.current = false;
    };
  }, []); // Keep empty dependency array but add check inside

  const menuButtons = [
    { text: "New Journey", action: () => setShowPaymentOptions(true) },
    { text: "Continue Path", action: onLoadGame },
    { text: "Settings", action: () => setShowPlayerSettings(true) },
    { text: "Gallery", action: () => setShowGallery(true) },
  ];

  const avatarButtons =
    showAvatarSelect && selectedAvatar
      ? [
          {
            text: "Begin Journey",
            action: () => handleAvatarSelect(selectedAvatar),
          },
          { text: "Back", action: () => setShowAvatarSelect(false) },
        ]
      : showAvatarSelect
      ? [{ text: "Back", action: () => setShowAvatarSelect(false) }]
      : [];

  const currentButtons = showAvatarSelect ? avatarButtons : menuButtons;

  const handlePaymentSelect = (paymentOption: PaymentOption) => {
    // Store payment choice in game store if needed
    console.log("💰 Payment option selected:", paymentOption);
    setShowPaymentOptions(false);
    setShowAvatarSelect(true);
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // In avatar selection, only handle keyboard events for the control buttons
      // Allow normal scrolling with arrow keys in the avatar grid
      if (showAvatarSelect) {
        if (event.key === "Escape") {
          event.preventDefault();
          setShowAvatarSelect(false);
        }
        // Don't prevent default for arrow keys in avatar selection - allow scrolling
        return;
      }

      // Normal menu navigation (when not in avatar selection)
      if (event.key === "Enter") {
        event.preventDefault();
        if (currentButtons[focusedButtonIndex]) {
          currentButtons[focusedButtonIndex].action();
        }
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setFocusedButtonIndex((prev) => (prev + 1) % currentButtons.length);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setFocusedButtonIndex(
          (prev) => (prev - 1 + currentButtons.length) % currentButtons.length
        );
      }
    },
    [currentButtons, focusedButtonIndex, showAvatarSelect]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setFocusedButtonIndex(0);
  }, [showAvatarSelect]);

  // Ensure avatar grid starts at top when opening selection
  useEffect(() => {
    if (showAvatarSelect && avatarGridRef.current) {
      avatarGridRef.current.scrollTop = 0;
    }
  }, [showAvatarSelect]);

  const handleAvatarSelect = (avatarId: string) => {
    console.log("🎮 Avatar selected, stopping menu music");

    // Stop menu music immediately and ensure it's fully stopped
    if (menuAudioRef.current) {
      menuAudioRef.current.pause();
      menuAudioRef.current.currentTime = 0;
      // Force cleanup
      menuAudioRef.current = null;
      console.log("🛑 Menu music forcefully stopped");
    }

    // Add a small delay to ensure music is fully stopped before game starts
    setTimeout(() => {
      // Set local UI state
      setSelectedAvatar(avatarId);
      // Use game store method to save avatar selection
      setGameStoreAvatar(avatarId);
      setShowAvatarSelect(false);
      onStartGame();
    }, 100); // 100ms delay to ensure audio cleanup
  };

  const handleEpisodeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 && value <= 9) {
      setCurrentEpisode(value as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9);
    }
  };

  // Show payment options first
  if (showPaymentOptions) {
    return (
      <>
        <div className="main-menu">
          <div
            className="menu-background"
            style={{ backgroundImage: `url(${UI.MAIN_MENU_BG})` }}
          >
            <div className="cyber-overlay"></div>
            <div className="spiritual-particles"></div>
          </div>
        </div>
        <PaymentOptions
          onSelectPayment={handlePaymentSelect}
          onClose={() => setShowPaymentOptions(false)}
        />
      </>
    );
  }

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
            <p className="keyboard-hint">
              Use Mouse/Touch to Select Avatar • Scroll or Arrow Keys to Browse • Escape to Go Back
            </p>
          </div>

          <div className="avatar-grid-wrapper" ref={avatarGridRef}>
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
          </div>

          <div className="selection-controls">
            {avatarButtons.map((button, index) => (
              <button
                key={button.text}
                className={`cyber-button ${
                  button.text === "Begin Journey" ? "primary" : "secondary"
                } ${focusedButtonIndex === index ? "focused" : ""}`}
                onClick={button.action}
              >
                <span className="button-text">{button.text}</span>
                {button.text === "Begin Journey" && (
                  <div className="button-glow"></div>
                )}
              </button>
            ))}
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
            <p className="episode-text">EPISODE {currentEpisode ?? 1}</p>
            <div className="lotus-divider">
              <div className="lotus-symbol">🪷</div>
            </div>
            <p className="tagline">
              Where ancient wisdom meets digital consciousness
            </p>
              {/* Quick Episode Picker (lightweight) */}
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
                <label htmlFor="episodeSelect" style={{ fontSize: 12, opacity: 0.85 }}>
                  Episode:
                </label>
                <select
                  id="episodeSelect"
                  value={currentEpisode ?? 1}
                  onChange={handleEpisodeChange}
                  style={{
                    background: "rgba(0,0,0,0.5)",
                    color: "#e8e4df",
                    border: "1px solid rgba(255,255,255,0.35)",
                    borderRadius: 6,
                    padding: "4px 8px",
                  }}
                  aria-label="Select Episode"
                >
                  {Array.from({ length: 9 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>{`Episode ${i + 1}`}</option>
                  ))}
                </select>
              </div>
          </div>
        </div>

        <div className="menu-buttons">
          {menuButtons.map((button, index) => (
            <button
              key={button.text}
              className={`cyber-button ${
                index === 0 ? "primary" : "secondary"
              } ${focusedButtonIndex === index ? "focused" : ""}`}
              onClick={button.action}
            >
              <span className="button-text">{button.text}</span>
              {index === 0 && <div className="button-glow"></div>}
            </button>
          ))}
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
          <p className="keyboard-hint">
            Use ↑↓ Arrow Keys & Enter • Scroll for More
          </p>
          <p className="version-text">v1.0.0 - Digital Enlightenment Build</p>
        </div>
      </div>

      {/* Player Settings Modal */}
      <PlayerSettings
        isOpen={showPlayerSettings}
        onClose={() => setShowPlayerSettings(false)}
      />

      {/* Gallery Modal */}
      <Gallery 
        isOpen={showGallery} 
        onClose={() => setShowGallery(false)} 
        artworks={galleryArtworks}
      />
    </div>
  );
};
