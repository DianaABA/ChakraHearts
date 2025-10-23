import React, { useEffect, useState } from "react";
import { storage } from "../../platform/storage";
import { useGameStore } from "../../stores/gameStore";
import { UI } from "../../assets";
import EducationalPanel from "../educational/EducationalPanel";
import Gallery from "../Gallery";
import type { GalleryArtwork } from "../Gallery";
import PlayerSettings from "./PlayerSettings";
import QuickActionsOverlay from "./QuickActionsOverlay";
import Codex from "./Codex";
import "./GameHUD.css";
import { devLog } from "../../utils/logger";

export const GameHUD: React.FC = () => {
  const { karma, romance, currentEpisode } = useGameStore();
  const [showKarmaDialog, setShowKarmaDialog] = useState(false);
  const [showEducationalPanel, setShowEducationalPanel] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showPlayerSettings, setShowPlayerSettings] = useState(false);
  const [showCodex, setShowCodex] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  // Persist HUD collapsed preference across sessions
  const [hudCollapsed, setHudCollapsed] = useState<boolean>(() => {
    const saved = storage.getItem("hudCollapsed");
    try {
      return saved ? JSON.parse(saved) === true : false;
    } catch {
      return false;
    }
  });
  const [educationalSection, setEducationalSection] = useState<
    "chakras" | "romance" | "karma" | "concepts"
  >("chakras");
  const { backlogOpen, setBacklogOpen, uiHidden, toggleUiHidden, autoMode, skipMode, toggleAutoMode, toggleSkipMode } = useGameStore();
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [dockRight, setDockRight] = useState<boolean>(() => {
    const saved = storage.getItem("hudDockRight");
    try {
      return saved ? JSON.parse(saved) === true : false;
    } catch {
      return false;
    }
  });
  const [showDestinyDialog, setShowDestinyDialog] = useState(false);
  
  // Track fullscreen state for icon update
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  // Consistent color palette with muted, blended tones
  const COLORS = {
    // Karma colors - softer, more muted
    goodKarma: "#6b9d6b", // Muted sage green
    badKarma: "#c67878", // Muted rose red
    neutralKarma: "#b5a677", // Muted golden beige

    // Ending colors - harmonized with karma colors
    harmony: "#7ba87b", // Soft forest green
    control: "#b87373", // Soft burgundy red
    neutral: "#a89968", // Soft amber

    // Romance colors - warmer, softer tones
    romance: "#d4a5a5", // Soft dusty rose
    romanceBorder: "#c49999", // Muted rose border

    // UI accents - subtle purples that blend well
    accent: "#9d7cb5", // Soft lavender purple
    accentBorder: "#8a6ba3", // Deeper muted purple

    // Text colors - warm whites and creams
    textPrimary: "#f5f3f0", // Warm white
    textSecondary: "#e8e4df", // Cream
    textMuted: "#d0ccc7", // Light beige
  };

  // Get karma color based on value
  const getKarmaColor = (karmaValue: number) => {
    if (karmaValue > 3) return COLORS.goodKarma;
    if (karmaValue < -3) return COLORS.badKarma;
    return COLORS.neutralKarma;
  };

  // Get karma icon based on value
  const getKarmaIcon = (karmaValue: number) => {
    if (karmaValue > 0) return UI.CHOICE_KARMA_GOOD;
    if (karmaValue < 0) return UI.CHOICE_KARMA_BAD;
    return UI.CHAKRA_UNLOCK_ROOT; // Neutral/balanced karma
  };

  // Get karma description
  const getKarmaDescription = (karmaValue: number) => {
    if (karmaValue >= 8)
      return "🌟 Enlightened - Your actions radiate pure compassion and wisdom";
    if (karmaValue >= 5)
      return "✨ Noble - You consistently choose the path of righteousness";
    if (karmaValue >= 2)
      return "🌱 Good-hearted - Your intentions lean toward kindness";
    if (karmaValue >= -1)
      return "⚖️ Balanced - You walk the middle path between light and shadow";
    if (karmaValue >= -4)
      return "🌪️ Conflicted - Your choices show inner turmoil";
    if (karmaValue >= -7)
      return "⚡ Dark-hearted - You often choose the harsh path";
    return "🔥 Corrupted - Your soul burns with malice and cruelty";
  };

  // Get ending path based on karma
  const getEndingPath = (karmaValue: number) => {
    if (karmaValue >= 3) {
      return {
        name: "Harmony",
        description: "Path of Unity and Balance",
        icon: "🌸",
        color: COLORS.harmony,
        details:
          "You seek to unite all chakras and beings in perfect harmony. This ending focuses on cooperation, healing, and bringing peace to the world.",
      };
    } else if (karmaValue <= -3) {
      return {
        name: "Control",
        description: "Path of Dominance and Power",
        icon: "⚡",
        color: COLORS.control,
        details:
          "You embrace power and control to reshape the world according to your will. This ending focuses on strength, dominance, and imposing order through force.",
      };
    } else {
      return {
        name: "Neutral",
        description: "Path of Individual Choice",
        icon: "⚖️",
        color: COLORS.neutral,
        details:
          "You walk your own path, neither fully light nor dark. This ending focuses on personal freedom, making choices case by case, and finding your own way.",
      };
    }
  };

  // Get romance level description
  const getRomanceLevel = (points: number) => {
    if (points >= 10) return "💖 Devoted";
    if (points >= 7) return "💕 Close";
    if (points >= 4) return "💘 Interested";
    if (points >= 1) return "💗 Noticed";
    return "💙 Neutral";
  };

  // Get romance icon for character
  const getRomanceIcon = (character: string) => {
    const iconMap: { [key: string]: string } = {
      AGNIVESH: UI.ROMANCE_AGNIVESH,
      AURORA: UI.ROMANCE_AURORA,
      DAVID: UI.ROMANCE_DAVID,
      ELENA: UI.ROMANCE_ELENA,
      SANTI: UI.ROMANCE_SANTI,
    };
    return iconMap[character.toUpperCase()] || UI.ROMANCE_ELENA; // Default fallback
  };

  // Sample gallery artworks (using existing game assets)
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
      imageSrc: "/backgrounds/scenes/sc0_lotus_birth_void.png",
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
      imageSrc: "/backgrounds/scenes/sc6_shore_dawn_wide.png",
      category: "scenes",
      unlocked: true,
    },
    {
      id: "sacred_cow",
      title: "Sacred Cow Carving",
      description: "Ancient wall carving of the sacred cow spirit",
      imageSrc: "/backgrounds/scenes/sc2_cow_carving_wall.jpg",
      category: "special",
      unlocked: true,
    },
  ];

  devLog("🎮 GameHUD is rendering");

  // Save preference when it changes
  useEffect(() => {
    storage.setItem("hudCollapsed", JSON.stringify(hudCollapsed));
  }, [hudCollapsed]);

  // Persist dock side preference
  useEffect(() => {
    storage.setItem("hudDockRight", JSON.stringify(dockRight));
  }, [dockRight]);

  // Close karma dialog with Escape for consistency with other menus
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showKarmaDialog) setShowKarmaDialog(false);
        if (showDestinyDialog) setShowDestinyDialog(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showKarmaDialog, showDestinyDialog]);
  
  const HudBody: React.FC = () => (
    <>
      {/* Educational Guide Button */}
      <div className="educational-guide-button">
        <button
          className="guide-button backlog"
          onClick={() => setBacklogOpen(!backlogOpen)}
          title="Backlog (B)"
        >
          📝 Backlog
        </button>
        <button
          className="guide-button fullscreen"
          onClick={() => import("../../platform/screen").then(m=>m.display.toggleFullscreen())}
          title="Fullscreen (F)"
        >
          {isFullscreen ? "🧭 Windowed" : "🖥 Fullscreen"}
        </button>
        <button
          className="guide-button more"
          onClick={() => setShowQuickActions(true)}
          title="More Actions"
        >
          ⋯ More
        </button>
        <button
          className="guide-button dock"
          onClick={() => setDockRight((v) => !v)}
          title="Dock left/right"
        >
          ↔ Dock
        </button>
        <button
          className="guide-button hide-ui"
          onClick={() => toggleUiHidden()}
          title="Hide UI (H)"
        >
          {uiHidden ? "👁 Show UI" : "🙈 Hide UI"}
        </button>
        <button
          className="guide-button settings"
          onClick={() => setShowPlayerSettings(true)}
          title="Player Settings"
        >
          ⚙️ Settings
        </button>
        <button
          className="guide-button codex"
          onClick={() => setShowCodex(true)}
          title="Open Codex"
        >
          📖 Codex
        </button>
        <button
          className={`guide-button auto ${autoMode ? "active" : ""}`}
          onClick={() => toggleAutoMode()}
          title="Auto mode"
        >
          {autoMode ? "⏸ Auto" : "▶ Auto"}
        </button>
        <button
          className={`guide-button skip ${skipMode ? "active" : ""}`}
          onClick={() => toggleSkipMode()}
          title="Skip read lines"
        >
          {skipMode ? "⏹ Skip Read" : "⏭ Skip Read"}
        </button>
        <button
          className="guide-button chakras"
          onClick={() => {
            devLog("🌈 Chakras button clicked");
            setEducationalSection("chakras");
            setShowEducationalPanel(true);
          }}
          title="Learn about Chakras"
        >
          🌈 Chakras
        </button>
        <button
          className="guide-button romance"
          onClick={() => {
            setEducationalSection("romance");
            setShowEducationalPanel(true);
          }}
          title="Learn about Romance"
        >
          💕 Romance
        </button>
        <button
          className="guide-button karma"
          onClick={() => {
            setEducationalSection("karma");
            setShowEducationalPanel(true);
          }}
          title="Learn about Karma"
        >
          ⚖️ Karma
        </button>
        <button
          className="guide-button gallery"
          onClick={() => {
            devLog("🎨 Gallery button clicked");
            setShowGallery(true);
          }}
          title="View Art Gallery"
        >
          🎨 Gallery
        </button>
      </div>

      {/* Karma Meter - Now clickable */}
      <div
        className="karma-meter clickable"
        onClick={() => setShowKarmaDialog(true)}
        title="Click to view karma details"
      >
        <div className="meter-label">
          <img src={getKarmaIcon(karma)} alt="Karma" className="karma-icon" />
          ⚖️ Karma
        </div>
        <div className="meter-bar">
          <div
            className="meter-fill karma-fill"
            style={{
              width: `${Math.min(Math.abs(karma) * 10, 100)}%`,
              backgroundColor: getKarmaColor(karma),
            }}
          />
        </div>
        <div className="meter-value" style={{ color: getKarmaColor(karma) }}>
          {karma > 0 ? `+${karma}` : karma}
        </div>
      </div>

      {/* Ending Path Indicator */}
      <div
        className="ending-indicator clickable"
        style={{
          borderColor: getEndingPath(karma).color,
          boxShadow: `0 0 0 2px ${getEndingPath(karma).color} inset, 0 0 16px ${getEndingPath(karma).color}`,
        }}
        title={`${getEndingPath(karma).name} — ${getEndingPath(karma).description}`}
        onClick={() => setShowDestinyDialog(true)}
      >
        <div className="meter-label">
          {getEndingPath(karma).icon} Destiny Path
        </div>
        <div className="ending-info">
          <div
            className="ending-name"
            style={{ color: getEndingPath(karma).color }}
          >
            {getEndingPath(karma).name}
          </div>
          <div className="ending-description">
            {getEndingPath(karma).description}
          </div>
        </div>
      </div>

      {/* Romance Meters */}
      {Object.keys(romance).length > 0 && (
        <div className="romance-meters">
          <div className="meter-label">💕 Romance</div>
          {Object.entries(romance).map(([character, points]) => (
            <div key={character} className="romance-meter">
              <div className="romance-character-header">
                <img
                  src={getRomanceIcon(character)}
                  alt={`${character} romance`}
                  className="romance-icon"
                />
                <div className="romance-character">{character}</div>
              </div>
              <div className="meter-bar romance-bar">
                <div
                  className="meter-fill romance-fill"
                  style={{
                    width: `${Math.min(points * 8, 100)}%`,
                  }}
                />
              </div>
              <div className="romance-level">{getRomanceLevel(points)}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );

  return (
    <div className={`game-hud ${hudCollapsed ? "collapsed" : ""} ${dockRight ? "dock-right" : ""}`}>
      {/* Episode Indicator */}
      <div className="episode-indicator" title="Current Episode">
        🪷 EP {currentEpisode ?? 1}
      </div>
      {/* HUD Collapse/Expand Toggle */}
      <button
        className={`hud-toggle ${hudCollapsed ? "collapsed" : "expanded"}`}
        onClick={() => setHudCollapsed((v) => !v)}
        title={hudCollapsed ? "Show HUD" : "Hide HUD"}
        aria-label={hudCollapsed ? "Show HUD" : "Hide HUD"}
        type="button"
      >
        {hudCollapsed ? "📊" : "✖"}
      </button>

      {!hudCollapsed && <HudBody />}

      {/* Karma Dialog Overlay */}
      {showKarmaDialog && (
        <div
          className="karma-overlay"
          onClick={() => setShowKarmaDialog(false)}
        >
          <div className="karma-dialog" onClick={(e) => e.stopPropagation()}>
            <div
              className="karma-dialog-bg"
              style={{
                backgroundImage: `url(${UI.DIALOGUE_FRAME})`,
              }}
            >
              <div className="karma-dialog-content">
                <div className="karma-dialog-header">
                  <img
                    src={getKarmaIcon(karma)}
                    alt="Karma"
                    className="karma-dialog-icon"
                  />
                  <h3 className="karma-dialog-title">Karma Status</h3>
                  <button
                    className="karma-dialog-close"
                    onClick={() => setShowKarmaDialog(false)}
                  >
                    ×
                  </button>
                </div>

                <div className="karma-dialog-body">
                  <div className="karma-value-display">
                    <span className="karma-label">Current Karma:</span>
                    <span
                      className="karma-value-large"
                      style={{ color: getKarmaColor(karma) }}
                    >
                      {karma > 0 ? `+${karma}` : karma}
                    </span>
                  </div>

                  <div className="karma-description">
                    {getKarmaDescription(karma)}
                  </div>

                  <div className="ending-path-info">
                    <h4 className="ending-path-title">
                      <span style={{ color: getEndingPath(karma).color }}>
                        {getEndingPath(karma).icon} {getEndingPath(karma).name}{" "}
                        Ending
                      </span>
                    </h4>
                    <p className="ending-path-details">
                      {getEndingPath(karma).details}
                    </p>
                  </div>

                  <div className="karma-explanation">
                    <p>
                      <strong>How Karma Works:</strong>
                    </p>
                    <p>
                      •{" "}
                      <span style={{ color: COLORS.goodKarma }}>
                        Good choices
                      </span>{" "}
                      lead to the <strong>Harmony</strong> ending
                    </p>
                    <p>
                      •{" "}
                      <span style={{ color: COLORS.badKarma }}>
                        Bad choices
                      </span>{" "}
                      lead to the <strong>Control</strong> ending
                    </p>
                    <p>
                      •{" "}
                      <span style={{ color: COLORS.neutralKarma }}>
                        Balanced choices
                      </span>{" "}
                      lead to the <strong>Neutral</strong> ending
                    </p>
                    <p>
                      • Your current path can change based on future choices
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Destiny Details Overlay */}
      {showDestinyDialog && (
        <div
          className="destiny-overlay"
          onClick={() => setShowDestinyDialog(false)}
        >
          <div className="destiny-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="destiny-dialog-bg" style={{ backgroundImage: `url(${UI.DIALOGUE_FRAME})` }}>
              <div className="destiny-dialog-content">
                <div className="destiny-dialog-header">
                  <div className="destiny-dialog-icon" aria-hidden>
                    {getEndingPath(karma).icon}
                  </div>
                  <h3 className="destiny-dialog-title">Destiny Details</h3>
                  <button
                    className="destiny-dialog-close"
                    onClick={() => setShowDestinyDialog(false)}
                    aria-label="Close Destiny Details"
                  >
                    ×
                  </button>
                </div>

                <div className="destiny-dialog-body">
                  <div className="destiny-current">
                    <span className="destiny-label">Current Path:</span>
                    <span
                      className="destiny-value"
                      style={{ color: getEndingPath(karma).color }}
                    >
                      {getEndingPath(karma).icon} {getEndingPath(karma).name}
                    </span>
                    <div className="destiny-sub">{getEndingPath(karma).description}</div>
                  </div>

                  <div className="destiny-explanation">
                    <p>
                      Your destiny shifts with your karma. Make choices to influence the path you walk.
                    </p>
                    <ul className="destiny-thresholds">
                      <li>
                        <strong style={{ color: COLORS.harmony }}>Harmony</strong> (karma ≥ 3): Unity and healing
                      </li>
                      <li>
                        <strong style={{ color: COLORS.neutral }}>Neutral</strong> (-2 ≤ karma ≤ 2): Individual choice
                      </li>
                      <li>
                        <strong style={{ color: COLORS.control }}>Control</strong> (karma ≤ -3): Power and dominance
                      </li>
                    </ul>
                  </div>

                  <div className="destiny-tips">
                    <h4 className="destiny-tips-title">Tips</h4>
                    <ul>
                      <li>Viewing Codex entries may reveal how choices affect destiny.</li>
                      <li>Romance paths can subtly influence your moral arc.</li>
                      <li>You can always rebalance your karma with mindful actions.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Player Settings */}
      <PlayerSettings
        isOpen={showPlayerSettings}
        onClose={() => setShowPlayerSettings(false)}
      />

      {/* Codex Overlay */}
      <Codex isOpen={showCodex} onClose={() => setShowCodex(false)} />

      {/* Educational Panel */}
      <EducationalPanel
        isOpen={showEducationalPanel}
        onClose={() => setShowEducationalPanel(false)}
        section={educationalSection}
      />

      {/* Gallery */}
      <Gallery
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
        artworks={galleryArtworks}
      />

      {/* Quick Actions Overlay */}
      <QuickActionsOverlay
        isOpen={showQuickActions}
        onClose={() => setShowQuickActions(false)}
        title="Quick Actions"
        actions={[
          { id: "backlog", label: "📝 Backlog", variant: "backlog", onClick: () => setBacklogOpen(!backlogOpen) },
          { id: "fullscreen", label: isFullscreen ? "🧭 Windowed" : "🖥 Fullscreen", variant: "fullscreen", onClick: () => import("../../platform/screen").then(m=>m.display.toggleFullscreen()) },
          { id: "more", label: "⋯ More", variant: "more", onClick: () => {} },
          { id: "dock", label: "↔ Dock", variant: "dock", onClick: () => setDockRight((v)=>!v) },
          { id: "hide-ui", label: uiHidden ? "👁 Show UI" : "🙈 Hide UI", variant: "hide-ui", onClick: () => toggleUiHidden() },
          { id: "settings", label: "⚙️ Settings", variant: "settings", onClick: () => setShowPlayerSettings(true) },
          { id: "codex", label: "📖 Codex", variant: "codex", onClick: () => setShowCodex(true) },
          { id: "auto", label: autoMode ? "⏸ Auto" : "▶ Auto", variant: "auto", onClick: () => toggleAutoMode(), active: autoMode },
          { id: "skip", label: skipMode ? "⏹ Skip Read" : "⏭ Skip Read", variant: "skip", onClick: () => toggleSkipMode(), active: skipMode },
          { id: "chakras", label: "🌈 Chakras", variant: "chakras", onClick: () => { setEducationalSection("chakras"); setShowEducationalPanel(true); } },
          { id: "romance", label: "💕 Romance", variant: "romance", onClick: () => { setEducationalSection("romance"); setShowEducationalPanel(true); } },
          { id: "karma", label: "⚖️ Karma", variant: "karma", onClick: () => { setEducationalSection("karma"); setShowEducationalPanel(true); } },
          { id: "gallery", label: "🎨 Gallery", variant: "gallery", onClick: () => setShowGallery(true) },
        ]}
      />
    </div>
  );
};
