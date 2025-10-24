import type { Scene } from "../../types";
import { BACKGROUNDS } from "../../assets";

const SCENES: Record<string, Scene> = {
  ep2_prologue_clinic_night: {
    id: "ep2_prologue_clinic_night",
    name: "Prologue — The Night She Chose Mercy",
    background: BACKGROUNDS.PRO_CLINIC_NIGHT,
    dialogues: [
      { type: "action", action: { type: "play_bgm", payload: "TENSION_THEME" } },
      { type: "action", action: { type: "show_image", payload: "/characters/ep2/episode2/pro_ep2_clinic_night.png" } },
      { type: "narration", text: "Rain hammered the roof of a forgotten coastal clinic. Camilla worked alone." },
      { type: "action", action: { type: "unlock_art", payload: "pro_ep2_clinic_night" } },
      { type: "action", action: { type: "sfx", payload: "rain_drip_slow" } },
      { type: "action", action: { type: "vfx", payload: "flicker_neon" } },
      { type: "action", action: { type: "show_image", payload: "/characters/ep2/episode2/pro_ep2_mert_wounded.png" } },
      { type: "narration", text: "A man staggered in, clutching his side. Knife wound. Eyes wild." },
      { type: "dialogue", character: "MERT", text: "(hoarse) Don’t… call them. Please." },
      { type: "dialogue", character: "CAMILLA", text: "(steady) You’re losing blood. Sit." },
      { type: "dialogue", character: "MERT", text: "(gritted) They’ll kill me if they find me here." },
      { type: "dialogue", character: "CAMILLA", text: "(calm) Then we both keep quiet." },
      { type: "narration", text: "Gauze, needle, morphine, faith. Breathing slowed; fear loosened." },
      { type: "dialogue", character: "MERT", text: "(weak laugh) Why help me?" },
      { type: "dialogue", character: "CAMILLA", text: "(quiet) Because someone has to." },
      { type: "action", action: { type: "show_image", payload: "/characters/ep2/episode2/pro_ep2_mert_leaving.png" } },
      { type: "narration", text: "At dawn, he was gone. Bandage folded neatly. No note. No goodbye." },
      { type: "action", action: { type: "unlock_art", payload: "pro_ep2_mert_leaving" } },
      { type: "action", action: { type: "pause", payload: 800 } },
      { type: "action", action: { type: "fade_to_black" } },
      { type: "action", action: { type: "sfx", payload: "low_heartbeat" } },
      { type: "narration", text: "Silence. Then breath. Waves calling her back to the present." },
      { type: "action", action: { type: "pause", payload: 1000 } },
      { type: "action", action: { type: "goto_scene", payload: "ep2_shore_awake" } },
    ],
  },

  ep2_shore_awake: {
    id: "ep2_shore_awake",
    name: "Episode 2 — Shore Awakening and Rescue",
    background: BACKGROUNDS.SHORE_AWAKE_WAVES,
    dialogues: [
      { type: "action", action: { type: "play_bgm", payload: "TENSION_THEME" } },
      { type: "action", action: { type: "show_image", payload: BACKGROUNDS.SHORE_AWAKE_WAVES } },
      { type: "narration", text: "Foam curls around broken stone. The world smells of salt and rust." },
      { type: "action", action: { type: "sfx", payload: "waves_low" } },
      { type: "action", action: { type: "vfx", payload: "mist_roll" } },
      { type: "narration", text: "You rise on trembling elbows—David and Elena nearby, coughing seawater." },
      { type: "dialogue", character: "DAVID", text: "(hoarse) Everyone breathing?" },
      { type: "dialogue", character: "ELENA", text: "(half-laughing) Barely. Saltwater therapy, five stars." },
      // Interactive memory choice stub (to be implemented in engine)
      { type: "action", action: { type: "sfx", payload: "wave_glint_soft" } },
      { type: "action", action: { type: "vfx", payload: "water_sparkle" } },
      { type: "narration", text: "A shimmer catches your eye beneath the foam—something small gleaming in the sand." },
      { type: "choice", choices: [
        {
          text: "Pick up the bracelet",
          action: () => {},
          effects: [
            { type: "show_image", payload: "/characters/ep2/episode2/prop_bracelet_water.png" },
            { type: "unlock_art", payload: "bracelet_water" },
            { type: "set_flag", payload: { id: "ep2_found_bracelet", value: true } },
            { type: "add_romance", payload: { character: "Agnivesh", points: 1 } },
            { type: "add_karma", payload: 1 },
          ],
          responseText: "You lift a bronze-red bracelet—its pattern familiar, a lotus woven into metal. Memories ripple—his smile, the smell of rain, your promise to return. You never did.",
        },
        {
          text: "Pick up the earrings",
          action: () => {},
          effects: [
            { type: "show_image", payload: "/characters/ep2/episode2/prop_earrings_water.png" },
            { type: "unlock_art", payload: "earrings_water" },
            { type: "set_flag", payload: { id: "ep2_found_earrings", value: true } },
            { type: "add_romance", payload: { character: "Santi", points: 1 } },
            { type: "add_karma", payload: 1 },
          ],
          responseText: "You retrieve a pair of silver earrings shaped like tiny moons. The laughter you once shared echoes faintly before guilt floods back—the day you left her behind.",
        },
        {
          text: "Leave them buried",
          action: () => {},
          effects: [
            { type: "add_karma", payload: 2 },
            { type: "set_flag", payload: { id: "ep2_left_relics", value: true } },
          ],
          responseText: "You stare at the glitter beneath the surf, then let it vanish under the next wave. Maybe some things are meant to stay lost.",
        },
      ]},
      { type: "narration", text: "A few meters away, Camilla kneels beside you, still steady despite exhaustion." },
      { type: "dialogue", character: "CAMILLA", text: "(checking pulse) Heartbeat strong. That’s something." },
      { type: "dialogue", character: "MC", text: "You... found us?" },
      { type: "dialogue", character: "CAMILLA", text: "(smile) More like the sea delivered you. It has a strange sense of timing." },
      { type: "action", action: { type: "sfx", payload: "distant_child_cry" } },
      { type: "narration", text: "A faint cry pierces the mist." },
      { type: "dialogue", character: "CAMILLA", text: "(sudden alarm) Diego! My son—he’s trapped!" },
      { type: "action", action: { type: "show_image", payload: "/characters/ep2/episode2/mert_rescue_action.png" } },
      { type: "narration", text: "A man leaps through debris, strong and fast despite a limp—his knife flashing only to cut rope and stone." },
      { type: "action", action: { type: "sfx", payload: "crash_rocks" } },
      { type: "action", action: { type: "vfx", payload: "dust_burst" } },
      { type: "dialogue", character: "MERT", text: "(shouting) Hang on, kid! I’ve got you!" },
      { type: "narration", text: "He pulls a small boy from beneath a beam. Both collapse, coughing—alive." },
      { type: "dialogue", character: "CAMILLA", text: "(teary relief) You could’ve died!" },
      { type: "dialogue", character: "MERT", text: "(grinning) But I didn’t. You’re welcome." },
      { type: "dialogue", character: "AURORA", text: "(curious tone) I think I'm sensing something... fear and gratitude mixing together. It's beautiful, how emotions can hold both." },
      { type: "action", action: { type: "unlock_art", payload: "mert_rescue_action", title: "Rescue Under Ruin — Mert Saves Diego" } },
      { type: "action", action: { type: "pause", payload: 800 } },
      { type: "narration", text: "The group gathers as dawn bleeds through fog. Flames crackle to life in driftwood." },
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
