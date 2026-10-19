# ✨ Lumi: The Little Star-Weaver · 3D Interactive Portfolio

> An award-winning, cozy 3D interactive portfolio website built for **[haX.baby](https://hax.baby/first-website)**'s 48-Hour Online Hackathon — *"Baby's First Website: Meet the Baby"* (17–19 October 2026).

🌐 **Live Website:** [https://mansi040805-dotcom.github.io/babyshower/](https://mansi040805-dotcom.github.io/babyshower/)  
📦 **GitHub Repository:** [https://github.com/mansi040805-dotcom/babyshower](https://github.com/mansi040805-dotcom/babyshower)  
🏷️ **Track:** Track 2 — Original Character  

---

## 📖 The Character Sheet (Track 2 Canon)

```
┌────────────────────────────────────────────────────────────────────────┐
│  LUMI · THE LITTLE STAR-WEAVER                                         │
├────────────────────────────────────────────────────────────────────────┤
│  1. Name:        Lumi                                                  │
│  2. Species:     Celestial Cloud Starling                              │
│  3. Appearance:  Pearlescent soft cloud body, glowing golden star      │
│                  antenna, warm amber eyes, floating mitten hands,      │
│                  and a lavender constellation scarf.                   │
│  4. Personality: Sleepy, giggly, gentle, easily delighted by dew.      │
│  5. Craft:       Apprentice Starlight Weaver at the Cosmic Cradle.     │
│  6. Tagline:     "I spin the starlight you curl up inside."            │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🌟 Highlights & Features

### 1. 3D WebGL Three.js Interactive World (Tier 3 Boss Level)
- **Procedural 3D Character:** Custom Three.js procedural model with smooth shading, glowing amber eyes that track the cursor in real time, and animated floating mitten hands.
- **Scroll Flight Parallax:** The 3D camera glides through 3 celestial altitudes (Stardust Stratosphere $\rightarrow$ The Orbital Workshop $\rightarrow$ Rooftops) as the visitor scrolls down the page.
- **Interactive 3D Objects with Raycasting:** Clickable 3D Celestial Music Sphere, Dream Lantern with dynamic lighting, and bouncing Meteor Blocks.

### 2. The 3 Showcase Projects (What Lumi Does)
1. **The Celestial Lullaby Synthesizer:** An interactive pentatonic music box keyboard (`C5, D5, E5, G5, A5`) synthesized live using the **Web Audio API**. Includes a one-click *"Play Bedtime Melody"* sequence.
2. **The Starlight Incubator Lantern:** A bedside nightlight with a live warmth intensity slider that alters stardust glow and dynamic CSS drop-shadows.
3. **The Meteor Cradle Blocks:** Clickable alphabet percussion blocks that rattle and play resonant tones when tapped.

### 3. Bedtime Story Scroll (Core Requirement)
- A 3-chapter illustrated bedtime tale told through scroll (*The Seed in the Nebula*, *The Art of Weaving Calm*, *Rooftops of the Quiet World*), strictly kept under 150 words per scene.

### 4. All 5 Early-Web Side Quests (+13 Bonus Points)
- **+3 pts:** Click sound effects with an accessible, persistent **Mute Switch**.
- **+2 pts:** Sparkle cursor trail with 4-point golden and lavender stardust.
- **+2 pts:** Live Dream Guestbook allowing visitors to pick an emoji stamp and pin persistent wishes (saved in `localStorage`).
- **+1 pt:** Vintage retro odometer hit counter tracking starlight spun.
- **+5 pts:** Retro 90s Chaos Mode toggle with marquee banners, GeoCities badges, and bouncy stickers.

### 5. Hidden Easter Egg (Core Requirement)
- Secret star trigger in the corner: click 3 times to trigger a stardust chime chord and a shower of pastel confetti (`canvas-confetti`) with Lumi's secret message.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org) with TypeScript
- **3D Graphics:** [Three.js](https://threejs.org) (WebGL)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) with official haX warm cream (`#fff8f1`) and berry (`#a34063`) palette
- **Icons:** [Lucide React](https://lucide.dev)
- **Audio:** Native browser **Web Audio API** (100% algorithmic synthesis, zero missing asset errors)
- **Confetti:** `canvas-confetti`
- **Deployment:** GitHub Pages via automated GitHub Actions workflow

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/mansi040805-dotcom/babyshower.git

# Navigate to directory
cd babyshower

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the project.

---

## 📜 Credits & License

- Built with love for **[haX.baby](https://hax.baby)**'s *"Baby's First Website"* 2026 Hackathon.
- Organizers: [haX.baby](https://hax.baby) & Sai Ram Dash.
- 100% Original Character & Concept by Lumi Starlight Studio.
