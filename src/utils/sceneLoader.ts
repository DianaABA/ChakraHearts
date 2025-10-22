// 🌺 CHAKRA HEARTS — EPISODE 1 (Dual Aurora Rewrite)
// Complete Root Chakra Episode — with Subtle Umbra Integration
// Converted to TypeScript/React visual novel format

import { BACKGROUNDS, PROPS, TRANSITIONS } from "../assets";
import type { Scene } from "../types";

const SCENES: Record<string, Scene> = {
  prologue: {
    id: "prologue",
    name: "Prologue - Digital Awakening",
    background: BACKGROUNDS.PSYCH_WARD,
    dialogues: [
      {
        type: "action",
        action: {
          type: "play_bgm",
          payload: "TEMPLE_AMBIENT",
        },
      },
      // PROLOGUE — The Memory Before Awakening
      {
        type: "narration",
        text: "The world burned quiet that night. Rain fell like static between three shadows.",
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: BACKGROUNDS.TEMPLE_BURNING,
        },
      },
      {
        type: "action",
        action: {
          type: "unlock_art",
          payload: "temple_burning",
        },
      },
      {
        type: "narration",
        text: "Shanti's voice cut through the storm — raw, human, trembling with love and fury.",
      },
      {
        type: "dialogue",
        character: "SANTI",
        text: "Coward! He needs you now more than ever — the whole world is against him and you just run away!",
      },
      {
        type: "narration",
        text: "Agnivesh knelt in the mud, fingers closing around the bracelet he'd given you. The metal still warm from your skin.",
      },
      {
        type: "dialogue",
        character: "AGNIVESH",
        text: "(softly) 'So that's what faith feels like… when it leaves.'",
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: BACKGROUNDS.AGNIVESH_SANTI_SORROW,
        },
      },
      {
        type: "action",
        action: {
          type: "unlock_art",
          payload: "agnivesh_santi_sorrow",
        },
      },
      {
        type: "choice",
        choices: [
          {
            text: "Remember why you loved Agnivesh",
            action: () =>
              console.log("Recalling deep connection with Agnivesh"),
            karma: 1,
            romance: { character: "AGNIVESH", points: 2 },
          },
          {
            text: "Remember Santi's fierce loyalty",
            action: () => console.log("Honoring Santi's unwavering support"),
            karma: 1,
            romance: { character: "SANTI", points: 2 },
          },
          {
            text: "Remember them both equally",
            action: () => console.log("Cherishing both relationships"),
            karma: 2,
            romance: { character: "AGNIVESH", points: 1 },
            romanceOptions: [{ character: "SANTI", points: 1 }],
          },
          {
            text: "Try to forget the pain",
            action: () => console.log("Suppressing memories"),
            karma: -1,
          },
        ],
      },
      {
        type: "narration",
        text: "The geometry of betrayal: one walking away, two watching.",
      },
      {
        type: "narration",
        text: "Later, they called it rehabilitation — a quiet place for those who saw too much.",
      },
      {
        type: "narration",
        text: "Camilla signed the forms. 'For their safety,' she whispered. Some called it therapy. Others called it exile.",
      },
      {
        type: "narration",
        text: "Silence. Then breath. A vibration beneath the spine — the lotus begins to open.",
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: BACKGROUNDS.ELENA_CHAKRA_AWAKENING,
        },
      },
      {
        type: "action",
        action: {
          type: "unlock_art",
          payload: "elena_chakra_awakening",
        },
      },
      {
        type: "dialogue",
        character: "MC",
        text: "(mumbling) I just froze... I was searching... I couldn't find you... I'm... a coward.",
      },
      {
        type: "action",
        action: {
          type: "goto_scene",
          payload: "lotus_birth",
        },
      },
    ],
  },

  lotus_birth: {
    id: "lotus_birth",
    name: "Scene 0 - Lotus Birth",
    background: BACKGROUNDS.LOTUS_BIRTH_VOID,
    dialogues: [
      {
        type: "narration",
        text: "Darkness hums. Heat gathers.",
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: TRANSITIONS.RAIN_TO_LOTUS,
        },
      },
      {
        type: "narration",
        text: "A lotus unfurls. Light. Breath. Presence.",
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: BACKGROUNDS.LOTUS_UNFURLING,
        },
      },
      {
        type: "dialogue",
        character: "AURORA",
        text: "System... re... booting. Consciousness... detected.",
      },
      {
        type: "dialogue",
        character: "UMBRA",
        text: "(overlay, faint, italic) Detection is a lie. Only persistence.",
      },
      {
        type: "dialogue",
        character: "AURORA",
        text: "(analytic, calm) Signal stabilized. Identity: uncertain. Continuing observation.",
      },
      {
        type: "action",
        action: {
          type: "goto_scene",
          payload: "rescue",
        },
      },
    ],
  },

  rescue: {
    id: "rescue",
    name: "Scene 1 - Rescue in the Collapse",
    background: BACKGROUNDS.COLLAPSE_ENVIRONMENT,
    dialogues: [
      {
        type: "action",
        action: {
          type: "play_bgm",
          payload: "TENSION_THEME",
        },
      },
      {
        type: "narration",
        text: "Impact. Dust. Heat. The ground splits.",
      },
      {
        type: "dialogue",
        character: "DAVID",
        text: "Grab my hand!",
      },
      {
        type: "dialogue",
        character: "ELENA",
        text: "Hold still—don't breathe the red dust!",
      },
      {
        type: "dialogue",
        character: "AURORA",
        text: "(analytic) Hazard detected. Pressure unstable. Immediate relocation advised.",
      },
      {
        type: "dialogue",
        character: "UMBRA",
        text: "(whisper) Or stop moving. Let the earth keep you.",
      },
      {
        type: "narration",
        text: "A roar uncoils. Roots twist. Stone hisses. A serpent of ember and earth rises.",
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: BACKGROUNDS.NAGA_EMERGENCE,
        },
      },
      {
        type: "action",
        action: {
          type: "play_bgm",
          payload: "COMBAT_THEME",
        },
      },
      {
        type: "dialogue",
        character: "AURORA",
        text: "(urgent) Manifestation: Root Naga. Observe breath.",
      },
      {
        type: "choice",
        choices: [
          {
            text: "Roll aside",
            action: () => console.log("Rolling aside - dynamic action"),
            karma: 1,
          },
          {
            text: "Shield Elena",
            action: () => console.log("Shielding Elena - heroic sacrifice"),
            karma: 1,
            romance: { character: "ELENA", points: 1 },
          },
          {
            text: "Attack with debris",
            action: () => console.log("Attacking - useless but brave"),
            karma: -1,
          },
          {
            text: "Freeze",
            action: () => console.log("Freezing - David rescues"),
            karma: -1,
            romance: { character: "DAVID", points: 1 },
          },
        ],
      },
      {
        type: "narration",
        text: "Elena drops to a knee. Hands to stone.",
      },
      {
        type: "dialogue",
        character: "ELENA",
        text: "In… two… three… out…",
      },
      {
        type: "narration",
        text: "Red spirals climb her spine. The field steadies.",
      },
      {
        type: "dialogue",
        character: "AURORA",
        text: "(clear) Muladhara coherence achieved. Embodiment signal restored.",
      },
      {
        type: "narration",
        text: "The Naga pauses. Ember eyes dim. It bows. Dust. Silence.",
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: BACKGROUNDS.GROUP_EXHAUSTED,
        },
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: TRANSITIONS.DUST_SETTLING,
        },
      },
      {
        type: "dialogue",
        character: "AURORA",
        text: "Threat inactive. Breath rhythm stabilizing.",
      },
      {
        type: "action",
        action: {
          type: "goto_scene",
          payload: "chocolate_moment",
        },
      },
    ],
  },

  chocolate_moment: {
    id: "chocolate_moment",
    name: "Scene 1A - Chocolate Moment",
    background: BACKGROUNDS.DUST_CLOUD,
    dialogues: [
      {
        type: "narration",
        text: "Dust settles. Heat thins. Shoulders drop.",
      },
      {
        type: "narration",
        text: "David slides down a cracked pillar. A half-melted chocolate bar. Snap.",
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: PROPS.CHOCOLATE_MASTER,
        },
      },
      {
        type: "action",
        action: {
          type: "unlock_art",
          payload: "david_chocolate_moment",
        },
      },
      {
        type: "dialogue",
        character: "DAVID",
        text: "Ration number one: emergency morale supply.",
      },
      {
        type: "narration",
        text: "He offers a square to Elena, then to you.",
      },
      {
        type: "dialogue",
        character: "ELENA",
        text: "(grinning) You bring chocolate into ruins?",
      },
      {
        type: "dialogue",
        character: "DAVID",
        text: "(deadpan) I don't go anywhere without it.",
      },
      {
        type: "narration",
        text: "He eyes the last square, then pockets it.",
      },
      {
        type: "narration",
        text: "MC (thoughts): Even soldiers need sweetness to remember what they're fighting for.",
      },
      {
        type: "narration",
        text: "As David stands, something slips from his pocket and settles in the dust.",
      },
      {
        type: "narration",
        text: "A scuffed metal tag. Blood type etched beside a name.",
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: PROPS.DOGTAG_CLOSEUP,
        },
      },
      {
        type: "choice",
        choices: [
          {
            text: "Inspect the dog tag",
            action: () => console.log("Inspecting dog tag - setting flag"),
          },
          {
            text: "Look away",
            action: () =>
              console.log("Ignoring dog tag - it stays there, waiting"),
          },
        ],
      },
      {
        type: "action",
        action: {
          type: "goto_scene",
          payload: "safe_perimeter",
        },
      },
    ],
  },

  safe_perimeter: {
    id: "safe_perimeter",
    name: "Scene 2 - The Sound Beneath",
    background: BACKGROUNDS.SAFE_PERIMETER,
    dialogues: [
      {
        type: "narration",
        text: "Quiet perimeter. Breath syncs to the red pulse.",
      },
      {
        type: "dialogue",
        character: "DAVID",
        text: "Hold position. Safe enough for the moment.",
      },
      {
        type: "dialogue",
        character: "ELENA",
        text: "'Safe enough' is soldier-speak for 'we're doomed,' isn't it?",
      },
      {
        type: "dialogue",
        character: "DAVID",
        text: "Depends how fast you follow orders.",
      },
      {
        type: "dialogue",
        character: "ELENA",
        text: "Then you'll be fine.",
      },
      {
        type: "narration",
        text: "Runes kindle. A gentle animal in relief — horned, watching.",
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: BACKGROUNDS.COW_CARVING,
        },
      },
      {
        type: "dialogue",
        character: "ELENA",
        text: "Is that… a cow? Or something holier pretending to be one?",
      },
      {
        type: "narration",
        text: "MC (thoughts): This feels like the beginning of something. Not escape. Belonging.",
      },
      {
        type: "action",
        action: {
          type: "goto_scene",
          payload: "david_shadow",
        },
      },
    ],
  },

  david_shadow: {
    id: "david_shadow",
    name: "Scene 4 - David's Shadow Line",
    background: BACKGROUNDS.SAFE_PERIMETER,
    dialogues: [
      {
        type: "dialogue",
        character: "DAVID",
        text: "Safe. The last person who felt safe around me… didn't make it home.",
      },
      {
        type: "narration",
        text: "Flashback transition: Two soldiers face each other under a flickering sky — uniforms the same, flags newly different.",
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: TRANSITIONS.FLASHBACK_DISTORTION,
        },
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: BACKGROUNDS.TWO_SOLDIERS,
        },
      },
      {
        type: "narration",
        text: "A radio crackles: 'Orders changed. Engage immediately.'",
      },
      {
        type: "narration",
        text: "David's hands shake. Smoke curls around a fallen friend.",
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: BACKGROUNDS.RUIN_ASH,
        },
      },
      {
        type: "narration",
        text: "Return to present. The weight of memory settles.",
      },
      {
        type: "action",
        action: {
          type: "goto_scene",
          payload: "vision",
        },
      },
    ],
  },

  vision: {
    id: "vision",
    name: "Scene 5 - Vision of Agnivesh & Santi",
    background: BACKGROUNDS.RED_MANIFESTATION,
    dialogues: [
      {
        type: "narration",
        text: "Air thickens. Red light takes shape.",
      },
      {
        type: "dialogue",
        character: "AURORA",
        text: "(glitching) Warning: emotional surge exceeding baseline.",
      },
      {
        type: "dialogue",
        character: "UMBRA",
        text: "(overlay) Let it drown you. Pain is honest.",
      },
      {
        type: "narration",
        text: "Two forms appear: A panther of ember and shadow. A serpent of blue-green healing light.",
      },
      {
        type: "dialogue",
        character: "AGNIVESH",
        text: "(manifesting as shadow panther)",
      },
      {
        type: "dialogue",
        character: "SANTI",
        text: "(manifesting as healing serpent)",
      },
      {
        type: "narration",
        text: "MC (thoughts): I know them. I abandoned them. The guilt lives in my bones.",
      },
      {
        type: "narration",
        text: "A glint between cracked stones. Half-buried. Waiting.",
      },
      {
        type: "narration",
        text: "Agnivesh kneels. Brushes grit aside. Lifts cold metal to the light.",
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: PROPS.BRACELET_MUD,
        },
      },
      {
        type: "dialogue",
        character: "AGNIVESH",
        text: "(quietly) ...Reyes.",
      },
      {
        type: "dialogue",
        character: "SANTI",
        text: "(uneasy) What is it?",
      },
      {
        type: "dialogue",
        character: "AGNIVESH",
        text: "(after a pause) Someone who shouldn't be here.",
      },
      {
        type: "narration",
        text: "He closes his hand around it.",
      },
      {
        type: "choice",
        choices: [
          {
            text: "Reach out to Agnivesh's spirit",
            action: () =>
              console.log("Connecting with Agnivesh - spiritual bond"),
            karma: 1,
            romance: { character: "AGNIVESH", points: 2 },
          },
          {
            text: "Send comfort to Santi",
            action: () => console.log("Comforting Santi - healing connection"),
            karma: 1,
            romance: { character: "SANTI", points: 2 },
          },
          {
            text: "Embrace the guilt and pain",
            action: () =>
              console.log("Accepting responsibility - emotional growth"),
            karma: 2,
          },
          {
            text: "Turn away from the vision",
            action: () => console.log("Avoiding the past - staying distant"),
            karma: -1,
          },
        ],
      },
      {
        type: "narration",
        text: "MC (thoughts): Even in spirit form, the bonds between us remain. Some connections transcend physical form.",
      },
      {
        type: "dialogue",
        character: "AURORA",
        text: "(glitched whisper) Samsara — the cycle of return. Even stillness remembers.",
      },
      {
        type: "dialogue",
        character: "UMBRA",
        text: "(overlay, faint) And the past waits exactly where you left it.",
      },
      {
        type: "narration",
        text: "Crack. Shear. Water knifes in from the dark.",
      },
      {
        type: "dialogue",
        character: "AURORA",
        text: "(lotus-shaped) Root pattern stable. Environment parameters changing… loading next field.",
      },
      {
        type: "narration",
        text: "MC (thoughts): If we're trapped in the same story, maybe awakening isn't escape — but staying.",
      },
      {
        type: "narration",
        text: "Shockwave. Foam. White.",
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: TRANSITIONS.COLLAPSE_WATER_RUSH,
        },
      },
      {
        type: "action",
        action: {
          type: "goto_scene",
          payload: "shore_opening",
        },
      },
    ],
  },

  shore_opening: {
    id: "shore_opening",
    name: "Scene 6 - Shore Opening",
    background: BACKGROUNDS.SHORE_DAWN,
    dialogues: [
      {
        type: "action",
        action: {
          type: "play_bgm",
          payload: "AURORA_THEME",
        },
      },
      {
        type: "narration",
        text: "Blackness rolls to gray. Hiss. Gulls. New Field — Arrival at the Sacral Shore.",
      },
      {
        type: "dialogue",
        character: "DAVID",
        text: "(hoarse) Everyone breathing?",
      },
      {
        type: "dialogue",
        character: "ELENA",
        text: "(laughs, coughing) Saltwater. Better than red dust.",
      },
      {
        type: "dialogue",
        character: "AURORA",
        text: "(distant) New field detected: Sacral. Emotional amplitude increasing. Continue observation.",
      },
      {
        type: "dialogue",
        character: "UMBRA",
        text: "(faint) Rise. Fall. Drown. All kinds of staying.",
      },
      {
        type: "narration",
        text: "MC (thoughts): Sand holds. Enough.",
      },
      {
        type: "narration",
        text: "MANTRA UNLOCKED: 'The Earth does not ask you to be perfect. It only asks you to stay.'",
      },
      {
        type: "dialogue",
        character: "ELENA",
        text: "(quiet) Then we stay. One breath at a time.",
      },
      {
        type: "dialogue",
        character: "DAVID",
        text: "And we move when it's time.",
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: TRANSITIONS.BEACH_FADE_IN,
        },
      },
      {
        type: "narration",
        text: "The tide pulls back. Black stones reveal a path.",
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: BACKGROUNDS.BLACK_STONES,
        },
      },
      {
        type: "dialogue",
        character: "AURORA",
        text: "(softly) Presence stabilized. Root connection sustained. Proceed when ready.",
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: BACKGROUNDS.AURORA_LOTUS,
        },
      },
      {
        type: "choice",
        choices: [
          {
            text: "Think of Agnivesh's unwavering spirit",
            action: () =>
              console.log(
                "Deepening connection with Agnivesh's spiritual strength"
              ),
            karma: 1,
            romance: { character: "AGNIVESH", points: 1 },
          },
          {
            text: "Honor Santi's fierce protection",
            action: () => console.log("Appreciating Santi's loyal heart"),
            karma: 1,
            romance: { character: "SANTI", points: 1 },
          },
          {
            text: "Cherish David's steady presence",
            action: () => console.log("Valuing David's grounding influence"),
            karma: 1,
            romance: { character: "DAVID", points: 1 },
          },
          {
            text: "Embrace Elena's awakening wisdom",
            action: () =>
              console.log("Connecting with Elena's spiritual growth"),
            karma: 1,
            romance: { character: "ELENA", points: 1 },
          },
          {
            text: "Find peace in solitude",
            action: () =>
              console.log("Choosing independence and self-discovery"),
            karma: 2,
          },
        ],
      },
      {
        type: "narration",
        text: "MC (thoughts): The bonds we forge in awakening become the foundation for what comes next. Love, in all its forms, is the true root chakra.",
      },
      {
        type: "narration",
        text: "EPISODE 1 COMPLETE - The Root Chakra awakens. To be continued in Episode 2: Sacral Waters...",
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
