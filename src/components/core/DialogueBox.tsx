import React, { useEffect, useRef, useState } from "react";
import type { DialogueLine } from "../../types";
import "./DialogueBox.css";

interface DialogueBoxProps {
  line: DialogueLine;
  onNext: () => void;
  onChoice: (choiceIndex: number) => void;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({ line, onNext, onChoice }) => {
  // Remove leading parenthetical stage directions from dialogue text
  const sanitizeDialogueText = (text: string | undefined): string => {
    if (!text) return "";
    // Strip a leading parenthetical like "(softly, ... ) "
    return text.replace(/^\s*\([^)]*\)\s*/u, "");
  };

  // Glitchy typewriter effect
  const enableGlitch = true;
  const GLITCH_CHARS = ["#", "@", "$", "%", "&", "*", "+", "=", "?", "!", "~", "^", "/", "\\", "|", "<", ">", "_", "-", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const [displayed, setDisplayed] = useState("");
  const [glitching, setGlitching] = useState(false);
  const typeIndex = useRef(0);
  const glitchTimeout = useRef<number | null>(null);

  useEffect(() => {

    if (!line || (line.type !== "dialogue" && line.type !== "narration")) {
      setDisplayed("");
      return;
    }
    const text = line.type === "dialogue" ? sanitizeDialogueText(line.text) : line.text || "";
    setDisplayed("");
    typeIndex.current = 0;
    setGlitching(false);

    function typeNext() {
      if (typeIndex.current > text.length) return;
      let base = text.slice(0, typeIndex.current);
      let next = text.slice(typeIndex.current, typeIndex.current + 1);
      if (enableGlitch && next && Math.random() < 0.25) {
        next = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        setGlitching(true);
      } else {
        setGlitching(false);
      }
      setDisplayed(base + next);
      typeIndex.current++;
      if (typeIndex.current <= text.length) {
        glitchTimeout.current = setTimeout(typeNext, 18 + Math.random() * 40);
      }
    }
    typeNext();
    return () => {
      if (glitchTimeout.current) clearTimeout(glitchTimeout.current);
    };
    // Only rerun when line changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [line]);

  if (!line) return null;

  const renderContent = () => {
    switch (line.type) {
      case "dialogue": {
        return (
          <div className="dialogue-content" onClick={onNext}>
            {line.character && (
              <div className="character-name">{line.character}</div>
            )}
            <div className={"dialogue-text" + (glitching ? " glitch" : "")}>{displayed}</div>
          </div>
        );
      }

      case "narration":
        return (
          <div className="narration-content" onClick={onNext}>
            <div className={"narration-text" + (glitching ? " glitch" : "")}>{displayed}</div>
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
