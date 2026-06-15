# Personal Portfolio Website

A personal portfolio website built with React and Vite, featuring animated particle backgrounds and interactive typing effects.

>  **Work in Progress** — This project is under active development.

## Features (So Far)

- **Animated Particle Background** — Interactive sakura petal particles with hover repulsion, powered by [tsParticles](https://particles.js.org/)
- **Click Ripple Effect** — Click anywhere to spawn three expanding glass rings with staggered delays, driven by [anime.js v4](https://animejs.com/)
- **3D Flip Easter Egg** — Click the *** to flip the entire panel and reveal hidden content, using CSS 3D transforms
- **Typewriter Effect** — Rotating titles with a live typing animation via [react-simple-typewriter](https://www.npmjs.com/package/react-simple-typewriter)
- **Scroll Animations** — Bento grid cards animate in with spring physics on scroll via [Framer Motion](https://www.framer.com/motion/)
- **Responsive Design** — Adapts layout and font sizes for mobile and desktop screens
- **Sakura Glass Theme** — Light lavender background with frosted white glass panels and pink-purple accent colors

## Tech Stack

| Category          | Technology                          |
| ----------------- | ----------------------------------- |
| Framework         | React 19                            |
| Build Tool        | Vite 8                              |
| Particles         | tsParticles v4 (`@tsparticles/slim`)|
| Click Ripple      | anime.js v4                         |
| Page Animations   | Framer Motion                       |
| Typing Animation  | react-simple-typewriter             |

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
│   └── sakura.svg
└── src/
    ├── main.jsx                  # React entry point
    ├── index.css                 # Global reset
    ├── App.jsx                   # Root component
    ├── App.css                   # App-level styles (reserved)
    ├── hooks/
    │   ├── useParticles.js       # tsParticles init logic
    │   └── useRipple.js          # Click ripple effect logic
    └── components/
        ├── Hero/
        │   ├── Hero.jsx          # Landing section
        │   └── Hero.css
        ├── About/
        │   ├── About.jsx         # Bento grid + 3D flip
        │   └── About.css
        └── ContactModal/
            ├── ContactModal.jsx  # Contact popup
            └── ContactModal.css
```

## 📋 TODO / Planned

- [ ] Cursor trail effect
- [ ] Mouse cursor customize
- [x] About Me section
- [ ] New Flower blooming clicking effect
- [x] Profile icon and show contact information
- [ ] Still Thinking :D 
