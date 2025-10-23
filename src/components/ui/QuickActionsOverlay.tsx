import React, { useEffect } from "react";
import "./QuickActionsOverlay.css";

export interface QuickAction {
  id: string;
  label: string;
  onClick: () => void;
  active?: boolean;
  variant?: string; // optional style variant to align with HUD button colors
}

interface QuickActionsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  actions: QuickAction[];
  title?: string;
}

const QuickActionsOverlay: React.FC<QuickActionsOverlayProps> = ({
  isOpen,
  onClose,
  actions,
  title = "Quick Actions",
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="qa-overlay" onClick={onClose}>
      <div className="qa-dialog" role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className="qa-header">
          <h3 className="qa-title">⚙️ {title}</h3>
          <button className="qa-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="qa-grid">
          {actions.map((a) => (
            <button
              key={a.id}
              className={`qa-button ${a.variant ?? ""} ${a.active ? "active" : ""}`}
              onClick={() => {
                a.onClick();
                onClose();
              }}
              title={a.label}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActionsOverlay;
