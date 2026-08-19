# Feature Specifications

## Core Features (MVP)
1.  **Multiple Environments**: Support for distinct soundscapes (e.g., Forest, Beach, Urban, Underwater, and The Cosmos), each with a unique background image and color theme.
2.  **Dynamic Visual Layers**: Real-time, CSS-driven visual effects (parallax raindrop SVGs, rising fire embers, drifting mist, lightning flashes, and starfields) that interact with the background using CSS blend modes (`mix-blend-screen`, `mix-blend-color-dodge`).
3.  **Robust Mobile Audio Engine**: Powered by the Web Audio API (Howler.js) to bypass mobile browser concurrency limits and iOS hardware volume locks, ensuring seamless multi-track streaming of large audio files.
4.  **Sound Mixing Grid**: A responsive 3-column grid where users can toggle individual sounds on and off.
5.  **Independent Volume Control**: When a sound is active, a volume slider allows fine-tuning of that specific track.
6.  **Master Playback Controls**:
    - Global Play/Pause button to quickly mute/resume the entire mix.
    - Master volume control slider that proportionally scales all active individual sound tracks.
7.  **Sleep Timer**: Allows users to set a countdown timer for the audio to stop automatically, preventing battery drain.
8.  **Zen Mode**: A toggleable immersive state that hides the UI and enters fullscreen.
9.  **Responsive Layout**: Utilizes dynamic viewport height (`100dvh`) to ensure the bottom navigation dock remains accessible and perfectly scaled across mobile browsers, tablets, and desktops.

## Future Enhancements
- **Persistent User Presets**: Securely save custom audio mixes (e.g., 'Deep Focus Blend') utilizing unique `id` references in a database.
- **Focus & Pomodoro Integrations**: Expand the sleep timer into a full productivity tracker for uninterrupted coding or study sessions.
- **AI-Powered Generative Moods**: Integrate an LLM to automatically generate ideal sound mixes and visual themes based on user text prompts.
- **Real-Time Shared Spaces**: Utilize WebSockets to synchronize audio mixes and timers across multiple users for collaborative study rooms.
- **Continuous Deployment (CD)**: Expand the existing GitHub Actions CI pipeline to trigger automated live deployments.
- **Offline Support (PWA)**: Allow the app to work without an internet connection once assets are cached.