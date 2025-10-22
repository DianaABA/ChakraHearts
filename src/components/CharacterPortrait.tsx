import React from "react";
import "./CharacterPortrait.css";

interface CharacterPortraitProps {
  character: string;
  portrait: string;
  position?: "left" | "right" | "center";
  isActive?: boolean;
}

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({
  character,
  portrait,
  position = "left",
  isActive = true,
}) => {
  const [imageSrc, setImageSrc] = React.useState<string>("");

  // Load image via fetch and convert to blob URL
  React.useEffect(() => {
    const loadImage = async () => {
      try {
        setImageSrc("");
        const response = await fetch(portrait);
        if (response.ok) {
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          setImageSrc(blobUrl);
        }
      } catch (error) {
        console.log(`❌ Error loading image for ${character}:`, error);
      }
    };

    loadImage();
  }, [portrait, character]);

  // Cleanup blob URL when imageSrc changes or on unmount
  React.useEffect(() => {
    return () => {
      if (imageSrc && imageSrc.startsWith("blob:")) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc]);

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
      style={{
        minHeight: "200px",
        minWidth: "150px",
        backgroundColor: "transparent",
      }}
    >
      <div className="portrait-container">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={character}
            onLoad={() => {
              // Image loaded successfully
            }}
            onError={(e) => {
              console.log(`❌ Display failed for ${character}:`, e);
            }}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        ) : null}
        <div className="portrait-glow" />
        <div className="portrait-name">{character}</div>
      </div>
    </div>
  );
};
