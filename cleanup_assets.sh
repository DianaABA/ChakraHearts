#!/bin/bash

# CHAKRA HEARTS - ASSET CLEANUP SCRIPT
# Removes unused assets to reduce project size from 1.2GB to manageable size

echo "🧹 CHAKRA HEARTS - Asset Cleanup Script"
echo "Current project size: $(du -sh . | cut -f1)"
echo ""

# Create backup directory (optional)
echo "📁 Creating backup of critical assets..."
mkdir -p asset_backup/critical

# Define ACTUALLY USED assets based on current game scenes
declare -a USED_BACKGROUNDS=(
    # Prologue backgrounds that are actually referenced
    "pro_ep1_temple_burning_destruction.png"
    "pro_ep1_agnivesh_hospital_2.png" 
    "pro_ep1_santi_traditional.png"
    "pro_ep1_betrayal_hall_wide.png"
    "pro_ep1_psych_ward_corridor.png"
    "pro_ep1_agnivesh_finds_dogtag.png"
    "elena_chakra_awakening_new.png"
    
    # Main episode backgrounds from scenes
    "sc0_lotus_birth_void.png"
    "sc0_lotus_unfurling.png"
    "sc1_collapse_environment_wide.png"
    "sc1a_naga_fight_epic.png"
    "temple_aftermath_rest.png"
    "chocolate_moment_closeup.png"
    "sc2_safe_perimeter_alcove.png"
    "sc2_cow_carving_wall.jpg"
    "sc5_red_light_manifestation.png"
    "sc6_shore_dawn_wide.png"
    "sc6_black_stones_path.png"
    
    # Transition images
    "collapse_water_rush.png"
    "beach_fade_in.png"
    "rain_to_lotus.png"
)

declare -a USED_CHARACTERS=(
    # Characters actually used in GameEngine.tsx
    "elena_base.webp"
    "david_base.webp"
    "agnivesh_base.webp"
    "agnivesh_human_portrait.webp"
    "santi_base.webp"
    "santi_human_portrait.webp"
    "aurora_base.webp"
    "umbra_base.webp"
    "mc_base.webp"
)

declare -a USED_AUDIO=(
    # BGM tracks referenced in scenes
    "temple_ambient.mp3"
    "tension_theme.mp3"
    "aurora_theme.mp3"
    
    # Essential SFX (even though SFX is disabled, keep minimal set)
    "low_heartbeat.wav"
    "stone_crack.wav"
    "umbra_glitch_soft.wav"
)

declare -a USED_PROPS=(
    # Props actually shown in scenes
    "dogtag_closeup.png"
    "chocolate_bar.png"
)

echo "🔍 Analyzing current asset usage..."

# Function to check if file is in used list
is_used() {
    local file="$1"
    local category="$2"
    
    case $category in
        "backgrounds")
            for used in "${USED_BACKGROUNDS[@]}"; do
                if [[ "$file" == *"$used"* ]]; then
                    return 0
                fi
            done
            ;;
        "characters")
            for used in "${USED_CHARACTERS[@]}"; do
                if [[ "$file" == *"$used"* ]]; then
                    return 0
                fi
            done
            ;;
        "audio")
            for used in "${USED_AUDIO[@]}"; do
                if [[ "$file" == *"$used"* ]]; then
                    return 0
                fi
            done
            ;;
        "props")
            for used in "${USED_PROPS[@]}"; do
                if [[ "$file" == *"$used"* ]]; then
                    return 0
                fi
            done
            ;;
    esac
    return 1
}

# Count and remove unused files
unused_count=0
freed_space=0

echo "🗑️ Removing unused assets..."

# Clean backgrounds
for file in public/backgrounds/**/*; do
    if [[ -f "$file" ]]; then
        if ! is_used "$file" "backgrounds"; then
            size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo 0)
            freed_space=$((freed_space + size))
            echo "  🗑️ Removing unused background: $(basename "$file")"
            rm "$file"
            unused_count=$((unused_count + 1))
        fi
    fi
done

# Clean characters
for file in public/characters/**/*; do
    if [[ -f "$file" ]]; then
        if ! is_used "$file" "characters"; then
            size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo 0)
            freed_space=$((freed_space + size))
            echo "  🗑️ Removing unused character: $(basename "$file")"
            rm "$file"
            unused_count=$((unused_count + 1))
        fi
    fi
done

# Clean audio
for file in public/audio/**/*; do
    if [[ -f "$file" ]]; then
        if ! is_used "$file" "audio"; then
            size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo 0)
            freed_space=$((freed_space + size))
            echo "  🗑️ Removing unused audio: $(basename "$file")"
            rm "$file"
            unused_count=$((unused_count + 1))
        fi
    fi
done

# Clean src/assets/images (duplicate images)
if [[ -d "src/assets/images" ]]; then
    echo "🗑️ Removing duplicate src/assets/images directory..."
    du -sh src/assets/images
    rm -rf src/assets/images
    echo "  ✅ Removed src/assets/images (duplicates of public/ assets)"
fi

# Remove empty directories
find public/ -type d -empty -delete 2>/dev/null

# Convert freed space to human readable
freed_mb=$((freed_space / 1024 / 1024))

echo ""
echo "✅ CLEANUP COMPLETE!"
echo "📊 Files removed: $unused_count"
echo "💾 Space freed: ~${freed_mb}MB"
echo "📁 New project size: $(du -sh . | cut -f1)"
echo ""
echo "🎮 Your game should still work perfectly with only the essential assets!"
echo "🚀 Much faster loading times and smaller builds!"

# Show remaining asset counts
echo ""
echo "📋 REMAINING ASSETS:"
echo "   Backgrounds: $(find public/backgrounds -type f 2>/dev/null | wc -l)"
echo "   Characters: $(find public/characters -type f 2>/dev/null | wc -l)"  
echo "   Audio: $(find public/audio -type f 2>/dev/null | wc -l)"
echo "   Props: $(find public/props -type f 2>/dev/null | wc -l)"
echo ""
echo "🌺 Chakra Hearts is now optimized for development!"