// Import images directly for better Vite handling
import davidPortrait from "./images/characters/david_base_portrait.png";
import elenaPortrait from "./images/characters/elena_base_portrait.png";
import agniveshHumanPortrait from "./images/characters/agnivesh_human_portrait.png";
import agniveshPantherPortrait from "./images/characters/agnivesh_panther_base.png";
import santiHumanPortrait from "./images/characters/santi_human_portrait.png";
import santiSerpentPortrait from "./images/characters/santi_serpent_base.png";
import umbraPortrait from "./images/characters/umbra_consciousness_portrait.png";

export const CHARACTERS_IMPORTED = {
  DAVID_BASE: davidPortrait,
  ELENA_BASE: elenaPortrait,
  AGNIVESH_HUMAN: agniveshHumanPortrait,
  AGNIVESH_BASE: agniveshPantherPortrait,
  SANTI_HUMAN: santiHumanPortrait,
  SANTI_BASE: santiSerpentPortrait,
  AURORA_BASE: umbraPortrait,
  UMBRA_BASE: umbraPortrait,
  MC_BASE: elenaPortrait,
} as const;
