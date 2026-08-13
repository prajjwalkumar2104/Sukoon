# Design Guidelines

## Visual Language
- **Backgrounds**: Immersive, full-screen, high-quality images representing different environments (e.g., Forest, Beach, Urban).
- **Typography**: Clean sans-serif fonts. Large, bold category titles (e.g., 'Forest') overlaying the background. Minimalist labels under icons.
- **Color Palette**: Dark, muted tones that align with the environment (e.g., deep greens for Forest, dark blues for Underwater). Strong contrast with white icons and text.
- **Icons**: Thin, stroke-based line art.
- **Cards**: Solid-color, matte-finish rounded cards (e.g., `bg-[#1b4332]`) housing the sound grid.

## Core UI Components
1.  **Sound Grid (3-Column Layout)**
    - **Inactive State**: Thin white circular border, white line-art icon, white text label.
    - **Active State**: Solid white circle, icon color matches the card background (e.g., dark green), text label is replaced by a horizontal volume slider.
2.  **Bottom Navigation (Two Tiers)**
    - **Top Tier (Controls)**: Timer, Play/Pause (Master toggle), Master Volume. Slightly darker background than the main card.
    - **Bottom Tier (Categories)**: Icons representing different environments (Forest, Beach, City, etc.). The active category is visually highlighted (e.g., white with a subtle indicator line).

## Layout Principles
- Prioritize whitespace and breathing room.
- Ensure text remains readable over complex backgrounds by using subtle gradients or overlays.
- Maintain a static bottom navigation bar while allowing the main content area to scroll if necessary.
