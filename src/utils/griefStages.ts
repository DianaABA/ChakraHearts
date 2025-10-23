/**
 * Kübler-Ross Seven Stages of Grief System
 * For Agnivesh's journey processing Marcus's death
 */

export interface GriefStage {
  id: string;
  name: string;
  description: string;
  agnivestDemonstration: string;
  chakraConnection: string;
  storyRevelation: string;
}

export const GRIEF_STAGES: GriefStage[] = [
  {
    id: "shock",
    name: "Shock",
    description: "Initial numbness and disbelief when confronted with loss",
    agnivestDemonstration:
      "Staring at the dog tag in stunned silence, unable to process",
    chakraConnection: "Root Chakra - Survival mechanism kicks in",
    storyRevelation: "Marcus's dog tag is discovered in the ruins",
  },
  {
    id: "denial",
    name: "Denial",
    description: "Refusing to accept the reality of the loss",
    agnivestDemonstration:
      "Insisting the tag can't be Marcus's, creating alternative explanations",
    chakraConnection: "Root Chakra - Clinging to false security",
    storyRevelation:
      "Agnivesh reveals Marcus is his twin brother, supposedly safe in Europe",
  },
  {
    id: "anger",
    name: "Anger",
    description: "Rage at the situation, others, oneself, or the deceased",
    agnivestDemonstration:
      "Fury at the military, at David, at Marcus for being there",
    chakraConnection: "Solar Plexus Chakra - Raw emotional fire",
    storyRevelation:
      "Learning Marcus and David were in the same unit, anger at the betrayal",
  },
  {
    id: "bargaining",
    name: "Bargaining",
    description: "Attempting to negotiate or make deals to undo the loss",
    agnivestDemonstration:
      "Desperate prayers, wishing he could trade places with Marcus",
    chakraConnection: "Throat Chakra - Desperate communication with the divine",
    storyRevelation: "Agnivesh learns they were ordered to fight each other",
  },
  {
    id: "depression",
    name: "Depression",
    description: "Deep sadness and withdrawal as reality sets in",
    agnivestDemonstration:
      "Profound grief, isolating from the group, questioning everything",
    chakraConnection: "Heart Chakra - Deep sorrow and closed heart",
    storyRevelation:
      "David reveals Marcus showed him mercy in their final confrontation",
  },
  {
    id: "testing",
    name: "Testing",
    description: "Searching for realistic solutions and meaning",
    agnivestDemonstration:
      "Trying to understand why Marcus made his choices, seeking patterns",
    chakraConnection: "Third Eye Chakra - Seeking understanding and wisdom",
    storyRevelation: "David explains he followed orders despite Marcus's mercy",
  },
  {
    id: "acceptance",
    name: "Acceptance",
    description: "Coming to terms with the loss and finding peace",
    agnivestDemonstration:
      "Understanding Marcus's sacrifice, forgiving David, honoring memory",
    chakraConnection: "Crown Chakra - Spiritual transcendence of grief",
    storyRevelation:
      "Agnivesh and David achieve forgiveness and mutual understanding",
  },
];

/**
 * The Marcus-David Backstory Arc
 * Revealed gradually through Agnivesh's grief stages
 */
export const MARCUS_DAVID_STORY = {
  setup: {
    stage: "shock",
    revelation:
      "Marcus Reyes was Agnivesh's twin brother, believed to be safely stationed in Europe",
  },
  conflict: {
    stage: "anger",
    revelation:
      "Marcus and David were reassigned to the same combat zone without notice",
  },
  betrayal: {
    stage: "bargaining",
    revelation:
      "Orders changed - brothers-in-arms became enemies through military politics",
  },
  tragedy: {
    stage: "depression",
    revelation:
      "In their final confrontation, Marcus showed David mercy, choosing love over duty",
  },
  choice: {
    stage: "testing",
    revelation:
      "David, bound by orders and conditioning, could not reciprocate the mercy",
  },
  resolution: {
    stage: "acceptance",
    revelation:
      "Both were victims of a system that turns brothers into enemies",
  },
};

/**
 * Grief Stage Progression System
 */
export class GriefStageManager {
  private currentStage: number = 0;
  private stageFlags: Record<string, boolean> = {};

  getCurrentStage(): GriefStage {
    return GRIEF_STAGES[this.currentStage];
  }

  getNextStage(): GriefStage | null {
    return this.currentStage < GRIEF_STAGES.length - 1
      ? GRIEF_STAGES[this.currentStage + 1]
      : null;
  }

  progressToNextStage(): boolean {
    if (this.currentStage < GRIEF_STAGES.length - 1) {
      this.stageFlags[GRIEF_STAGES[this.currentStage].id] = true;
      this.currentStage++;
      return true;
    }
    return false;
  }

  hasCompletedStage(stageId: string): boolean {
    return this.stageFlags[stageId] || false;
  }

  getCompletionPercentage(): number {
    return (this.currentStage / GRIEF_STAGES.length) * 100;
  }

  isGriefJourneyComplete(): boolean {
    return (
      this.currentStage >= GRIEF_STAGES.length - 1 &&
      this.stageFlags[GRIEF_STAGES[this.currentStage].id]
    );
  }
}

/**
 * Chakra connections for each grief stage
 */
export const GRIEF_CHAKRA_CONNECTIONS = {
  shock: "root",
  denial: "root",
  anger: "solar_plexus",
  bargaining: "throat",
  depression: "heart",
  testing: "third_eye",
  acceptance: "crown",
} as const;

export default GRIEF_STAGES;
