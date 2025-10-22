# Image Assets - Chakra Hearts Episode 1

This folder contains all visual assets organized by category:

## 📁 Folder Structure

### `/backgrounds/` - Scene Backgrounds

- `sc0_*` - Scene 0 (Prologue/Opening)
- `sc1_*` - Scene 1 (The Collapse)
- `sc2_*` - Scene 2 (Safe Haven)
- `sc5_*` - Scene 5 (Red Light Manifestation)
- `sc6_*` - Scene 6 (Shore/Dawn sequences)
- `pro_*` - Prologue specific backgrounds
- `stinger_*` - Transition/stinger backgrounds
- `flash_*` - Flashback scenes

### `/characters/` - Character Portraits

- `elena_base_portrait.png` - Elena's main portrait
- `agnivesh_panther_base.png` - Agnivesh in panther form
- `santi_serpent_base.png` - Santi in serpent form

### `/props/` - Interactive Objects

- `prop_bracelet_mud.png` - Muddy bracelet prop
- `prop_chocolate_master.png` - Chocolate master item
- `prop_dogtag_*` - Various dogtag states

### `/ui/` - User Interface Elements

- `ui_choice_*` - Choice button states and karma indicators
- `ui_dialogue_frame.png` - Dialogue box frame
- `ui_main_menu_bg.png` - Main menu background
- `ui_romance_*` - Romance progress indicators
- `ui_chakra_unlock_root.png` - Chakra unlock notification

### `/transitions/` - Scene Transitions

- `trans_beach_fade_in.png` - Beach fade transition
- `trans_collapse_water_rush.png` - Water rush effect
- `trans_dust_settling.png` - Dust settling effect
- `trans_flashback_distortion.png` - Flashback distortion
- `trans_rain_to_lotus.png` - Rain to lotus transition

### `/avatars/` - Player Avatar Options

- `av_binary.png` - Binary avatar
- `av_iron.png` - Iron avatar
- `av_lotus.png` - Lotus avatar
- `av_nomad.png` - Nomad avatar
- `av_ocean.png` - Ocean avatar
- `av_sky.png` - Sky avatar
- `av_stone.png` - Stone avatar

## 🎨 Asset Guidelines

### Image Specifications

- **Backgrounds**: 1920x1080 (16:9 aspect ratio)
- **Characters**: Variable height, maintain aspect ratio
- **UI Elements**: Scalable PNG with transparency
- **Props**: 512x512 or smaller for overlay items

### Naming Convention

- Use lowercase with underscores
- Prefix indicates category (sc, pro, ui, trans, av, prop)
- Descriptive but concise names
- Include variant info (base, closeup, master, etc.)

### File Formats

- **PNG**: For images requiring transparency (UI, characters, props)
- **JPG**: For backgrounds without transparency needs
- **WebP**: Consider for web optimization (future enhancement)

## 🔄 React Native Compatibility

All assets are organized for easy React Native migration:

- Consistent naming prevents import issues
- Folder structure mirrors mobile app conventions
- Asset manifest in `/assets/index.ts` provides typed imports
