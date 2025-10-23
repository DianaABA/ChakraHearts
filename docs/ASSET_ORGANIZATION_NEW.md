# 📁 CHAKRA HEARTS - ASSET ORGANIZATION

## 🎯 **Overview**

The project assets have been reorganized into a modular, maintainable structure with clear separation of concerns.

## 📂 **New File Structure**

### **Core Asset Files**

```
src/assets/
├── index.ts           # Main export hub (backward compatible)
├── backgrounds.ts     # All background categories
├── characters.ts      # Character portraits & avatars
├── ui.ts             # User interface components
├── props.ts          # Interactive props & effects
└── audio.ts          # Sound & music assets
```

## 🗂️ **Category Organization**

### **🌆 Backgrounds** (`backgrounds.ts`)

- **EPISODE_BACKGROUNDS** - Main story scenes (Scene 0-6)
- **PROLOGUE_BACKGROUNDS** - Flashback & memory scenes
- **EPILOGUE_BACKGROUNDS** - Ending & stinger sequences
- **SPECIAL_BACKGROUNDS** - Effects & transitions

### **👥 Characters** (`characters.ts`)

- **MAIN_CHARACTERS** - David, Elena, MC
- **SPIRITUAL_CHARACTERS** - Agnivesh, Santi, Aurora, Umbra
- **AVATARS** - Player customization options

### **🎨 UI Components** (`ui.ts`)

- **MENU_UI** - Main menu backgrounds
- **DIALOGUE_UI** - Conversation frames
- **CHOICE_UI** - Decision selection styles
- **ROMANCE_UI** - Relationship indicators
- **PROGRESSION_UI** - Chakra unlocks & badges
- **HUD_UI** - Game interface elements
- **NOTIFICATION_UI** - Pop-ups & alerts

### **🎭 Props & Effects** (`props.ts`)

- **PROPS** - Interactive objects (dog tags, chocolate, etc.)
- **TRANSITIONS** - Scene change effects
- **VFX** - Visual effects definitions

### **🎵 Audio** (`audio.ts`)

- **BGM** - Background music tracks
- **SFX** - Sound effects (currently disabled)
- **VOICE** - Voice acting (future expansion)

## 🔗 **Import Usage**

### **Backward Compatible** (existing code works unchanged)

```typescript
import { BACKGROUNDS, PROLOGUE_BACKGROUNDS, CHARACTERS, UI } from "../assets";
```

### **New Organized Imports** (recommended for new code)

```typescript
import {
  EPISODE_BACKGROUNDS,
  EPILOGUE_BACKGROUNDS,
} from "../assets/backgrounds";
import { MAIN_CHARACTERS, SPIRITUAL_CHARACTERS } from "../assets/characters";
import { DIALOGUE_UI, CHOICE_UI, ROMANCE_UI } from "../assets/ui";
```

### **Specific Category Imports**

```typescript
import { MENU_UI, PROGRESSION_UI } from "../assets";
import { VFX, TRANSITIONS } from "../assets";
```

## 📋 **Asset Categories**

### **📸 Scene Backgrounds**

| Category | Scene Range | Examples                       |
| -------- | ----------- | ------------------------------ |
| Episode  | Scene 0-6   | Lotus birth, Naga fight, Shore |
| Prologue | Flashbacks  | Temple burning, Hospital, Rain |
| Epilogue | Endings     | Stinger sequence, Credits      |

### **🎭 Character Types**

| Type      | Purpose       | Examples                |
| --------- | ------------- | ----------------------- |
| Main      | Core party    | David, Elena, MC        |
| Spiritual | Chakra guides | Agnivesh, Santi, Aurora |
| Avatars   | Player choice | Binary, Lotus, Ocean    |

### **🎨 UI Systems**

| System      | Components       | Purpose          |
| ----------- | ---------------- | ---------------- |
| Menu        | Main menu BG     | Navigation       |
| Dialogue    | Frame, bubbles   | Conversations    |
| Choice      | Karma indicators | Player decisions |
| Romance     | Heart meters     | Relationships    |
| Progression | Chakra unlocks   | Character growth |

## 🔧 **Maintenance Benefits**

### **✅ Improved Organization**

- Clear category separation
- Logical file grouping
- Easier asset discovery

### **✅ Better Scalability**

- Add new categories easily
- Expand existing systems
- Modular file structure

### **✅ Development Efficiency**

- Faster asset location
- Reduced import conflicts
- Clear naming conventions

### **✅ Backward Compatibility**

- Existing code unaffected
- Gradual migration possible
- No breaking changes

## 🚀 **Usage Examples**

### **Adding New Episode Backgrounds**

```typescript
// backgrounds.ts - EPISODE_BACKGROUNDS
SCENE_7_NEW_LOCATION: "/backgrounds/sc7_new_location.png",
```

### **Adding New UI Components**

```typescript
// ui.ts - New category
export const INVENTORY_UI = {
  ITEM_SLOT: "/ui/ui_item_slot.png",
  INVENTORY_BG: "/ui/ui_inventory_bg.png",
} as const;
```

### **Adding New Character Forms**

```typescript
// characters.ts - SPIRITUAL_CHARACTERS
AGNIVESH_BATTLE: "/characters/agnivesh_battle_form.png",
```

## 📝 **Migration Guide**

### **Phase 1: Immediate** (✅ Complete)

- New modular files created
- Backward compatibility maintained
- All existing imports work

### **Phase 2: Gradual** (Optional)

- Update imports to new organized structure
- Use specific category imports
- Leverage new organization benefits

### **Phase 3: Future** (Recommended)

- Add new assets using organized structure
- Expand categories as needed
- Maintain clear separation of concerns

---

_This organization provides a solid foundation for the game's continued development while maintaining full backward compatibility with existing code._
