import React from "react";
import type { DialogueLine } from "../../types";
import "./DialogueBox.css";

interface DialogueBoxProps {
  line: DialogueLine;
  onNext: () => void;
  onChoice: (choiceIndex: number) => void;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  line,
  onNext,
  onChoice,
}) => {
  if (!line) return null;

  const renderContent = () => {
    switch (line.type) {
      case "dialogue":
        return (
          <div className="dialogue-content" onClick={onNext}>
            {line.character && (
              <div className="character-name">{line.character}</div>
            )}
            <div className="dialogue-text">{line.text}</div>
          </div>
        );

      case "narration":
        return (
          <div className="narration-content" onClick={onNext}>
            <div className="narration-text">{line.text}</div>
          </div>
        );

      case "choice":
        return (
          <div className="choice-content">
            <div className="choice-prompt">Choose your response:</div>
            <div className="choices">
              {line.choices?.map((choice, index) => (
                <button
                  key={index}
                  className="choice-button"
                  onClick={() => onChoice(index)}
                >
                  {choice.text}
                </button>
              ))}
            </div>
          </div>
        );

      case "action":
        return (
          <div className="action-content">
            <div className="action-text">Processing...</div>
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="dialogue-box">{renderContent()}</div>;
};
