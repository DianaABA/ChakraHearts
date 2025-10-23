import type { EpisodeConfig } from "../types";
import { EPISODES as EPISODE_CONFIGS } from "../episodes";

export const EPISODES: EpisodeConfig[] = EPISODE_CONFIGS;

export const getEpisodeById = (id: number) => EPISODES.find((e) => e.id === id);
