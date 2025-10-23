import React from "react";
import { useGameStore } from "../../stores/gameStore";
import type { BacklogEntry } from "../../types";
import "./Backlog.css";

export const Backlog: React.FC = () => {
  const { backlog, backlogOpen, setBacklogOpen } = useGameStore();

  if (!backlogOpen) return null;

  const renderEntry = (e: BacklogEntry, idx: number) => (
    <div key={idx} className="backlog-entry">
      {e.character && <div className="backlog-character">{e.character}</div>}
      <div className="backlog-text">{e.text}</div>
    </div>
  );

  return (
    <div className="backlog-overlay" onClick={() => setBacklogOpen(false)}>
      <div className="backlog-panel" onClick={(ev) => ev.stopPropagation()}>
        <div className="backlog-header">
          <h3>📝 Backlog</h3>
          <button className="backlog-close" onClick={() => setBacklogOpen(false)}>
            ×
          </button>
        </div>
        <div className="backlog-list">
          {backlog.length === 0 ? (
            <div className="backlog-empty">No history yet.</div>
          ) : (
            backlog.map(renderEntry)
          )}
        </div>
      </div>
    </div>
  );
};

export default Backlog;
