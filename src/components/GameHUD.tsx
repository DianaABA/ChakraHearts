import React from "react";
import { useGameStore } from "../stores/gameStore";
import "./GameHUD.css";

export const GameHUD: React.FC = () => {
  const { karma, romance } = useGameStore();

  // Get karma color based on value
  const getKarmaColor = (karmaValue: number) => {
    if (karmaValue > 3) return "#4ade80"; // Green for good karma
    if (karmaValue < -3) return "#ef4444"; // Red for bad karma
    return "#fbbf24"; // Yellow for neutral
  };

  // Get romance level description
  const getRomanceLevel = (points: number) => {
    if (points >= 10) return "💖 Devoted";
    if (points >= 7) return "💕 Close";
    if (points >= 4) return "💘 Interested";
    if (points >= 1) return "💗 Noticed";
    return "💙 Neutral";
  };

  return (
    <div className="game-hud">
      {/* Karma Meter */}
      <div className="karma-meter">
        <div className="meter-label">⚖️ Karma</div>
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

      {/* Romance Meters */}
      {Object.keys(romance).length > 0 && (
        <div className="romance-meters">
          <div className="meter-label">💕 Romance</div>
          {Object.entries(romance).map(([character, points]) => (
            <div key={character} className="romance-meter">
              <div className="romance-character">{character}</div>
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
    </div>
  );
};
