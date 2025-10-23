# 🎮 Chakra Hearts Episode 1 - Visual Novel

A performance-optimized React TypeScript visual novel with cross-platform architecture.

## ⚡ Key Features

- **🎭 Visual Novel Engine**: Custom dialogue system with character portraits and scene management
- **📱 Cross-Platform Ready**: Designed for both web and React Native deployment
- **⚡ Performance Optimized**: WebP image optimization (83% size reduction)
- **🔧 TypeScript**: Full type safety throughout the codebase
- **💾 Save/Load System**: Persistent game state with multiple save slots
- **🎨 Organized Assets**: Modular asset management system

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── GameEngine.tsx   # Main game engine component
│   ├── DialogueBox.tsx  # Dialogue display component
│   ├── SceneBackground.tsx # Background image component
│   ├── CharacterPortrait.tsx # Character portrait component
│   └── GameMenu.tsx     # Game menu overlay
├── stores/              # Zustand stores
│   └── gameStore.ts     # Main game state store
├── types/               # TypeScript type definitions
│   └── index.ts         # Game and component types
├── utils/               # Utility functions
│   └── sceneLoader.ts   # Scene data loading utilities
├── assets/              # Game assets
│   ├── images/          # Background images and sprites
│   └── audio/           # Sound effects and music
├── App.tsx              # Root App component
└── main.tsx             # Application entry point
```

## 🛠️ Technology Stack

- **React 18**: Modern React with hooks
- **TypeScript**: Static typing for better development experience
- **Zustand**: Lightweight state management
- **Vite**: Fast build tool and development server
- **CSS3**: Custom styling with animations and transitions

## 🚀 Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd chakra-hearts-visual-novel
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint

## 🎯 Game Features

### Visual Novel Engine

- **Dialogue System**: Support for character dialogue, narration, and choice-based interactions
- **Character Portraits**: Dynamic character portrait system with mood states
- **Scene Management**: Background changes and scene transitions
- **Choice System**: Interactive choices that affect karma and romance stats

### Game State Management

- **Persistent Storage**: Game state automatically saved to localStorage
- **Multiple Save Slots**: 10 save slots for different playthroughs
- **Karma System**: Track player choices and their moral implications
- **Romance Stats**: Individual romance tracking for each character
- **Achievement System**: Badges and unlockable content

### Characters

- **DAVID**: Main love interest
- **ELENA**: Supporting character
- **AGNIVESH**: Supporting character
- **SANTI**: Supporting character
- **MC**: Main character (player)

## 🔧 React Native Migration

The codebase is structured for easy React Native migration:

### Component Architecture

- Components use prop interfaces compatible with both React and React Native
- Styling is designed to be easily convertible to React Native StyleSheet
- No web-specific APIs used in core game logic

### State Management

- Zustand works identically in React Native
- All game logic is platform-agnostic
- Asset loading system can be easily adapted

### Migration Steps (Future)

1. Create React Native project using React Native CLI or Expo
2. Copy `src/` folder structure
3. Replace CSS imports with StyleSheet objects
4. Update asset loading for React Native's require system
5. Replace HTML elements with React Native components (View, Text, Image)

## 🎨 Adding Content

### Adding New Scenes

1. Create scene data in `src/utils/sceneLoader.ts`
2. Define dialogue lines with proper typing
3. Add background images to `src/assets/images/`

### Adding Characters

1. Add character ID to `CharacterID` type in `src/types/index.ts`
2. Add character portraits to assets
3. Update character definitions in scene data

### Customizing UI

- Modify component CSS files for styling changes
- Update component props interfaces for new features
- Extend game state in `src/types/index.ts` for new data

## 🐛 Troubleshooting

### Common Issues

**TypeScript Errors**: Run `npm run type-check` to identify type issues
**Build Fails**: Ensure all dependencies are installed with `npm install`
**Assets Not Loading**: Check file paths in asset imports

### Development Tips

- Use VS Code with TypeScript extension for best development experience
- Enable "TypeScript: Strict Mode" for better type checking
- Use the React Developer Tools browser extension for debugging

## 📝 License

This project is for educational/portfolio purposes. All game content and characters are original.

## 🤝 Contributing

This is a portfolio project, but feedback and suggestions are welcome through issues.

---

**Chakra Hearts Episode 1** - A modern visual novel experience built with React and TypeScript.
