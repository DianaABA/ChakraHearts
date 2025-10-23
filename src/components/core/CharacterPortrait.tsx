import React from "react";
import "./CharacterPortrait.css";

interface CharacterPortraitProps {
  character: string;
  portrait: string;
  position?: "left" | "right" | "center";
  isActive?: boolean;
  positionIndex?: number;
  totalCharacters?: number;
}

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({
  character,
  portrait,
  position = "left",
  isActive = true,
  positionIndex = 0,
  totalCharacters = 1,
}) => {
  // Directly use provided image URL. This avoids CORS/fetch issues and is faster.
  const [errorCount, setErrorCount] = React.useState<number>(0);

  const getPositionClass = () => {
    switch (position) {
      case "right":
        return "portrait-right";
      case "center":
        return "portrait-center";
      default:
        return "portrait-left";
    }
  };

  return (
    <div
      className={`character-portrait ${getPositionClass()} ${
        isActive ? "active" : "inactive"
      }`}
      data-character={character}
      data-position-index={positionIndex}
      data-total-characters={totalCharacters}
      style={{
        minHeight: "200px",
        minWidth: "150px",
        backgroundColor: "transparent",
      }}
    >
      <div className="portrait-container">
        <img
          src={errorCount === 0 ? portrait : "/characters/aurora.png"}
          alt={character}
          onError={() => {
            // Fallback to Aurora image once if the provided portrait fails
            if (errorCount === 0) {
              setErrorCount(1);
              console.log(`❌ Portrait failed for ${character}. Falling back to Aurora.`);
            }
          }}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
        <div className="portrait-glow" />
        <div className="portrait-name">{character}</div>
      </div>
    </div>
  );
};
