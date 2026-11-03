# Personal Portfolio Website

A personal portfolio website built with React and Vite, featuring a blooming hyacinth opening and quiet falling petals.

>  **Work in Progress** — This project is under active development.

## Features (So Far)

- **Hyacinth Opening** — A hyacinth grows and blooms at the top of the first screen, then its petals fall across the page. Plays once per tab, can be skipped with a click or key press, and is off for visitors who prefer reduced motion. Click the flower to replay it. Built with [Framer Motion](https://www.framer.com/motion/)
- **Sticky Hyacinth Rail** — On desktop, scrolling moves the flower and name into a fixed left column with section navigation
- **Projects, Background, and "Right now"** — Content lives in `src/data/content.js`
- **Anime and Game Walls** — Most cover images load from AniList and Steam, and fall back to a title tile if they fail
- **Animated Particle Background** — A few soft falling petals, powered by [tsParticles](https://particles.js.org/)
- **Falling Petal Cursor** — Moving the mouse occasionally drops a petal, drawn on a canvas
- **Click Bloom Effect** — Click anywhere to open a small flower, driven by [anime.js v4](https://animejs.com/)
- **3D Flip Easter Egg** — Click the *** to flip the entire panel and reveal hidden content, using CSS 3D transforms
- **Rotating Subtitle** — Titles cross-fade in place so the line never shifts sideways
- **Scroll Animations** — Bento grid cards animate in with spring physics on scroll via [Framer Motion](https://www.framer.com/motion/)
- **Responsive Design** — Adapts layout and font sizes for mobile and desktop screens
- **Hyacinth Theme** — Light lavender background with soft white cards and purple accent colors

## Tech Stack

| Category          | Technology                          |
| ----------------- | ----------------------------------- |
| Framework         | React 19                            |
| Build Tool        | Vite 8                              |
| Particles         | tsParticles v4 (`@tsparticles/slim`)|
| Click Bloom       | anime.js v4                         |
| Page Animations   | Framer Motion                       |
| Heading Font      | Noto Serif SC (`@fontsource`)       |

##  Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (ships with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/fengxin02/fengxin02.github.io.git
cd fengxin02.github.io/portfolio

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open the URL shown in the terminal to see the site.

### Production Build

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

## Project Structure

```
portfolio/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── public/
│   ├── fengxinicon.jpg
│   └── petal.svg
└── src/
    ├── main.jsx                  # React entry point
    ├── index.css                 # Global reset
    ├── App.jsx                   # Root component
    ├── App.css                   # App-level styles (reserved)
    ├── data/
    │   └── content.js            # Projects, background, anime, and games
    ├── hooks/
    │   ├── useParticles.js       # tsParticles init logic
    │   ├── useIntro.js           # Opening playback state
    │   ├── useHeroRail.js        # Moves the flower to the left column on scroll
    │   ├── useActiveSection.js   # Highlights the current section in the nav
    │   ├── usePetalTrail.js      # Falling petals on mouse move
    │   └── useClickBloom.js      # Click bloom effect logic
    └── components/
        ├── Hero/
        │   ├── Hero.jsx          # Landing section
        │   ├── HeroRail.jsx      # Tagline and section nav under the flower
        │   ├── Hyacinth.jsx      # Hyacinth illustration and bloom animation
        │   ├── PetalBurst.jsx    # Petals that fall after the bloom
        │   ├── RotatingWord.jsx  # Cross-fading subtitle
        │   └── Hero.css
        ├── Section/
        │   └── Section.jsx       # Section title and fade-in
        ├── Projects/
        │   ├── Projects.jsx      # Project cards
        │   └── Projects.css
        ├── Background/
        │   ├── Background.jsx    # Education and languages
        │   └── Background.css
        ├── MediaWall/
        │   ├── MediaWall.jsx     # Anime poster and game cover walls
        │   └── MediaWall.css
        ├── About/
        │   ├── About.jsx         # Bento grid + 3D flip
        │   └── About.css
        └── ContactModal/
            ├── ContactModal.jsx  # Contact popup
            └── ContactModal.css
```

## 📋 TODO / Planned

- [x] Cursor trail effect
- [x] Mouse cursor customize
- [x] About Me section
- [x] New Flower blooming clicking effect
- [x] Profile icon and show contact information
- [ ] 3D live character add into website
- [ ] Still Thinking :D 
