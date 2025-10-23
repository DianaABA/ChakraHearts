# Z-Index Hierarchy for Chakra Hearts

## Current Z-Index Structure (Fixed):

### Base Layer (1-100)

- **SceneBackground**: `z-index: 1` - Game background images
- **CharacterPortrait**: `z-index: 500` - Character sprites
- **MainMenu**: `z-index: 100` - Main menu base layer

### Game UI Layer (2000-4000)

- **GameHUD**: `z-index: 2500` - Game HUD container
- **Educational Buttons**: `z-index: 2600` - Educational guide buttons container
- **Guide Buttons**: `z-index: 2700` - Individual guide buttons
- **DialogueBox**: `z-index: 3000` - Game dialogue and choices
- **Menu Button**: `z-index: 4000` - In-game menu button

### Modal Layer (8000-9500)

- **Gallery**: `z-index: 8500` - Gallery overlay and content
- **GameMenu**: `z-index: 8000-8100` - In-game pause menu
- **PlayerSettings**: `z-index: 9000` - Settings modal (highest priority)

## Issues Fixed:

1. **MainMenu Settings/Gallery buttons** - Now functional and open proper modals
2. **Scroll overlap** - MainMenu overflow changed from `auto` to `hidden`
3. **DialogueBox visibility** - Raised z-index from 1200 to 3000
4. **Button accessibility** - All UI elements have proper z-index hierarchy
5. **Modal conflicts** - Settings and Gallery modals now properly layer above other UI

## Usage Guidelines:

- **Never use z-index above 9500** without updating this document
- **Keep related elements in same z-index ranges** (e.g., all game UI 2000-4000)
- **Test modal interactions** when adding new overlay components
- **Ensure clickable elements** have higher z-index than background elements
