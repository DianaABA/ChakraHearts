import type { Scene } from "../../types";
import { BACKGROUNDS } from "../../assets";

const SCENES: Record<string, Scene> = {
  ep2_shore_awake: {
    id: "ep2_shore_awake",
    name: "Episode 2 — Shore Awakening",
    background: BACKGROUNDS.SHORE_AWAKE_WAVES,
    dialogues: [
      { type: "action", action: { type: "play_bgm", payload: "AURORA_THEME" } },
      { type: "narration", text: "Waves breathe in slow rhythm. Salt and light. The body remembers water." },
      { type: "action", action: { type: "show_image", payload: BACKGROUNDS.SHORE_GROUP_GATHER } },
      { type: "dialogue", character: "ELENA", text: "Feels… softer here. Like the world is willing to forgive us if we let it." },
      { type: "dialogue", character: "DAVID", text: "Stay alert. Soft places hide sharp edges." },
      { type: "action", action: { type: "goto_scene", payload: "ep2_camilla_clinic" } },
    ],
  },

  ep2_camilla_clinic: {
    id: "ep2_camilla_clinic",
    name: "Episode 2 — Camilla at the Clinic (Night)",
    background: BACKGROUNDS.PRO_CLINIC_NIGHT,
    dialogues: [
      { type: "narration", text: "Neon hum. Disinfectant and grief. Camilla signs a form she doesn’t believe in." },
      { type: "dialogue", character: "AURORA", text: "Emotional amplitude rising. Sacral field detected." },
      { type: "action", action: { type: "goto_scene", payload: "ep2_shore_awake" } },
    ],
  },
};

export const getScene = async (sceneId: string): Promise<Scene> => {
  const scene = SCENES[sceneId] || SCENES.ep2_shore_awake;
  return scene;
};
