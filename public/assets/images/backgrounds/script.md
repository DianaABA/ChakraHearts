# Chakra Hearts — Episode 1 (Sprite-Reduced Edition)
**File:** `episode1_script_CINEMATIC.md`  
**Change request:** Use only **Neutral/Smile/Angry** portraits for *human* characters (David, Elena, MC), and **only one Neutral** sprite each for **Agnivesh (Panther)** and **Santi (Serpent)**. Non-portrait cinematic/wide assets remain unchanged.

---

## Sprite Rules Applied
- **Humans:** `*_neutral_root`, `*_smile_root`, `*_angry_root` only.
- **Agnivesh (Panther):** `agnivesh_panther_neutral` only.
- **Santi (Serpent):** `santi_serpent_neutral` only.
- Replaced former portrait IDs like `david_concerned_root`, `david_warm_rare_smile_root`, `elena_playful_root`, etc., with the closest of the three moods.
- Replaced aspect-form portrait calls in SC5 Vision to their **neutral** forms.
- Added a tiny **portrait resolver** to keep calls concise where helpful.

---

## Engine Hooks (unchanged)
```ocaml
let unlock_art (_id:string) (_title:string) = ()
let award_badge (_id:string) (_title:string) = ()
let unlock_codex_entry (_id:string) (_title:string) = ()
let set_flag (_id:string) (_v:bool) = ()
let get_flag (_id:string) = false
let add_karma (_n:int) = ()
let add_romance (_who:string) (_n:int) = ()
let show_image (_id:string) = ()
let caption (_t:string) = ()
let dialogue (_who:string) (_t:string) = ()
let pause (_ms:int) = ()
let fade_to_black () = ()
let sfx (_id:string) = ()
let vfx (_id:string) = ()
let t (_narr:string) = ()
let ui (_txt:string) = ()
let goto (_scene_id:string) = ()
let player_choice () = 0
let open_codex (_id:string) = ()
```

## NEW: Portrait Resolver
```ocaml
(* mood-aware portrait helper to standardize IDs *)
let show_portrait who mood =
  let id =
    match (who, mood) with
    | ("DAVID","neutral") -> "david_neutral_root"
    | ("DAVID","smile")   -> "david_smile_root"
    | ("DAVID","angry")   -> "david_angry_root"
    | ("ELENA","neutral") -> "elena_neutral_root"
    | ("ELENA","smile")   -> "elena_smile_root"
    | ("ELENA","angry")   -> "elena_angry_root"
    | ("MC","neutral")    -> "mc_neutral_root"
    | ("MC","smile")      -> "mc_smile_root"
    | ("MC","angry")      -> "mc_angry_root"
    | ("AGNIVESH","neutral_panther") -> "agnivesh_panther_neutral"
    | ("SANTI","neutral_serpent")    -> "santi_serpent_neutral"
    | _ -> "mc_neutral_root"
  in show_image id
```

---

## PROLOGUE — The Memory Before Awakening (unchanged cinematics)
*(All non-portrait/wide shots preserved; no sprite changes required in this section.)*

---

## SCENE 1 — RESCUE IN THE COLLAPSE
```ocaml
(* Establishing: unchanged wide/environment shots *)
fade_to_black ();
show_image "sc1_collapse_environment_wide";
sfx "stone_crack"; sfx "debris_falling";
vfx "dust_clouds_red";
t "Impact. Dust. Heat.";
pause 200;

show_image "sc1_ground_splitting";
vfx "screen_shake_short";
sfx "earth_rupture";
t "The ground splits.";
pause 300;

show_image "sc1_david_hand_reach";
sfx "voice_urgent_muffled";
t "Hands. Voices. Motion.";
dialogue "DAVID" "Grab my hand!";
unlock_art "sc1_david_hand_reach" "Salvation — David's Extended Hand";
pause 400;

show_image "sc1_elena_shielding_mc";
vfx "red_dust_backlit";
dialogue "ELENA" "Hold still—don't breathe the red dust!";
unlock_art "sc1_elena_shielding_mc" "Guardian Angel — Elena's Protection";
pause 400;

show_image "sc0_aurora_lotus_form";
t "Aurora (analytic): \"Hazard detected. Pressure unstable. Immediate relocation advised.\"";
vfx "vfx_umbra_glitch_overlay";
sfx "umbra_glitch_soft";
t "Umbra (whisper): _\"Or stop moving. Let the earth keep you.\"_";

(* Portrait swaps → reduced set *)
show_portrait "DAVID" "angry";      (* was david_profile_determined *)
show_portrait "ELENA" "neutral";    (* was elena_full_body_action *)
show_image "sc1_dust_cloud_silhouettes"; 
unlock_art "sc1_dust_cloud_silhouettes" "Fellowship in Chaos — Three Silhouettes";
```

---

## SCENE 1A — ROOT NAGA SURVIVAL + ELENA'S ROOT AWAKENING
```ocaml
(* Naga emergence — unchanged cinematic *)
show_image "sc1a_naga_emergence_wide"; ...

(* Choice outcomes: portrait substitutions *)
(* Choice 1: Roll aside *)
...
show_portrait "DAVID" "neutral";    (* was david_concerned_root *)
dialogue "DAVID" "Nice reflex!";
t "Aurora: \"Instinct aligned with survival impulse.\"";

(* Choice 2: Shield Elena *)
...
show_portrait "ELENA" "smile";      (* was elena_tender_root *)
dialogue "ELENA" "Heroic… and stupid. You're bleeding!";

(* Choice 4: Freeze — David rescues *)
...
show_portrait "DAVID" "angry";      (* was david_protective_intense_root *)
dialogue "DAVID" "(low, urgent) Don't freeze again, got it?";
```

```ocaml
(* Elena's Root awakening — unchanged VFX *)
...

(* Aftermath — group exhausted *)
show_image "sc1a_group_exhausted_aftermath"; ...
```

---

## "Chocolate Moment" — Sprite swaps
```ocaml
show_image "sc1a_david_offering_chocolate"; ...
show_image "sc1a_chocolate_bar_hand"; ...

show_portrait "ELENA" "smile";      (* was elena_grinning_teasing_root *)
dialogue "ELENA" "(grinning) You bring chocolate into ruins?";

show_portrait "DAVID" "smile";      (* was david_warm_rare_smile_root *)
dialogue "DAVID" "(deadpan) I don't go anywhere without it.";
```

---

## SCENE 2 — THE SOUND BENEATH / ELENA CONNECTION
```ocaml
show_image "sc2_safe_perimeter_alcove"; ...

show_portrait "DAVID" "neutral";    (* was david_neutral_root — same mood *)
dialogue "DAVID" "Hold position. Safe enough for the moment.";

show_portrait "ELENA" "smile";      (* was elena_playful_root *)
dialogue "ELENA" "'Safe enough' is soldier-speak for 'we're doomed,' isn't it?";

show_portrait "DAVID" "neutral";
dialogue "DAVID" "Depends how fast you follow orders.";

show_portrait "ELENA" "smile";
dialogue "ELENA" "Then you'll be fine.";
```

---

## SCENE 4 — DAVID'S SHADOW LINE
```ocaml
show_portrait "DAVID" "neutral";    (* was sc4_david_troubled_expression portrait style; using neutral to avoid new mood *)
vfx "half_shadow_face";
dialogue "DAVID" "Safe. The last person who felt safe around me… didn't make it home.";
```

*Cinematic flashback shots remain unchanged.*

---

## SCENE 5 — VISION OF AGNIVESH & SANTI (NEUTRAL-ONLY FORMS)
```ocaml
show_image "sc5_red_light_manifestation"; ...
show_image "sc0_aurora_lotus_form"; ...

(* Aspect forms → single neutral sprites *)
show_image "agnivesh_panther_neutral";   (* was sc5_agnivesh_panther_form *)
unlock_art "agnivesh_panther_neutral" "Shadow Guardian — Agnivesh as Panther";

show_image "santi_serpent_neutral";      (* was sc5_santi_serpent_form *)
unlock_art "santi_serpent_neutral" "Wisdom Coiled — Santi as Serpent";

(* Optional duo wide removed or keep cinematic; we keep neutral sprites only *)
(* show_image "sc5_agnivesh_santi_together";  <-- removed to enforce single-sprite rule *)
```

Other vision beats (dog tag discovery etc.) remain unchanged.

---

## SCENE 6 — SHORE OPENING / STRANDED BEACH
```ocaml
show_image "trans_beach_fade_in"; ...
show_image "sc6_shore_dawn_wide"; ...
show_image "sc6_group_on_beach_exhausted"; ...

show_portrait "DAVID" "neutral";    (* was david_exhausted_root -> neutral *)
dialogue "DAVID" "(hoarse)" "Everyone breathing?";

show_image "sc6_elena_laughing_coughing";  (* keep cinematic wide for laughter *)
...
show_image "sc6_aurora_lotus_distant"; ...

show_image "sc6_mc_hand_in_sand"; ...
ui "🌺 MANTRA UNLOCKED — \"The Earth does not ask you to be perfect. It only asks you to stay.\"";

show_portrait "ELENA" "neutral";    (* was elena_calm_root -> neutral *)
dialogue "ELENA" "(quiet)" "Then we stay. One breath at a time.";

show_portrait "DAVID" "neutral";    (* was david_determined_root -> neutral/angry; choosing neutral *)
dialogue "DAVID" "And we move when it's time.";
```

---

## STINGER — Rosetta Tag Found (unchanged cinematics)
*(All shots are props/environment; no portrait edits necessary.)*

---

## Sprite Export Checklist (final)
**Humans (9 PNGs)**
- david_neutral_root.png  
- david_smile_root.png  
- david_angry_root.png  
- elena_neutral_root.png  
- elena_smile_root.png  
- elena_angry_root.png  
- mc_neutral_root.png  
- mc_smile_root.png  
- mc_angry_root.png  

**Aspect forms (2 PNGs)**
- agnivesh_panther_neutral.png  
- santi_serpent_neutral.png  

**Note:** Other listed environment/prop/cinematic assets from the original script remain as-is.
