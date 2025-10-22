# Audio Assets - Chakra Hearts Episode 1

This folder contains all audio assets organized by category:

## 📁 Folder Structure

### `/bgm/` - Background Music

- `aurora_theme.mp3` - Aurora's character theme
- `combat_theme.mp3` - Action/combat sequences
- `tension_theme.mp3` - Suspenseful moments
- `temple_ambient.mp3` - Ancient temple atmosphere

### `/sfx/` - Sound Effects

- `low_heartbeat.mp3` - Tension/suspense heartbeat
- `stone_crack.mp3` - Stone breaking/collapse sounds

## 🎵 Audio Guidelines

### Technical Specifications

- **Format**: MP3 for web compatibility
- **Sample Rate**: 44.1kHz standard
- **Bit Rate**: 128-320 kbps depending on content
- **Channels**: Stereo for music, mono acceptable for SFX

### File Organization

- **BGM**: Longer tracks (30 seconds - 5 minutes)
- **SFX**: Short audio clips (0.1 - 10 seconds)
- Looping music should have seamless loop points

### Naming Convention

- Use lowercase with underscores
- Descriptive names indicating usage
- Theme music includes character/scene reference
- SFX describes the sound effect

### Usage in Game

- Background music fades between scenes
- Sound effects triggered by game actions
- Volume controls in game settings
- Audio preloading for smooth playback

## 🔄 React Native Compatibility

- MP3 format works across platforms
- Asset paths will need updating for React Native's require system
- Consider using React Native Sound library for advanced audio features
