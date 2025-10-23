import type { EpisodeConfig } from "../../types";

const ep1: EpisodeConfig = {
  id: 1,
  title: "Episode 1: Awakening",
  slug: "ep1",
  scenes: [
    { id: "prologue", name: "Prologue - The Memory Before Awakening" },
    { id: "lotus_birth", name: "Scene 0 - Lotus Birth" },
    { id: "temple_awakening", name: "Scene 0.5 - Temple Awakening" },
    { id: "rescue", name: "Scene 1 - Rescue in the Collapse" },
    {
      id: "guardian_encounter",
      name: "Scene 1A - Root Naga Survival + Elena's Root Awakening",
    },
    {
      id: "chocolate_moment",
      name: "Scene 1A - David's Chocolate & Dog Tag Drop",
    },
    {
      id: "safe_perimeter",
      name: "Scene 2 - The Sound Beneath / Elena Connection",
    },
    { id: "david_shadow", name: "Scene 4 - David's Shadow Line + Flashback" },
    { id: "vision", name: "Scene 5 - Vision of Agnivesh & Santi" },
    {
      id: "agnivesh_grief_denial",
      name: "Scene 5.5 - Episode 1: DENIAL - The Teacher's First Loss",
    },
    { id: "shore_opening", name: "Scene 6 - Shore Opening / Stranded Beach" },
    { id: "stinger_sequence", name: "Stinger - Rosetta Tag Found" },
  ],
  summary:
    "Foundations of the journey. Root Chakra awakening, core characters, and initial trauma threads.",
};

export default ep1;
