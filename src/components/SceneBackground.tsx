import React from "react";
import "./SceneBackground.css";

interface SceneBackgroundProps {
  background?: string;
}

export const SceneBackground: React.FC<SceneBackgroundProps> = ({
  background,
}) => {
  if (!background) return null;

  return (
    <div
      className="scene-background"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
};
