import React, { useEffect } from "react";
import { useGameStore } from "../../stores/gameStore";
import type { UiNotification } from "../../types";
import "./Notifications.css";

const Toast: React.FC<{ note: UiNotification; onClose: (id: string) => void }> = ({ note, onClose }) => {
  useEffect(() => {
    const t = window.setTimeout(() => onClose(note.id), note.timeout ?? 1800);
    return () => clearTimeout(t);
  }, [note.id, note.timeout, onClose]);

  return (
    <div
      className={`toast ${note.variant ? `toast-${note.variant}` : ""}`}
      role="status"
      aria-live="polite"
    >
      <span className="toast-text">{note.message}</span>
    </div>
  );
};

export const Notifications: React.FC = () => {
  const { notifications, removeNotification } = useGameStore((s) => ({
    notifications: s.notifications,
    removeNotification: s.removeNotification,
  }));

  if (!notifications || notifications.length === 0) return null;

  return (
    <div className="notifications-container" aria-label="Notifications">
      {notifications.map((n) => (
        <Toast key={n.id} note={n} onClose={removeNotification} />)
      )}
    </div>
  );
};

export default Notifications;
