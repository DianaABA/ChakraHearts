# Episode 2 Asset Structure

This document describes where to place Episode 2 assets and how to reference them in code.

## Directory layout

public/
  backgrounds/
    ep2/
      scenes/         # main episode backgrounds
      visions/        # spiritual/vision sequences
      stingers/       # interstitials and endcaps
  characters/
    ep2/              # character poses/variants used in episode 2
  props/
    ep2/              # prop items (close-ups, detail shots)
  audio/
    bgm/
      ep2/            # music for episode 2
    sfx/
      ep2/            # sound effects (optional)

## Naming conventions
- Backgrounds: sc2X_* for scenes, vis2_* for visions, st2_* for stingers
- Characters: CHAR_<NAME>_<POSE>[_<EMO>].png (transparent, 1500–2200px height)
- Props: prop2_<shortname>[_detail|_closeup].png

## Hooking up in code
- Backgrounds: add keys in `src/assets/backgrounds.ts` under a new Episode 2 section, then reference via BACKGROUNDS.
- Characters/props: update `src/assets/characters.ts` and `src/assets/props.ts` as needed.
- Audio: add to `src/assets/audio.ts` and trigger with scene actions.

## Optimization tips
- Prefer WebP for photographic or painted backgrounds when >500KB.
- Run `scripts/optimize-images.js` if you need automated conversion.
- For first-scene backgrounds, consider preloading in GameEngine when `currentScene` matches the Episode 2 opener.
