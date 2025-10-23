import React, { useMemo, useState } from "react";
import { useGameStore } from "../../stores/gameStore";
import {
  EDUCATIONAL_CONTENT,
  type ChakraType,
  type RomanceCharacter,
  type KarmaType,
  type SpiritualConcept,
} from "../../utils/educationalContent";
import "./Codex.css";

interface CodexProps {
  isOpen: boolean;
  onClose: () => void;
}

type CodexItem = {
  id: string;
  title: string;
  category: string;
  summary?: string;
};

const resolveCodexItem = (id: string): CodexItem | null => {
  // id patterns: edu:chakra:ROOT, edu:romance:ELENA, edu:karma:POSITIVE, concept:grief:DENIAL, etc.
  try {
    const [ns, group, key] = id.split(":");
    if (ns === "edu") {
      if (group === "chakra") {
        const k = key as ChakraType;
        const c = EDUCATIONAL_CONTENT.CHAKRAS[k];
        if (c) return { id, title: c.name, category: "Chakras", summary: c.description };
      } else if (group === "romance") {
        const k = key as RomanceCharacter;
        const r = EDUCATIONAL_CONTENT.ROMANCE.COMPATIBILITY[k];
        if (r) return { id, title: r.character, category: "Romance", summary: r.romanticStyle };
      } else if (group === "karma") {
        const kt = key as KarmaType;
        const kObj = EDUCATIONAL_CONTENT.KARMA.TYPES[kt];
        if (kObj)
          return {
            id,
            title: kObj.type,
            category: "Karma",
            summary: EDUCATIONAL_CONTENT.KARMA.OVERVIEW.title,
          };
      }
    } else if (ns === "concept") {
      const g = group as SpiritualConcept;
      const c = EDUCATIONAL_CONTENT.CONCEPTS[g];
      if (c)
        return { id, title: c.title, category: "Concepts", summary: c.description };
    }
  } catch {
    // ignore
  }
  return { id, title: id, category: "Other" };
};

export const Codex: React.FC<CodexProps> = ({ isOpen, onClose }) => {
  const { codexEntries, badges } = useGameStore();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  // Hooks must not be called conditionally; compute items regardless and hide UI when closed
  const items = useMemo(() => {
    const mapped = (codexEntries || []).map((id) => resolveCodexItem(id)).filter(Boolean) as CodexItem[];
    return mapped.sort((a, b) => a.title.localeCompare(b.title));
  }, [codexEntries]);

  const filtered = items.filter((it) => {
    if (category !== "all" && it.category.toLowerCase() !== category) return false;
    if (query && !(`${it.title} ${it.summary || ""}`.toLowerCase().includes(query.toLowerCase()))) return false;
    return true;
  });

  const categories = ["all", "chakras", "romance", "karma", "concepts"];

  if (!isOpen) return null;

  return (
    <div className="codex-overlay" onClick={onClose}>
      <div className="codex-panel" onClick={(e) => e.stopPropagation()}>
        <div className="codex-header">
          <h2>📖 Codex</h2>
          <button className="codex-close" onClick={onClose}>×</button>
        </div>

        {/* Badges */}
        <div className="codex-badges">
          <div className="badges-header">
            <h3>🏆 Badges</h3>
            <span className="badge-count">{badges?.length || 0}</span>
          </div>
          {(!badges || badges.length === 0) ? (
            <div className="badges-empty">No badges yet. Unlock them through key choices and milestones.</div>
          ) : (
            <div className="badges-grid">
              {badges.map((b) => (
                <div key={b} className="badge-item">{b}</div>
              ))}
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="codex-filters">
          <div className="category-tabs">
            {categories.map((c) => (
              <button
                key={c}
                className={`cat-tab ${category === c ? "active" : ""}`}
                onClick={() => setCategory(c)}
              >
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>
          <input
            className="codex-search"
            placeholder="Search entries..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Entries */}
        <div className="codex-list">
          {filtered.length === 0 ? (
            <div className="codex-empty">No entries match.</div>
          ) : (
            filtered.map((it) => (
              <div key={it.id} className="codex-item">
                <div className="codex-item-title">{it.title}</div>
                <div className="codex-item-meta">{it.category}</div>
                {it.summary && <div className="codex-item-summary">{it.summary}</div>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Codex;
