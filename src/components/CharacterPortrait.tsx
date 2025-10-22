import React from "react";

interface CharacterPortraitProps {
  character: string;
  portrait: string;
}

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({
  character,
  portrait,
}) => {
  return (
    <div className="character-portrait" data-character={character}>
      <img src={portrait} alt={character} />
    </div>
  );
};
