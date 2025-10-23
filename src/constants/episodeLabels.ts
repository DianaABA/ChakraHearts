export const EPISODE_LABELS: Record<number, string> = {
  1: "Root — Denial",
  2: "Sacral — Pain",
  3: "Solar Plexus — Anger",
  // Interlude requested as 3.5; mapped to episode 4 for implementation
  4: "Savasana — Interlude (3.5)",
  5: "Throat — Depression",
  // Interlude requested as 5.5; mapped to episode 6 for implementation
  6: "Trataka — Interlude (5.5)",
  7: "Third Eye — Testing",
  8: "Crown — Acceptance",
  9: "Epilogue — Closure",
};

export const getEpisodeLabel = (id: number | undefined): string => {
  const ep = id ?? 1;
  return EPISODE_LABELS[ep] || `Episode ${ep}`;
};

export const EPISODE_SELECT_OPTIONS: Array<{ value: number; label: string }> = [
  { value: 1, label: "1 — Root • Denial" },
  { value: 2, label: "2 — Sacral • Pain" },
  { value: 3, label: "3 — Solar Plexus • Anger" },
  { value: 4, label: "3.5 — Savasana (Interlude)" },
  { value: 5, label: "5 — Throat • Depression" },
  { value: 6, label: "5.5 — Trataka (Interlude)" },
  { value: 7, label: "6 — Third Eye • Testing" },
  { value: 8, label: "7 — Crown • Acceptance" },
  { value: 9, label: "9 — Epilogue • Closure" },
];
