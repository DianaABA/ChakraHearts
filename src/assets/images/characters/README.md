# Character Portraits

Character portrait images for the sprite-reduced visual novel system.

## Current Characters:

- **Elena**: Base portrait (human form)
- **Agnivesh**: Panther form base
- **Santi**: Serpent form base

## Portrait System:

Each character should have multiple mood/expression variants:

- `[character]_base.png` - Default neutral expression
- `[character]_happy.png` - Happy/smiling
- `[character]_angry.png` - Angry/upset
- `[character]_surprised.png` - Surprised/shocked
- `[character]_sad.png` - Sad/concerned

## Specifications:

- Variable height, maintain aspect ratio
- Transparent background (PNG format)
- Consistent scale between characters
- Optimized for overlay display

## Usage:

Portraits are displayed during dialogue sequences using the CharacterPortrait component.
