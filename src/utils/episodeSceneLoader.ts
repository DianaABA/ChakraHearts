import { getScene as getEP1Scene } from "./sceneLoader";
import type { EpisodeId, Scene } from "../types";

/**
 * Episode-aware scene loader. For Episode 1, delegates to the existing EP1 sceneLoader.
 * For other episodes (2-9), returns a minimal placeholder scene until content is integrated.
 */
export const getSceneForEpisode = async (
  episode: EpisodeId | undefined,
  sceneId: string
): Promise<Scene> => {
  const ep = episode ?? 1;
  if (ep === 1) {
    return getEP1Scene(sceneId);
  }

  // Friendly scene for episodes not yet implemented
  const placeholder: Scene = {
    id: sceneId,
    name: `Episode ${ep} — Coming Soon`,
    background: undefined,
    dialogues: [
      {
        type: "narration",
        text:
          "This path isn't available yet. You'll be returned to the prologue for now.",
      },
      { type: "action", action: { type: "goto_scene", payload: "prologue" } },
    ],
  };
  return placeholder;
};
