# Design Guidelines

## Visual Language
- **Backgrounds**: Immersive, full-screen, high-quality images representing different environments (e.g., Forest, Beach, Urban). 
  - *Dynamic Layers*: Backgrounds are enhanced with real-time, CSS-driven visual effects (e.g., parallax SVG raindrops, rising fire sparks, mist, and lightning) that use CSS blend modes (`mix-blend-screen`, `mix-blend-color-dodge`) to interact realistically with the base image.
- **Typography**: Clean sans-serif fonts. Large, bold category titles (e.g., 'Forest') overlaying the background with a sticky, transparent fade mask. Minimalist labels under icons.
- **Color Palette**: Dark, muted tones that align with the environment (e.g., deep greens for Forest, dark blues for Underwater, deep indigo/black for Cosmic). Strong contrast with white icons and text.
- **Icons**: Thin, stroke-based line art.
- **Cards (Glassmorphism)**: Frosted glass panels utilizing heavy backdrop blurs (`backdrop-blur-xl`), translucent theme colors, and subtle white borders (e.g., `border-white/10`) to create a floating, premium feel over the breathing background.

## Core UI Components
1.  **Sticky Category Header**
    - The active category title remains pinned to the top of the scrolling viewport, utilizing a top-down gradient (`bg-gradient-to-b from-black/50 to-transparent`) to ensure text readability as cards scroll underneath it.
2.  **Sound Grid (3-Column Layout)**
    - **Inactive State**: Thin white circular border, white line-art icon, white text label.
    - **Active State**: Solid white glowing circle (`shadow-[0_0_20px_rgba(255,255,255,0.4)]`), icon color dynamically matches the card's theme hex, text label is replaced by a horizontal volume slider.
3.  **Bottom Navigation (Two Tiers)**
    - **Top Tier (Controls)**: Timer, Play/Pause (Master toggle), Master Volume. Slightly darker background than the main card.
    - **Bottom Tier (Categories)**: Icons representing different environments (Forest, Beach, City, Cosmos). The active category is visually highlighted (e.g., white with a subtle indicator dot/line).

## Layout Principles
- **Dynamic Viewport Fit**: Utilizes dynamic viewport height (`h-[100dvh]`) to ensure the bottom navigation dock remains perfectly visible on mobile devices, avoiding mobile browser UI overlap.
- **Visual Hierarchy**: Prioritize whitespace and breathing room. Prevent UI clutter so the ambient background layers remain the focal point.
- **Layered Z-Indexing**: Strict separation of the z-axis: Background image -> Dynamic Weather Layers -> Dark Overlay -> Scrolling UI Content -> Sticky Headers -> Fixed Bottom Navigation.

## Supported Dimensions
- **Earthly Environments**: Grounded, organic aesthetics (Forest, Beach, Countryside).
- **The Cosmos**: Deep space environments utilizing slow-drifting CSS starfields, dark matter aesthetics, and theoretical physics soundscapes.