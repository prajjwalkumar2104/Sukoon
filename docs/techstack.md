# Tech Stack

## Frontend Framework
- **Next.js (React)**: Chosen for its robust routing, performance optimizations, and component architecture.
- **TypeScript**: Enforces type safety across sound interfaces, component props, and API integrations to prevent runtime errors.

## Styling & Visuals
- **Tailwind CSS**: Enables rapid, utility-first styling, making it easy to replicate the specific colors, glassmorphism (`backdrop-blur`), and responsive behaviors (e.g., `h-[100dvh]`).
- **Custom CSS / SVG Data URIs**: Used for creating lightweight, hardware-accelerated dynamic weather layers (rain, mist, fire sparks) and applying complex blend modes (`mix-blend-color-dodge`, `mix-blend-screen`).

## Icons
- **Lucide React**: Provides the clean, thin, stroke-based SVG icons essential for the minimalist, premium aesthetic.

## Audio Engine
- **Howler.js (Web Audio API)**: The industry standard for web audio. Explicitly configured to bypass HTML5 audio (`html5: false`) to solve mobile browser concurrency limits, enable smooth looping, and override iOS hardware volume locks.

## State Management
- **React Hooks**: Utilizes `useState` for UI toggles, `useEffect` for timer synchronization, and `useRef` for managing persistent Howler audio instances without triggering unnecessary re-renders.

## CI/CD & Deployment
- **GitHub Actions**: Configured as the Continuous Integration (CI) pipeline to automatically catch ESLint errors and verify production builds on every push to the `main` branch.
- **Vercel**: Seamless integration with Next.js for continuous deployment and global edge network hosting.