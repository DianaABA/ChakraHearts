# Audio Assets - Chakra Hearts Episode 1

# Audio Assets - Chakra Hearts Episode 1

## 📁 Folder Structure

### `/bgm/` - Background Music

- `aurora_theme.mp3` - Aurora's character theme
- `combat_theme.mp3` - Action/combat sequences
- `tension_theme.mp3` - Suspenseful moments
- `temple_ambient.mp3` - Ancient temple atmosphere

### ~~`/sfx/` - Sound Effects~~ **REMOVED**

Sound effects have been removed for a cleaner, BGM-only audio experience that prevents audio conflicts and provides better immersion.

## 🎵 Audio Guidelines

### Technical Specifications

- **Format**: MP3 for web compatibility
- **Sample Rate**: 44.1kHz standard
- **Bit Rate**: 128-320 kbps depending on content
- **Channels**: Stereo for music

### File Organization

- **BGM**: Longer tracks (30 seconds - 5 minutes)
- Background music creates atmosphere and emotional context
- Looping music should have seamless loop points

### Naming Convention

- Use lowercase with underscores
- Descriptive names indicating usage
- Theme music includes character/scene reference

### Usage in Game

- Background music fades between scenes
- BGM-only approach for cleaner audio experience
- Volume controls in game settings
- Audio preloading for smooth playback

## 🔄 React Native Compatibility

- MP3 format works across platforms
- Asset paths will need updating for React Native's require system
- Consider using React Native Sound library for advanced audio features
