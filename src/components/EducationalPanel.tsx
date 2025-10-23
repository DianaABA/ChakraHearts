import React, { useEffect, useRef, useState } from "react";
import { EDUCATIONAL_CONTENT } from "../utils/educationalContent";
import { UI } from "../assets";
import EducationalCard from "./EducationalCard";
import { useGameStore } from "../stores/gameStore";
import type {
  ChakraType,
  RomanceCharacter,
  KarmaType,
} from "../utils/educationalContent";
import "./EducationalPanel.css";

interface EducationalPanelProps {
  isOpen: boolean;
  onClose: () => void;
  section?: "chakras" | "romance" | "karma" | "concepts";
}

const EducationalPanel: React.FC<EducationalPanelProps> = ({
  isOpen,
  onClose,
  section = "chakras",
}) => {
  const [activeSection, setActiveSection] = useState(section);
  const [selectedChakra, setSelectedChakra] = useState<ChakraType>("ROOT");
  const [selectedCharacter, setSelectedCharacter] =
    useState<RomanceCharacter>("ELENA");
  const [selectedKarma, setSelectedKarma] = useState<KarmaType>("POSITIVE");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [readingMode, setReadingMode] = useState<boolean>(false);
  const [showTopFab, setShowTopFab] = useState<boolean>(false);
  const [toast, setToast] = useState<string>("");
  const contentRef = useRef<HTMLDivElement | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(""), 1600);
  };
  const unlock = (id: string, title: string) => {
    try {
      useGameStore.getState().unlockCodexEntry(id);
    } catch {
      // ignore
    }
    showToast(`Unlocked info: ${title}`);
  };

  // Exit fullscreen with Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isFullscreen]);

  // Simple inline SVG icons (cyberpunk spiritual)
  const Icon = {
    Chakra: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <circle cx="12" cy="12" r="4" stroke="#74b9ff" strokeWidth="2" />
        <path d="M12 2L14 6L12 10L10 6L12 2Z" fill="#9b59b6" opacity="0.8"/>
        <path d="M22 12L18 14L14 12L18 10L22 12Z" fill="#e84393" opacity="0.8"/>
        <path d="M12 22L10 18L12 14L14 18L12 22Z" fill="#00cec9" opacity="0.8"/>
        <path d="M2 12L6 10L10 12L6 14L2 12Z" fill="#fdcb6e" opacity="0.8"/>
      </svg>
    ),
    Heart: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#ff6b81" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M12 21s-6-4.35-9-7.5C1 12 1 8 4.5 6.5S10 8 12 10c2-2 5.5-4 7.5-3.5S23 12 21 13.5 12 21 12 21z"/>
      </svg>
    ),
    Scales: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffd166" strokeWidth="2" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M12 3v18M4 7h16"/>
        <path d="M7 7l-3 6h6l-3-6zM20 13h-6l3-6 3 6z" fill="#ffd166" opacity="0.4"/>
      </svg>
    ),
    Spark: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#a29bfe" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z"/>
      </svg>
    ),
    Fullscreen: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>
      </svg>
    ),
    Exit: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M9 4H4v5M15 4h5v5M4 15v5h5M20 15v5h-5"/>
      </svg>
    ),
    Reading: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M3 5h8a4 4 0 014 4v10H7a4 4 0 00-4 4V5z"/>
        <path d="M21 5h-8a4 4 0 00-4 4v10h8a4 4 0 014 4V5z"/>
      </svg>
    ),
  } as const;

  // Track scroll to show/hide FAB
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const handler = () => setShowTopFab(el.scrollTop > 200);
    el.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => el.removeEventListener("scroll", handler);
  }, [contentRef]);

  if (!isOpen) return null;

  const renderChakraSection = () => {
    const chakra = EDUCATIONAL_CONTENT.CHAKRAS[selectedChakra];

    // Map chakra types to educational card images
    const getChakraCardImage = (chakraType: ChakraType) => {
      const cardMap = {
        ROOT: UI.EDU_ROOT_CHAKRA,
        SACRAL: UI.EDU_SACRAL_CHAKRA,
        SOLAR_PLEXUS: UI.EDU_SOLAR_PLEXUS_CHAKRA,
        THROAT: UI.EDU_THROAT_CHAKRA,
        HEART: UI.EDU_ROOT_CHAKRA, // Fallback - you can add heart and third eye cards
        THIRD_EYE: UI.EDU_ROOT_CHAKRA, // Fallback
        CROWN: UI.EDU_CROWN_CHAKRA,
      };
      return cardMap[chakraType] || UI.EDU_ROOT_CHAKRA;
    };

    return (
      <div className="education-content">
        <div className="sticky-subheader">
          {Icon.Chakra}
          <span style={{ marginLeft: 8 }}>
            Chakras — {chakra.name}
          </span>
        </div>
        <div className="chakra-selector">
          {Object.keys(EDUCATIONAL_CONTENT.CHAKRAS).map((chakraKey) => {
            const chakraData =
              EDUCATIONAL_CONTENT.CHAKRAS[chakraKey as ChakraType];
            return (
              <button
                key={chakraKey}
                className={`chakra-button ${
                  selectedChakra === chakraKey ? "active" : ""
                }`}
                style={{ backgroundColor: chakraData.color }}
                onClick={() => {
                  setSelectedChakra(chakraKey as ChakraType);
                  const c = EDUCATIONAL_CONTENT.CHAKRAS[chakraKey as ChakraType];
                  unlock(`edu:chakra:${chakraKey}`, c.name);
                }}
              >
                {chakraData.name.split(" ")[0]}
              </button>
            );
          })}
        </div>

        {/* Visual Educational Card */}
        <EducationalCard
          imageSrc={getChakraCardImage(selectedChakra)}
          title={chakra.name}
          description={`${chakra.element} element • Located at ${chakra.location}`}
          className="chakra-card"
        />

        <div className="chakra-details">
          <div className="chakra-info">
            <p>
              <strong>Description:</strong> {chakra.description}
            </p>
          </div>

          <div className="chakra-properties">
            <div className="balanced">
              <h4>When Balanced:</h4>
              <ul>
                {chakra.properties.balanced.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="imbalanced">
              <h4>When Imbalanced:</h4>
              <ul>
                {chakra.properties.imbalanced.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="game-relevance">
            <h4>In the Game:</h4>
            <p>{chakra.gameRelevance}</p>
          </div>

          <div className="affirmations">
            <h4>Healing Affirmations:</h4>
            <ul>
              {chakra.affirmations.map((affirmation, index) => (
                <li key={index}>"{affirmation}"</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderRomanceSection = () => {
    const character =
      EDUCATIONAL_CONTENT.ROMANCE.COMPATIBILITY[selectedCharacter];

    return (
      <div className="education-content">
        <div className="sticky-subheader">
          {Icon.Heart}
          <span style={{ marginLeft: 8 }}>
            Romance — {selectedCharacter}
          </span>
        </div>
        {/* Visual Educational Card for Romance System */}
        <EducationalCard
          imageSrc={UI.EDU_ROMANCE_EXPLANATION}
          title="Sacred Romance System"
          description="Understanding spiritual compatibility and energetic resonance in relationships"
          className="romance-card"
        />

        <div className="romance-overview">
          <h3>{EDUCATIONAL_CONTENT.ROMANCE.OVERVIEW.title}</h3>
          <p>{EDUCATIONAL_CONTENT.ROMANCE.OVERVIEW.description}</p>
          <div className="romance-principles">
            <h4>Sacred Romance Principles:</h4>
            <ul>
              {EDUCATIONAL_CONTENT.ROMANCE.OVERVIEW.principles.map(
                (principle, index) => (
                  <li key={index}>{principle}</li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="character-selector">
          {Object.keys(EDUCATIONAL_CONTENT.ROMANCE.COMPATIBILITY).map(
            (charKey) => (
              <button
                key={charKey}
                className={`character-button ${
                  selectedCharacter === charKey ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedCharacter(charKey as RomanceCharacter);
                  const c = EDUCATIONAL_CONTENT.ROMANCE.COMPATIBILITY[
                    charKey as RomanceCharacter
                  ];
                  unlock(`edu:romance:${charKey}`, c.character);
                }}
              >
                {charKey}
              </button>
            )
          )}
        </div>

        <div className="character-details">
          <h3>
            {character.character} - {character.archetype}
          </h3>
          <p>
            <strong>Chakra Focus:</strong> {character.chakraFocus}
          </p>
          <p>
            <strong>Romance Style:</strong> {character.romanticStyle}
          </p>

          <div className="compatibility">
            <div className="high-compatibility">
              <h4>High Compatibility With:</h4>
              <ul>
                {character.compatibility.highWith.map((trait, index) => (
                  <li key={index}>{trait}</li>
                ))}
              </ul>
            </div>

            <div className="challenges">
              <h4>Challenges With:</h4>
              <ul>
                {character.compatibility.challengesWith.map(
                  (challenge, index) => (
                    <li key={index}>{challenge}</li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="best-choices">
            <h4>Best Romantic Choices:</h4>
            <ul>
              {character.bestChoices.map((choice, index) => (
                <li key={index}>{choice}</li>
              ))}
            </ul>
          </div>

          <div className="growth-opportunity">
            <h4>Growth Opportunity:</h4>
            <p>{character.compatibility.growthOpportunity}</p>
          </div>
        </div>

        <div className="development-stages">
          <h3>Romance Development Stages</h3>
          {Object.entries(EDUCATIONAL_CONTENT.ROMANCE.DEVELOPMENT_STAGES).map(
            ([key, stage]) => (
              <div key={key} className="stage">
                <h4>{stage.stage}</h4>
                <p>{stage.description}</p>
                <p>
                  <strong>Chakras:</strong> {stage.chakrasInvolved.join(", ")}
                </p>
                <p>
                  <strong>Focus:</strong> {stage.choices}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    );
  };

  const renderKarmaSection = () => {
    const karma = EDUCATIONAL_CONTENT.KARMA.TYPES[selectedKarma];

    return (
      <div className="education-content">
        <div className="sticky-subheader">
          {Icon.Scales}
          <span style={{ marginLeft: 8 }}>
            Karma — {karma.type}
          </span>
        </div>
        {/* Visual Educational Card for Karma System */}
        <EducationalCard
          imageSrc={UI.EDU_KARMA_EXPLANATION}
          title="Karmic Choice System"
          description="Understanding how every choice creates ripples that shape your spiritual journey"
          className="karma-card"
        />

        <div className="karma-overview">
          <h3>{EDUCATIONAL_CONTENT.KARMA.OVERVIEW.title}</h3>
          <p>{EDUCATIONAL_CONTENT.KARMA.OVERVIEW.description}</p>
          <div className="karma-principles">
            <h4>Karmic Principles:</h4>
            <ul>
              {EDUCATIONAL_CONTENT.KARMA.OVERVIEW.principles.map(
                (principle, index) => (
                  <li key={index}>{principle}</li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="karma-selector">
          {Object.keys(EDUCATIONAL_CONTENT.KARMA.TYPES).map((karmaKey) => {
            const karmaData =
              EDUCATIONAL_CONTENT.KARMA.TYPES[karmaKey as KarmaType];
            return (
              <button
                key={karmaKey}
                className={`karma-button ${
                  selectedKarma === karmaKey ? "active" : ""
                }`}
                style={{ backgroundColor: karmaData.color }}
                onClick={() => {
                  setSelectedKarma(karmaKey as KarmaType);
                  const k = EDUCATIONAL_CONTENT.KARMA.TYPES[
                    karmaKey as KarmaType
                  ];
                  unlock(`edu:karma:${karmaKey}`, k.type);
                }}
              >
                {karmaData.type}
              </button>
            );
          })}
        </div>

        <div className="karma-details">
          <h3 style={{ color: karma.color }}>{karma.type}</h3>

          <div className="karma-effects">
            <h4>Effects:</h4>
            <ul>
              {karma.effects.map((effect, index) => (
                <li key={index}>{effect}</li>
              ))}
            </ul>
          </div>

          <div className="karma-examples">
            <h4>Examples:</h4>
            <ul>
              {karma.examples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          </div>

          {"redemption" in karma && (
            <div className="karma-redemption">
              <h4>Redemption:</h4>
              <p>{karma.redemption}</p>
            </div>
          )}
        </div>

        <div className="karma-mechanics">
          <h3>How Karma Works</h3>
          {Object.entries(EDUCATIONAL_CONTENT.KARMA.MECHANICS).map(
            ([key, description]) => (
              <div key={key} className="mechanic">
                <h4>{key.charAt(0) + key.slice(1).toLowerCase()}:</h4>
                <p>{description}</p>
              </div>
            )
          )}
        </div>
      </div>
    );
  };

  const renderConceptsSection = () => (
    <div className="education-content">
      <div className="sticky-subheader">
        {Icon.Spark}
        <span style={{ marginLeft: 8 }}>
          Concepts
        </span>
      </div>
      <h3>Spiritual Concepts</h3>
      {Object.entries(EDUCATIONAL_CONTENT.CONCEPTS).map(([key, concept]) => (
        <div key={key} className="concept">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <h4 style={{ margin: 0 }}>{concept.title}</h4>
            <button
              className="guide-button"
              onClick={() => unlock(`concept:${key}`, concept.title)}
              title="Save to Codex"
            >
              📖 Save to Codex
            </button>
          </div>
          <p>{concept.description}</p>
          {"stages" in concept && (
            <div className="concept-list">
              <h5>Stages:</h5>
              <ul>
                {concept.stages.map((stage, index) => (
                  <li key={index}>{stage}</li>
                ))}
              </ul>
            </div>
          )}
          {"properties" in concept && (
            <div className="concept-list">
              <h5>Properties:</h5>
              <ul>
                {concept.properties.map((property, index) => (
                  <li key={index}>{property}</li>
                ))}
              </ul>
            </div>
          )}
          {"characteristics" in concept && (
            <div className="concept-list">
              <h5>Characteristics:</h5>
              <ul>
                {concept.characteristics.map((char, index) => (
                  <li key={index}>{char}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="educational-panel-overlay">
      <div className={`educational-panel ${isFullscreen ? "fullscreen" : ""} ${readingMode ? "reading" : ""}`}>
        <div className="panel-header">
          <h2>
            {Icon.Spark} <span style={{ marginLeft: 8 }}>Spiritual Guide</span>
          </h2>
          <div className="header-actions">
            <button
              className="icon-button"
              onClick={() => setReadingMode((v) => !v)}
              title={readingMode ? "Exit Reading Mode" : "Reading Mode"}
              aria-label={readingMode ? "Exit Reading Mode" : "Reading Mode"}
              type="button"
            >
              {Icon.Reading}
            </button>
            <button
              className="icon-button"
              onClick={() => setIsFullscreen((v) => !v)}
              title={isFullscreen ? "Exit Fullscreen (Esc)" : "Enter Fullscreen"}
              aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              type="button"
            >
              {isFullscreen ? Icon.Exit : Icon.Fullscreen}
            </button>
            <button className="close-button" onClick={onClose} type="button">
              ×
            </button>
          </div>
        </div>
        {toast && <div className="edu-toast">{toast}</div>}

        <div className="section-tabs">
          <button
            className={activeSection === "chakras" ? "active" : ""}
            onClick={() => setActiveSection("chakras")}
          >
            {Icon.Chakra} <span style={{ marginLeft: 6 }}>Chakras</span>
          </button>
          <button
            className={activeSection === "romance" ? "active" : ""}
            onClick={() => setActiveSection("romance")}
          >
            {Icon.Heart} <span style={{ marginLeft: 6 }}>Romance</span>
          </button>
          <button
            className={activeSection === "karma" ? "active" : ""}
            onClick={() => setActiveSection("karma")}
          >
            {Icon.Scales} <span style={{ marginLeft: 6 }}>Karma</span>
          </button>
          <button
            className={activeSection === "concepts" ? "active" : ""}
            onClick={() => setActiveSection("concepts")}
          >
            {Icon.Spark} <span style={{ marginLeft: 6 }}>Concepts</span>
          </button>
        </div>

        <div className="panel-content" ref={contentRef}>
          {activeSection === "chakras" && renderChakraSection()}
          {activeSection === "romance" && renderRomanceSection()}
          {activeSection === "karma" && renderKarmaSection()}
          {activeSection === "concepts" && renderConceptsSection()}
        </div>

        <button
          type="button"
          className={`scroll-top-fab ${showTopFab ? "visible" : ""}`}
          title="Scroll to top"
          aria-label="Scroll to top"
          onClick={() => {
            const el = contentRef.current;
            if (el) el.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          ↑
        </button>
      </div>
    </div>
  );
};

export default EducationalPanel;
