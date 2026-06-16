# ⚙️ The Clockwork Solstice

<p align="center">
  <img src="./18356978677104904620.jpeg" alt="The Clockwork Solstice Logo" width="400"/>
</p>

<p align="center">
  <a href="https://github.com/AlexKoncept/the-clockwork-solstice/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License MIT"/></a>
  <img src="https://img.shields.io/badge/React-18.x-61DAFB.svg" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6.svg" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF.svg" alt="Vite"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Motion-React-FF0055.svg" alt="Motion React"/>
</p>


An exquisite, highly interactive creative-coding monument bridging the age-old elegance of mechanic horology, watch modding, and digital aesthetics. Crafted by **Alex Koncept**.

---

## 🌸 Passion & Philosophy
Born from a genuine obsession with high-precision mechanical watchmaking, watch modding, and astronomical complications, **The Clockwork Solstice** is designed to translate physical tactile aesthetics into digital animation. It connects the meticulous mathematical flow of gears, escapements, and calibrating springs with real-time browser dynamics and physics equations. It is a sensory celebration of time, astronomy, and digital craftsmanship.

---

## 🌓 Core Dual-Theming Architecture
At the absolute center of this ecosystem lies the **Celestial Globe Selector**, enabling users to instantly cycle between two radically distinct astronomic states:

*   **Winter Solstice (Solstice d'Hiver)**: An elegant, high-contrast dark space. Deep charcoal and rich slate grays paired with vintage amber highlights (`#D4A359`). Captures the quiet composure of cold starry nights, featuring a traditional ticking escapement aesthetic.
*   **Summer Solstice (Solstice d'Été)**: A vibrant, sun-drenched light mode. An ethereal white, rose, and warm sunny gradient background paired with neon pink accents, backing aura glows, and high-energy dynamics, celebrating the absolute peak of solar abundance.

Both levels transition dynamically across the user interfaces via smooth CSS variables and precise Framer Motion triggers.

---

## 🚀 Key Features

### 1. The Interactive Celestial Globe Toggle
*   A premium, custom-drawn 28px split globe element representing the ultimate balance of day and night.
*   **Split Gradient Design**: The circular layout is split perfectly in half—a dark core (`#0B0D0F`) on the left indicating winter nights, and a glowing hot coral/neon pink on the right representing summer afternoons.
*   **Tactile Feedback**: Animates on hover (`hover:scale-110`) and plays physical clank or magical solstice tones via the sound layer on tap. Adjacent text markers dynamically highlight the active state.

### 2. Physical Gear Escapement Visuals
*   Beautiful vector-calculated clock gears rotating endlessly to simulate internal mainspring watch kinetics.
*   Smooth micro-interactions and pulsating pivots representing the watch's mechanical heartbeat.

### 3. Glassmorphic HUD Layout
*   Highly polished, responsive header and detail panels utilising premium glassmorphism effects (`backdrop-blur-xl`), variable translucent borders, custom backing radial light spots, and high-readability typography layouts.

### 4. Audio Synthesis Layer
*   Uses a dedicated high-fidelity Web Audio API engine. Provides crisp mechanical ticks, metallic clanks, and celestial ambient sound waves syncing seamlessly with interface changes and user presses.

### 5. Multi-Lingual Architecture
*   Fully synchronized English and French localisations (`en` / `fr`) mapping technical horological terms with cultural solstice labels across the entire landing console and active simulator views.

---

## 🛠️ Technical Stack

*   **Frontend Library**: [React 18+](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) for type-safe state tracking.
*   **Build Tool**: [Vite](https://vite.dev/) offering instantaneous fast feedback loops.
*   **Styling Engine**: [Tailwind CSS](https://tailwindcss.com/) for fluid responsive grids, custom theme variables, and backing glowing spot effects.
*   **Animation Layer**: [Framer Motion](https://motion.dev/) (imported from `motion/react`) for fluid component transitions.
*   **Sound Synthesis**: Web Audio API customized for physical clock clanks and synthetic ambient resonance.
*   **Icons**: [Lucide React](https://lucide.dev/) for crisp, uniform horology indicators.

---

## 📦 Quick Local Setup

Follow these simple steps to run the simulation locally on your workspace:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation
1.  Clone or download this repository.
2.  Open your terminal inside the project root folder.
3.  Install all required dependencies:
    ```bash
    npm install
    ```

### Development Server
Run the local Vite development server to launch the live interactive preview:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000` (or the port specified in your terminal output) to explore.

### Production Build
To compile the application into standard, optimized, minified static files within the `dist/` directory:
```bash
npm run build
```

---

## 📄 License
This project is licensed under the **MIT License**—see the included [LICENSE](./LICENSE) file for complete details. Developed with love by **Alex Koncept** in 2026.
