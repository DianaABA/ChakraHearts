// 🌺 CHAKRA HEARTS — EPISODE 1 (Dual Aurora Rewrite)
// Complete Root Chakra Episode — with Subtle Umbra Integration
// Converted to TypeScript/React visual novel format

import {
  BACKGROUNDS,
  PROLOGUE_BACKGROUNDS,
  PROPS,
  TRANSITIONS,
} from "../assets";
import type { Scene } from "../types";
import { devLog } from "./logger";
import { useGameStore } from "../stores/gameStore";

const SCENES: Record<string, Scene> = {
  prologue: {
    id: "prologue",
    name: "Prologue - The Memory Before Awakening",
    background: PROLOGUE_BACKGROUNDS.AGNIVESH_HAPPY_BEFORE,
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
        text: "The world burned quiet that night. Rain fell like static between three shadows.",
      },
      {
        type: "action",
        action: {
          type: "unlock_art",
          payload: "pro_ep1_betrayal_hall",
          title: "Rain & Fire — The Night of Betrayal",
        },
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: PROLOGUE_BACKGROUNDS.AGNIVESH_SANTI_SORROW,
        },
      },
      {
        type: "narration",
        text: "Santi's voice cut through the storm — raw, human, trembling with love and fury.",
      },
      {
        type: "dialogue",
        character: "SANTI",
        text: "Coward! He needs you now more than ever — the whole world is against him and you just run away!",
      },
      {
        type: "action",
        action: {
          type: "unlock_art",
          payload: "pro_ep1_santi_yelling",
          title: "Santi — Love & Fury in the Rain",
        },
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: PROLOGUE_BACKGROUNDS.AGNIVESH_FINDS_DOGTAG,
        },
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
          type: "unlock_art",
          payload: "pro_ep1_agnivesh_bracelet",
          title: "Faith Fallen — Agnivesh and the Bracelet",
        },
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: PROLOGUE_BACKGROUNDS.PSYCH_WARD,
        },
      },
      {
        type: "narration",
        text: "Later, they called it rehabilitation — a quiet place for those who saw too much.",
      },
      {
        type: "narration",
        text: "Camilla signed the forms. 'For their safety,' she whispered.",
      },
      {
        type: "narration",
        text: "Some called it therapy. Others called it exile.",
      },
      {
        type: "action",
        action: {
          type: "unlock_art",
          payload: "pro_ep1_psych_rehab_hall",
          title: "White Corridors — The Quiet Exile",
        },
      },
      {
        type: "action",
        action: {
          type: "pause",
          payload: 1200,
        },
      },
      {
        type: "action",
        action: {
          type: "fade_to_black",
        },
      },
      {
        type: "action",
        action: {
          type: "sfx",
          payload: "low_heartbeat",
        },
      },
      {
        type: "narration",
        text: "Silence. Then breath. A vibration beneath the spine — the lotus begins to open.",
      },
      {
        type: "action",
        action: {
          type: "pause",
          payload: 1000,
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
          type: "set_flag",
          payload: { id: "ep1_confessed_cowardice", value: true },
        },
      },
      {
        type: "action",
        action: {
          type: "sfx",
          payload: "deep_pulse",
        },
      },
      {
        type: "action",
        action: {
          type: "vfx",
          payload: "red_glow_flood",
        },
      },
      {
        type: "action",
        action: {
          type: "unlock_codex_entries",
          payload: [
            { id: "codex_chakra", title: "Chakra" },
            { id: "codex_muladhara", title: "Muladhara (Root Chakra)" },
            { id: "codex_karma", title: "Karma" },
            { id: "codex_aurora_umbra", title: "Aurora & Umbra" },
            { id: "codex_agnivesh_santi", title: "Agnivesh & Santi" },
            { id: "codex_mantra", title: "Mantra" },
            { id: "codex_cow_symbol", title: "Sacred Cow Symbol" },
            { id: "codex_samsara", title: "Samsara" },
          ],
        },
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
          payload: "temple_awakening",
        },
      },
    ],
  },

  temple_awakening: {
    id: "temple_awakening",
    name: "Scene 0.5 - Temple Awakening",
    background: PROLOGUE_BACKGROUNDS.TEMPLE_BURNING,
    dialogues: [
      {
        type: "narration",
        text: "Ancient stone breathes with digital fire. Temple walls pulse with the rhythm of reawakening consciousness.",
      },
      {
        type: "dialogue",
        character: "AURORA",
        text: "Environmental scan: Sacred architecture detected. Running compatibility analysis with consciousness matrix...",
      },
      {
        type: "narration",
        text: "Crimson light spirals across carved mantras. The temple remembers what was lost.",
      },
      {
        type: "dialogue",
        character: "AURORA",
        text: "Analysis complete. This location resonates with Root frequency. Proceeding to manifestation zone.",
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: TRANSITIONS.COLLAPSE_WATER_RUSH,
        },
      },
      {
        type: "narration",
        text: "The temple shudders. Ancient stones surrender to inevitable collapse as consciousness streams toward the shore...",
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
        text: "Waves wash over broken foundations. The digital realm calls from distant shores.",
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
        type: "narration",
        text: "Hands. Voices. Motion.",
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
        type: "action",
        action: {
          type: "sfx",
          payload: "umbra_glitch_soft",
        },
      },
      {
        type: "action",
        action: {
          type: "vfx",
          payload: "hud_flicker_soft",
        },
      },
      {
        type: "dialogue",
        character: "UMBRA",
        text: "(whisper) Or stop moving. Let the earth keep you.",
      },
      {
        type: "action",
        action: {
          type: "goto_scene",
          payload: "guardian_encounter",
        },
      },
    ],
  },

  guardian_encounter: {
    id: "guardian_encounter",
    name: "Scene 1A - Root Naga Survival + Elena's Root Awakening",
    background: BACKGROUNDS.NAGA_FIGHT_EPIC,
    dialogues: [
      {
        type: "action",
        action: {
          type: "sfx",
          payload: "stone_crack",
        },
      },
      {
        type: "action",
        action: {
          type: "vfx",
          payload: "dust_cascade",
        },
      },
      {
        type: "narration",
        text: "A roar uncoils.",
      },
      {
        type: "narration",
        text: "Roots twist. Stone hisses. A serpent of ember and earth rises.",
      },
      {
        type: "action",
        action: {
          type: "unlock_art",
          payload: "sc1a_root_naga",
          title: "Keeper of the Grounded Flame — Root Naga Manifestation",
        },
      },
      {
        type: "dialogue",
        character: "AURORA",
        text: "(urgent) Manifestation: Root Naga. Observe breath.",
      },
      {
        type: "action",
        action: {
          type: "play_bgm",
          payload: "AURORA_THEME",
        },
      },
      {
        type: "narration",
        text: "Reflex: Choose your response to the Root Guardian:",
      },
      {
        type: "choice",
        choices: [
          {
            text: "Roll aside",
            action: () =>
              devLog("Rolling aside - dynamic survival instinct"),
            karma: 1,
            flags: { guardian_reflex: "roll" },
            responseText: "You dive. Tail smashes. Sparks bloom.",
            additionalText: "Aurora: 'Instinct aligned with survival impulse.'",
            effects: [
              { type: "vfx", payload: "screen_shake_short" },
              { type: "sfx", payload: "impact_thud" },
            ],
          },
          {
            text: "Shield Elena",
            action: () => devLog("Shielding Elena - heroic protection"),
            karma: 1,
            romance: { character: "ELENA", points: 1 },
            flags: { guardian_reflex: "shield" },
            responseText: "You tackle Elena clear. Heat rakes your back.",
            additionalText:
              "Elena: 'Heroic… and stupid. You're bleeding!' MC: 'Still breathing.'",
            effects: [
              { type: "vfx", payload: "screen_shake_short" },
              { type: "sfx", payload: "impact_scrape" },
            ],
          },
          {
            text: "Attack with debris",
            action: () => devLog("Attacking - aggressive but futile"),
            karma: -1,
            flags: { guardian_reflex: "attack" },
            responseText:
              "You hurl a stone. Useless ricochet. The serpent lashes.",
            additionalText:
              "Aurora (glitched): 'Force increases instability.' Umbra (faint): 'Fight what anchors you — see where you land.'",
            effects: [
              { type: "sfx", payload: "stone_clack" },
              { type: "vfx", payload: "hud_flicker_soft" },
              { type: "sfx", payload: "umbra_glitch_soft" },
            ],
          },
          {
            text: "Freeze",
            action: () =>
              devLog("Freezing - David rescues, trauma bonding"),
            karma: -1,
            romance: { character: "DAVID", points: 1 },
            flags: { guardian_reflex: "freeze", froze_in_guardian: true },
            responseText: "Heat blooms across your shoulder. Whiteout.",
            additionalText:
              "A forearm hooks you — cover, breath, dust. David (low, urgent): 'Don't freeze again, got it?' MC (breathless): 'I didn't… mean to.' David (tight): 'Yeah. Nobody ever does.'",
            effects: [
              { type: "vfx", payload: "screen_whiten" },
              { type: "sfx", payload: "heartbeat_spike" },
            ],
          },
        ],
      },
      {
        type: "narration",
        text: "Elena drops to a knee. Hands to stone. For just a moment, her expression shifts - as if recognizing something familiar about this performance.",
      },
      {
        type: "dialogue",
        character: "ELENA",
        text: "In… two… three… out… (muttering) Just like the breathing exercises they taught us before going live...",
      },
      {
        type: "action",
        action: {
          type: "vfx",
          payload: "red_petals_rise",
        },
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: PROLOGUE_BACKGROUNDS.ELENA_CHAKRA_AWAKENING_NEW,
        },
      },
      {
        type: "action",
        action: {
          type: "sfx",
          payload: "low_om",
        },
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
        type: "dialogue",
        character: "UMBRA",
        text: "(whisper) Power stabilized... but imagine if you'd taken it instead of giving it away...",
      },
      {
        type: "action",
        action: {
          type: "unlock_art",
          payload: "elena_grounding",
          title: "Lotus of Earth — Elena's Root Awakening",
        },
      },
      {
        type: "action",
        action: {
          type: "unlock_codex_entry",
          payload: { id: "codex_muladhara", title: "Muladhara (Root Chakra)" },
        },
      },
      {
        type: "narration",
        text: "The Naga pauses. Ember eyes dim. It bows. Dust. Silence.",
      },
      {
        type: "dialogue",
        character: "AURORA",
        text: "Threat inactive. Breath rhythm stabilizing.",
      },
      {
        type: "action",
        action: {
          type: "award_badge",
          payload: { id: "ep1_root_reborn", title: "🌺 Root Reborn" },
        },
      },
      {
        type: "action",
        action: {
          type: "conditional_badge",
          payload: {
            condition: "ep1_confessed_cowardice OR not froze_in_guardian",
            badge: { id: "ep1_cowards_breath", title: "🌧 The Coward's Breath" },
          },
        },
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: BACKGROUNDS.TEMPLE_AFTERMATH_REST,
        },
      },
      {
        type: "narration",
        text: "The temple settles into silence. Dust motes dance in shafts of golden light. Bodies rest among ancient stones.",
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
    name: "Scene 1A - David's Chocolate & Dog Tag Drop",
    background: BACKGROUNDS.CHOCOLATE_MOMENT,
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
          payload: BACKGROUNDS.CHOCOLATE_MOMENT,
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
        type: "action",
        action: {
          type: "unlock_art",
          payload: "sc1a_prop_chocolate",
          title: "Emergency Morale: David's Last Chocolate Bar",
        },
      },
      {
        type: "action",
        action: {
          type: "set_flag",
          payload: { id: "shared_chocolate", value: true },
        },
      },
      {
        type: "narration",
        text: "As David stands, something slips from his pocket and settles in the dust.",
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: PROPS.DOGTAG_CLOSEUP,
        },
      },
      {
        type: "narration",
        text: "A scuffed metal tag. Blood type etched beside a name.",
      },
      {
        type: "action",
        action: {
          type: "unlock_art",
          payload: "prop_dogtag_floor",
          title: "Rosetta Tag — Fallen in the Dust",
        },
      },
      {
        type: "action",
        action: {
          type: "set_flag",
          payload: { id: "ep1_dogtag_dropped", value: true },
        },
      },
      {
        type: "action",
        action: {
          type: "unlock_codex_entry",
          payload: { id: "codex_dogtag", title: "Unidentified Dog Tag" },
        },
      },
      {
        type: "narration",
        text: "Something glints, half-buried near David's boot. Inspect it?",
      },
      {
        type: "choice",
        choices: [
          {
            text: "Inspect the dog tag",
            action: () => devLog("Inspecting dog tag - gaining insight"),
            flags: { codex_dogtag_hint_shown: true },
            effects: [
              { type: "show_image", payload: BACKGROUNDS.DOGTAG_CLOSEUP_MUD },
              { type: "open_codex", payload: "codex_dogtag" },
            ],
            responseText:
              "You crouch down and brush away the dirt. The metal is cold, worn smooth by time and handling.",
            additionalText:
              "The engraving reads clearly: 'CPL M. REYES' — O+. A name that feels familiar, yet impossible.",
          },
          {
            text: "Look away",
            action: () => devLog("Ignoring dog tag - mystery remains"),
            responseText:
              "Something about the metal gleam makes you uncomfortable. Best not to pry.",
          },
        ],
      },
      {
        type: "action",
        action: {
          type: "play_bgm",
          payload: "TENSION_THEME",
        },
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
    name: "Scene 2 - The Sound Beneath / Elena Connection",
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
        text: "Elena settles against the wall, studying the ancient carvings. Her fingers trace patterns in the dust.",
      },
      {
        type: "dialogue",
        character: "ELENA",
        text: "You know, I spent three years on a reality show called 'Jungle Hearts.' I wanted to become a stand-up comedian, but... that didn't work out.",
      },
      {
        type: "dialogue",
        character: "DAVID",
        text: "Three years? What happened with the comedy?",
      },
      {
        type: "dialogue",
        character: "ELENA",
        text: "I bombed every audition. Then on the show, I ate a bug live on camera. The video went viral - everyone was laughing AT me, not WITH me. That's when I knew my comedy dreams were over.",
      },
      {
        type: "narration",
        text: "She laughs, but there's something hollow in it. Her eyes scan the chamber walls with an oddly familiar intensity.",
      },
      {
        type: "dialogue",
        character: "ELENA",
        text: "You develop... instincts on reality TV. You learn to feel when you're being watched. When things are too scripted, too convenient...",
      },
      {
        type: "action",
        action: {
          type: "unlock_codex_entry",
          payload: { id: "concept:REALITY_SHOW", title: "Reality Show Metanarrative" },
        },
      },
      {
        type: "dialogue",
        character: "ELENA",
        text: "(quietly) Sometimes I still get that feeling. Like right now.",
      },
      {
        type: "dialogue",
        character: "ELENA",
        text: "That night, I had this dream. The bug was speaking to me in a language I somehow understood. It said, 'You consumed me, but did you honor me?'",
      },
      {
        type: "dialogue",
        character: "ELENA",
        text: "I quit the show the next morning. Couldn't explain it to anyone without sounding crazy.",
      },
      {
        type: "dialogue",
        character: "UMBRA",
        text: "(barely audible) She's weak... dismiss her fantasy... reality shows breed delusion...",
      },
      {
        type: "dialogue",
        character: "AURORA",
        text: "(gentle) Every awakening begins with someone thinking they've gone mad...",
      },
      {
        type: "choice",
        choices: [
          {
            text: "That doesn't sound crazy at all",
            action: () => devLog("Validating Elena's spiritual awakening"),
            karma: 1,
            romance: { character: "ELENA", points: 2 },
          },
          {
            text: "Dreams can be powerful teachers",
            action: () => devLog("Acknowledging spiritual wisdom"),
            karma: 1,
            romance: { character: "ELENA", points: 1 },
          },
          {
            text: "Maybe it was just guilt",
            action: () => devLog("Dismissing the spiritual significance"),
            karma: -1,
          },
          {
            text: "Tell me more about the dream",
            action: () =>
              devLog("Showing genuine interest in Elena's experience"),
            karma: 1,
            romance: { character: "ELENA", points: 1 },
          },
        ],
      },
      {
        type: "dialogue",
        character: "ELENA",
        text: "After that, I started noticing things. The way plants lean toward each other. How animals look at you when they think you're not watching.",
      },
      {
        type: "dialogue",
        character: "ELENA",
        text: "My publicist said the viral bug video could be a 'spiritual awakening moment.' Said it would be good for rebranding me from failed comedian to mystic guru.",
      },
      {
        type: "narration",
        text: "She touches the wall again, and for a moment, the carved symbols seem to pulse with faint light.",
      },
      {
        type: "dialogue",
        character: "ELENA",
        text: "But this... this isn't a phase. This is remembering something I always knew but forgot how to hear.",
      },
      {
        type: "action",
        action: {
          type: "award_badge",
          payload: { id: "ep1_bug_snack", title: "🐞 Bug Snack Survivor" },
        },
      },
      {
        type: "action",
        action: {
          type: "set_flag",
          payload: { id: "picked_elena_route", value: true },
        },
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
        type: "action",
        action: {
          type: "unlock_art",
          payload: "sc2_cow_carving",
          title: "The Silent Witness — Root Temple Cow",
        },
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
    name: "Scene 4 - David's Shadow Line + Flashback",
    background: BACKGROUNDS.SAFE_PERIMETER,
    dialogues: [
      {
        type: "dialogue",
        character: "DAVID",
        text: "Safe. The last person who felt safe around me… didn't make it home.",
      },
      {
        type: "action",
        action: {
          type: "vfx",
          payload: "flash_white",
        },
      },
      {
        type: "action",
        action: {
          type: "sfx",
          payload: "low_heartbeat_slow",
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
        text: "Two soldiers face each other under a flickering sky — uniforms the same, flags newly different.",
      },
      {
        type: "narration",
        text: "A radio crackles: 'Orders changed. Engage immediately.'",
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
        text: "David's hands shake. Smoke curls around a fallen friend.",
      },
      {
        type: "action",
        action: {
          type: "pause",
          payload: 900,
        },
      },
      {
        type: "action",
        action: {
          type: "sfx",
          payload: "heartbeat_echo",
        },
      },
      {
        type: "action",
        action: {
          type: "fade_to_black",
        },
      },
      {
        type: "action",
        action: {
          type: "vfx",
          payload: "flash_return",
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
        type: "action",
        action: {
          type: "sfx",
          payload: "umbra_glitch_soft",
        },
      },
      {
        type: "action",
        action: {
          type: "vfx",
          payload: "hud_flicker_soft",
        },
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
        type: "action",
        action: {
          type: "unlock_art",
          payload: "vision_agnivesh_santi",
          title: "Twin Echoes — Panther & Serpent",
        },
      },
      {
        type: "narration",
        text: "Two forms appear: A panther of ember and shadow. A serpent of blue-green healing light.",
      },
      {
        type: "narration",
        text: "MC (thoughts): I know them. I abandoned them. The guilt lives in my bones.",
      },
      {
        type: "choice",
        choices: [
          {
            text: "Reach out to Agnivesh's spirit",
            action: () =>
              devLog("Connecting with Agnivesh - spiritual bond"),
            karma: 1,
            romance: { character: "AGNIVESH", points: 2 },
          },
          {
            text: "Send comfort to Santi",
            action: () => devLog("Comforting Santi - healing connection"),
            karma: 1,
            romance: { character: "SANTI", points: 2 },
          },
          {
            text: "Embrace the guilt and pain",
            action: () =>
              devLog("Accepting responsibility - emotional growth"),
            karma: 2,
          },
          {
            text: "Turn away from the vision",
            action: () => devLog("Avoiding the past - staying distant"),
            karma: -1,
          },
        ],
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
          payload: PROPS.DOGTAG_CLOSEUP,
        },
      },
      {
        type: "dialogue",
        character: "AGNIVESH",
        text: "(voice breaking) ...Marcus... No. No, this can't be his.",
      },
      {
        type: "narration",
        text: "EPISODE 1: DENIAL - The first stage of grief. Old wounds reopen as new pain strikes.",
      },
      {
        type: "dialogue",
        character: "SANTI",
        text: "(softly, with practiced devotion) Agnivesh... I'm here. I'll always be here. Like my father taught me - a good wife never abandons her husband.",
      },
      {
        type: "dialogue",
        character: "AGNIVESH",
        text: "(desperate, panther eyes flashing) This isn't real. Marcus is alive. He's stationed far away. Safe. Away from... away from all of this.",
      },
      {
        type: "narration",
        text: "MC feels a familiar pang - the same fear that made them flee when Agnivesh needed them most. Some betrayals echo across time.",
      },
      {
        type: "dialogue",
        character: "AGNIVESH",
        text: "(voice hardening) My brother... my twin brother, Marcus. This can't be his tag. Someone's playing a sick joke.",
      },
      {
        type: "narration",
        text: "He closes his hand around it.",
      },
      {
        type: "action",
        action: {
          type: "sfx",
          payload: "umbra_glitch_soft",
        },
      },
      {
        type: "action",
        action: {
          type: "vfx",
          payload: "hud_flicker_soft",
        },
      },
      {
        type: "dialogue",
        character: "AURORA",
        text: "(glitched whisper) Samsara — the cycle of return. Even stillness remembers.",
      },
      {
        type: "action",
        action: {
          type: "sfx",
          payload: "umbra_glitch_soft",
        },
      },
      {
        type: "dialogue",
        character: "UMBRA",
        text: "(overlay, faint) And the past waits exactly where you left it.",
      },
      {
        type: "action",
        action: {
          type: "set_flag",
          payload: { id: "ep1_dogtag_seen", value: true },
        },
      },
      {
        type: "narration",
        text: "MC (thoughts): Even in spirit form, the bonds between us remain. Some connections transcend physical form.",
      },
      {
        type: "narration",
        text: "Crack. Shear. Water knifes in from the dark.",
      },
      {
        type: "action",
        action: {
          type: "vfx",
          payload: "screen_shake_long",
        },
      },
      {
        type: "action",
        action: {
          type: "sfx",
          payload: "flood_roar",
        },
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

  agnivesh_grief_denial: {
    id: "agnivesh_grief_denial",
    name: "Scene 5.5 - Episode 1: DENIAL - The Teacher's First Loss",
    background: BACKGROUNDS.SAFE_PERIMETER,
    dialogues: [
      {
        type: "narration",
        text: "Later, in the safety of the alcove. Agnivesh sits apart, the dog tag trembling in his panther-clawed hands. Once, these hands taught spiritual wisdom. Now they clutch only grief.",
      },
      {
        type: "dialogue",
        character: "AGNIVESH",
        text: "(voice hollow) This can't be real. I taught Marcus meditation when we were children. I showed him how to center his chakras. He was... he was safe.",
      },
      {
        type: "dialogue",
        character: "SANTI",
        text: "(moving closer, voice soft and pleasing) You taught us both that denial blocks the flow of healing energy. Remember? I memorized all your lessons, just like father said I should.",
      },
      {
        type: "dialogue",
        character: "AGNIVESH",
        text: "(panther eyes flashing) Don't... don't quote my own teachings to me. Not now. Not when everyone I trusted...",
      },
      {
        type: "narration",
        text: "He catches himself, old pain mixing with new. MC feels the weight of unspoken history.",
      },
      {
        type: "dialogue",
        character: "AGNIVESH",
        text: "(desperate) Marcus is alive. I would FEEL it if he was gone. Twin souls, twin chakras... we're connected beyond death.",
      },
      {
        type: "dialogue",
        character: "ELENA",
        text: "(gently) Agnivesh, the blood type matches what you told us about your brother...",
      },
      {
        type: "dialogue",
        character: "AGNIVESH",
        text: "(snapping) O-positive is common! Half the population has O-positive! This proves nothing!",
      },
      {
        type: "narration",
        text: "David shifts uncomfortably, something dark passing behind his eyes. A secret he cannot yet speak.",
      },
      {
        type: "dialogue",
        character: "DAVID",
        text: "(quietly) Agnivesh... I...",
      },
      {
        type: "dialogue",
        character: "AGNIVESH",
        text: "(not listening) He's alive. I can feel it. Twin intuition, you know? I'd know if he was... if he was...",
      },
      {
        type: "narration",
        text: "The word 'dead' hangs unspoken in the air, too terrible to voice.",
      },
      {
        type: "dialogue",
        character: "AGNIVESH",
        text: "(voice breaking) He can't be dead. He just... he can't be.",
      },
      {
        type: "action",
        action: {
          type: "set_flag",
          payload: { id: "agnivesh_grief_stage", value: "denial" },
        },
      },
      {
        type: "action",
        action: {
          type: "open_codex",
          payload: {
            id: "marcus_reyes_mystery",
            title: "Marcus Reyes - Agnivesh's Twin Brother",
          },
        },
      },
      {
        type: "dialogue",
        character: "SANTI",
        text: "(to MC, protective but with underlying desperation) He needs someone who won't abandon him. Someone who stays, like... like a good wife should. Father always said loyalty is everything.",
      },
      {
        type: "narration",
        text: "Her words carry the weight of learned helplessness, echoing patterns deeper than love.",
      },
      {
        type: "narration",
        text: "The grief journey has begun. Six more stages await, and with them, the terrible truth about what happened between Marcus and David.",
      },
    ],
  },

  shore_opening: {
    id: "shore_opening",
    name: "Scene 6 - Shore Opening / Stranded Beach",
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
        type: "action",
        action: {
          type: "unlock_art",
          payload: "shore_opening",
          title: "New Field — Arrival at the Sacral Shore",
        },
      },
      {
        type: "narration",
        text: "Blackness rolls to gray. Hiss. Gulls.",
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
        type: "action",
        action: {
          type: "sfx",
          payload: "umbra_glitch_soft",
        },
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
        text: "On-screen Mantra: 'The Earth does not ask you to be perfect. It only asks you to stay.'",
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
          type: "goto_scene",
          payload: "stinger_sequence",
        },
      },
    ],
  },

  stinger_sequence: {
    id: "stinger_sequence",
    name: "Stinger - Rosetta Tag Found",
    background: BACKGROUNDS.RUIN_ASH,
    dialogues: [
      {
        type: "action",
        action: {
          type: "fade_to_black",
        },
      },
      {
        type: "action",
        action: {
          type: "sfx",
          payload: "low_metal_clink_far",
        },
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
        text: "In the cooling ruin, embers dim. A hand brushes ash from a small, scuffed tag.",
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: PROLOGUE_BACKGROUNDS.AGNIVESH_FINDS_DOGTAG,
        },
      },
      {
        type: "narration",
        text: "Name etched in steel: 'CPL M. REYES' — O+. Marcus.",
      },
      {
        type: "action",
        action: {
          type: "show_image",
          payload: BACKGROUNDS.DOGTAG_CLOSEUP_HAND,
        },
      },
      {
        type: "action",
        action: {
          type: "unlock_art",
          payload: "stinger_dogtag_pickup",
          title: "Rosetta Tag — Found in the Ashes",
        },
      },
      {
        type: "narration",
        text: "In half-light, a face hardens. Fingers close around the name.",
      },
      {
        type: "action",
        action: {
          type: "set_flag",
          payload: { id: "ep1_dogtag_found", value: true },
        },
      },
      {
        type: "action",
        action: {
          type: "set_flag",
          payload: { id: "codex_dogtag_identified", value: true },
        },
      },
      {
        type: "narration",
        text: "EPISODE 1 COMPLETE — Root Chakra: Grounding through vulnerability",
      },
      {
        type: "narration",
        text: "Your karma shifts with the choices you've made.",
      },
      {
        type: "narration",
        text: "Hearts you've touched will remember.",
      },
      {
        type: "narration",
        text: "Mantra Unlocked: 'The Earth does not ask you to be perfect. It only asks you to stay.'",
      },
      {
        type: "narration",
        text: "Elena's Root Chakra: Unlocked ✅",
      },
      {
        type: "narration",
        text: "Aurora remains in her Lotus form—for now.",
      },
      {
        type: "narration",
        text: "To be continued in Episode 2: Sacral Waters...",
      },
      {
        type: "choice",
        choices: [
          {
            text: "Begin Episode 2",
            action: () => {
              try {
                const st = useGameStore.getState();
                st.setCurrentEpisode(2);
                st.setCurrentDialogue(0);
              } catch {/* ignore */}
            },
            effects: [
              { type: "goto_scene", payload: "ep2_shore_awake" },
            ],
          },
          {
            text: "Return to Main Menu",
            action: () => {
              try {
                const st = useGameStore.getState();
                st.setCurrentEpisode(1);
                st.setCurrentScene("prologue");
                st.setCurrentDialogue(0);
              } catch {/* ignore */}
            },
            effects: [
              { type: "goto_scene", payload: "prologue" },
            ],
          },
        ],
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
