# Sukoon 🍃

> An immersive, premium ambient soundscape application engineered for deep focus, relaxation, and sleep.

Sukoon goes beyond simple audio playback by combining a robust Web Audio API engine with hardware-accelerated, dynamic CSS visual layers. Whether you are studying for a technical interview, winding down for the night, or just need to block out a noisy environment, Sukoon provides the perfect, customizable auditory dimension.

## ✨ Key Features

* **Immersive Environments:** Seamlessly switch between earthly soundscapes (Beach, Forest, Urban) and theoretical dimensions (The Cosmos).
* **Dynamic Visual Layers:** Real-time, CSS-driven weather and environment effects (parallax raindrop SVGs, rising fire embers, drifting mist, and lightning) that interact with background images via advanced blend modes.
* **Premium Glassmorphism UI:** A sleek, distraction-free interface utilizing deep backdrop blurs, floating navigation, and a dedicated **Zen Mode** (Fullscreen API) for complete immersion.
* **Advanced Audio Mixing:** A responsive 3-column grid allowing users to independently toggle and volume-mix multiple high-fidelity tracks simultaneously.
* **Smart Sleep Timer:** Built-in countdown timer that automatically pauses all audio streams and resets the UI, preventing battery drain.
* **True Mobile Responsiveness:** Engineered using dynamic viewport height (`100dvh`) to guarantee the control dock is always perfectly positioned across all mobile browsers.

## 🛠️ Tech Stack

* **Frontend:** Next.js, React, TypeScript
* **Styling:** Tailwind CSS (Custom keyframe animations & SVG Data URIs)
* **Audio Engine:** Howler.js (Web Audio API)
* **Icons:** Lucide React
* **CI/CD:** GitHub Actions, Vercel

## 🚀 The Mobile Audio Solution

Building seamless audio experiences on mobile browsers (specifically iOS Safari) introduces strict concurrency limits and hardware volume locks.

Sukoon solves this by bypassing standard HTML5 `<audio>` tags. By utilizing **Howler.js** strictly through the Web Audio API, the application:

1. Decodes `.ogg` files directly into device memory, bypassing the 200kb streaming limit that causes playback failures.
2. Manipulates audio via internal `GainNodes`, allowing software-level volume slider control even on locked iOS devices.
3. Permits flawless concurrent playback of heavy, layered sound files.

## 📦 Getting Started

To run this project locally on your machine:

**1. Clone the repository:**

```bash
git clone https://github.com/prajjwalkumar2104/Sukoon.git
cd Sukoon

```

**2. Install dependencies:**

```bash
npm install

```

**3. Run the development server:**

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🗺️ Roadmap

* [ ] **Persistent Mixes:** Database integration to securely save custom audio blends.
* [ ] **Pomodoro Integration:** Expand the sleep timer into a full productivity/focus tracker.
* [ ] **AI Mood Generation:** Utilize LLMs to automatically generate optimal sound mixes based on text prompts.
* [ ] **Collaborative Spaces:** WebSocket synchronization for real-time, shared study rooms.

## 🤝 Author

Designed and developed by **Prajjwal Kumar**.

---
