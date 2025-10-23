# Episodes Directory

This folder organizes content for 9 episodes. Each episode folder (ep1..ep9) contains:

- index.ts — EpisodeConfig (id, title, slug, scenes[])
- scenes/ — scene scripts and data for that episode (optional, future)
- assets/ — episode-specific assets (optional); prefer using `public/` or central asset manifests

Global episode metadata lives in `src/constants/episodes.ts`.

## Conventions
- Scene IDs match the central scene loader for now (e.g., `prologue`, `lotus_birth`).
- As we split episodes, aim for namespaced scenes (e.g., `ep2_shore_intro`).
- Prefer referencing assets via central manifests in `src/assets/*`.
- Add new scenes to the `scenes` array in the episode’s `index.ts` for menus and navigation.

## Roadmap
- `ep1` references existing scenes from the current sceneLoader.
- `ep2`..`ep9` are stubbed and ready to populate.
