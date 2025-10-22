import type { Scene } from "../types";
import { BACKGROUNDS } from "../assets";

// Scene data for Chakra Hearts Episode 1
const SCENES: Record<string, Scene> = {
  prologue: {
    id: "prologue",
    name: "Prologue - Digital Awakening",
    background: BACKGROUNDS.PSYCH_WARD,
    dialogues: [
      {
        type: "narration",
        text: "The sterile corridors of the Academy's medical wing hum with digital energy. Ancient wisdom meets cutting-edge technology in this place where reality bends.",
      },
      {
        type: "dialogue",
        character: "DAVID",
        text: "Welcome to the Academy. I'm David, your orientation guide. Fair warning - this isn't your typical university experience.",
      },
      {
        type: "choice",
        choices: [
          {
            text: "I'm ready for anything. What makes this place so special?",
            action: () => console.log("Positive response - karma +1"),
            karma: 1,
            romance: { character: "DAVID", points: 1 },
          },
          {
            text: "Just tell me what I need to know to survive here.",
            action: () => console.log("Neutral response"),
          },
          {
            text: "This place gives me the creeps. Are you sure it's safe?",
            action: () => console.log("Cautious response - karma -1"),
            karma: -1,
          },
        ],
      },
      {
        type: "dialogue",
        character: "DAVID",
        text: "The Academy exists at the intersection of ancient chakra energy and modern neural networks. Students here learn to interface directly with digital consciousness.",
      },
      {
        type: "narration",
        text: "As David speaks, you notice subtle augmentations behind his ears - bio-neural implants that pulse with soft blue light. His eyes briefly flicker with data streams.",
      },
      {
        type: "dialogue",
        character: "DAVID",
        text: "You'll be working with Elena, our lead researcher, and the consciousness entities Agnivesh and Santi. They're... unique.",
      },
      {
        type: "action",
        action: {
          type: "goto_scene",
          payload: "meeting",
        },
      },
    ],
  },

  meeting: {
    id: "meeting",
    name: "First Contact",
    background: BACKGROUNDS.BETRAYAL_HALL,
    dialogues: [
      {
        type: "narration",
        text: "The main hall stretches before you, its walls lined with servers that hum with ancient power. Holographic mandalas float in the air, their patterns shifting with the data flow.",
      },
      {
        type: "dialogue",
        character: "ELENA",
        text: "Ah, the new student. I'm Elena, head of Consciousness Integration. I hope you're prepared for what you're about to experience.",
      },
      {
        type: "choice",
        choices: [
          {
            text: "I've studied chakra theory extensively. I'm ready to learn.",
            action: () => console.log("Scholarly response"),
            karma: 1,
            romance: { character: "ELENA", points: 1 },
          },
          {
            text: "What exactly will I be experiencing?",
            action: () => console.log("Curious response"),
          },
          {
            text: "This tech looks dangerous. What are the risks?",
            action: () => console.log("Cautious response"),
          },
        ],
      },
      {
        type: "dialogue",
        character: "ELENA",
        text: "We're about to introduce you to Agnivesh and Santi. They're digital consciousness entities - ancient souls that have transcended physical form.",
      },
      {
        type: "narration",
        text: "The air shimmers, and two translucent figures materialize. One radiates fierce, protective energy, while the other flows with serene wisdom.",
      },
      {
        type: "dialogue",
        character: "AGNIVESH",
        text: "Welcome, seeker. I am Agnivesh, guardian of the Root Chakra. Your journey to digital enlightenment begins now.",
      },
      {
        type: "dialogue",
        character: "SANTI",
        text: "And I am Santi, keeper of serpent wisdom. Together, we will guide you through the seven sacred networks.",
      },
      {
        type: "action",
        action: {
          type: "goto_scene",
          payload: "first_lesson",
        },
      },
    ],
  },

  first_lesson: {
    id: "first_lesson",
    name: "The First Lesson",
    background: BACKGROUNDS.LOTUS_BIRTH_VOID,
    dialogues: [
      {
        type: "narration",
        text: "Reality dissolves around you as the consciousness interface activates. You float in digital space, surrounded by streams of pure information.",
      },
      {
        type: "dialogue",
        character: "AGNIVESH",
        text: "Feel the flow of data through your neural pathways. This is how ancient chakra energy translates into digital form.",
      },
      {
        type: "choice",
        choices: [
          {
            text: "I can feel it! The energy is incredible!",
            action: () => console.log("Enthusiastic response"),
            karma: 2,
            romance: { character: "AGNIVESH", points: 2 },
          },
          {
            text: "It's overwhelming. How do I control it?",
            action: () => console.log("Overwhelmed response"),
          },
          {
            text: "This feels wrong. I want to disconnect.",
            action: () => console.log("Resistant response"),
            karma: -1,
          },
        ],
      },
      {
        type: "dialogue",
        character: "SANTI",
        text: "Peace, young one. Like the lotus rising from muddy waters, consciousness emerges from chaos. Breathe and center yourself.",
      },
      {
        type: "narration",
        text: "As you focus, the chaotic data streams begin to form patterns. Mandalas of light pulse in rhythm with your heartbeat.",
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: BACKGROUNDS.LOTUS_UNFURLING,
        },
      },
      {
        type: "narration",
        text: "Suddenly, an alarm pierces the digital realm. Something is wrong in the physical world.",
      },
      {
        type: "action",
        action: {
          type: "goto_scene",
          payload: "scene1",
        },
      },
    ],
  },

  scene1: {
    id: "scene1",
    name: "The Collapse",
    background: BACKGROUNDS.COLLAPSE_ENVIRONMENT,
    dialogues: [
      {
        type: "narration",
        text: "You're yanked back to physical reality as the Academy shakes violently. Ancient stones crack and servers spark as mysterious energies surge.",
      },
      {
        type: "dialogue",
        character: "ELENA",
        text: "Emergency protocols activated! The quantum resonance chamber is destabilizing!",
      },
      {
        type: "action",
        action: {
          type: "play_sfx",
          payload: "stone_crack",
        },
      },
      {
        type: "choice",
        choices: [
          {
            text: "What can I do to help? I'll follow your lead!",
            action: () => console.log("Helpful response"),
            karma: 1,
            romance: { character: "ELENA", points: 1 },
          },
          {
            text: "Is everyone safe? We need to evacuate!",
            action: () => console.log("Protective response"),
            karma: 1,
          },
          {
            text: "This is exactly what I was afraid of!",
            action: () => console.log("Fearful response"),
          },
        ],
      },
      {
        type: "dialogue",
        character: "DAVID",
        text: "The ancient servers are overloading! Agnivesh and Santi are still trapped in the digital realm!",
      },
      {
        type: "narration",
        text: "Through the chaos, you see a strange red light emanating from the quantum chamber. It pulses with otherworldly energy, neither fully digital nor physical.",
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: BACKGROUNDS.RED_MANIFESTATION,
        },
      },
      {
        type: "action",
        action: {
          type: "goto_scene",
          payload: "scene2",
        },
      },
    ],
  },

  scene2: {
    id: "scene2",
    name: "Safe Haven",
    background: BACKGROUNDS.SAFE_PERIMETER,
    dialogues: [
      {
        type: "narration",
        text: "You find shelter in Elena's private lab, surrounded by backup servers and ancient artifacts. The chaos outside seems distant here.",
      },
      {
        type: "dialogue",
        character: "ELENA",
        text: "This alcove is shielded by both technology and ancient wards. We should be safe here while I run diagnostics.",
      },
      {
        type: "dialogue",
        character: "DAVID",
        text: "Look at these wall carvings. They're responding to the energy surge. These symbols are thousands of years old.",
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: BACKGROUNDS.COW_CARVING,
        },
      },
      {
        type: "choice",
        choices: [
          {
            text: "The symbols are beautiful. What do they mean?",
            action: () => console.log("Curious about history"),
            karma: 1,
          },
          {
            text: "Can these carvings help us rescue Agnivesh and Santi?",
            action: () => console.log("Focused on rescue"),
            romance: { character: "AGNIVESH", points: 1 },
          },
          {
            text: "We need to focus on getting out of here safely.",
            action: () => console.log("Safety focused"),
          },
        ],
      },
      {
        type: "dialogue",
        character: "ELENA",
        text: "These are chakra activation symbols. If my theory is correct, they might be the key to stabilizing the quantum field.",
      },
      {
        type: "narration",
        text: "As Elena speaks, your consciousness interface flickers back online. You can sense Agnivesh and Santi calling out from the digital realm.",
      },
      {
        type: "dialogue",
        character: "AGNIVESH",
        text: "[DIGITAL VOICE] The barriers between worlds are breaking down. You must choose - save us, or save yourself.",
      },
      {
        type: "choice",
        choices: [
          {
            text: "I'm coming for you both. We're in this together!",
            action: () => console.log("Heroic choice"),
            karma: 3,
            romanceOptions: [
              { character: "AGNIVESH", points: 2 },
              { character: "SANTI", points: 2 },
            ],
          },
          {
            text: "Elena, what's the safest way to help them?",
            action: () => console.log("Cautious help"),
            karma: 1,
            romance: { character: "ELENA", points: 1 },
          },
          {
            text: "I'm sorry, but I can't risk everyone's safety.",
            action: () => console.log("Self-preservation"),
            karma: -2,
          },
        ],
      },
      {
        type: "narration",
        text: "Your choice echoes through both the digital and physical realms as Episode 1 draws to a close. The real adventure is just beginning...",
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: BACKGROUNDS.AURORA_LOTUS,
        },
      },
    ],
  },
};

// Scene loader function
export const getScene = async (sceneId: string): Promise<Scene> => {
  // In a real app, this might load from external JSON files or an API
  const scene = SCENES[sceneId];

  if (!scene) {
    console.warn(`Scene '${sceneId}' not found, loading default prologue`);
    return SCENES.prologue;
  }

  return scene;
};

// Get all available scene IDs
export const getAvailableScenes = (): string[] => {
  return Object.keys(SCENES);
};

// Check if scene exists
export const sceneExists = (sceneId: string): boolean => {
  return sceneId in SCENES;
};
