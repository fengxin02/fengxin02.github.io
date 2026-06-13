# Personal Portfolio Website

A personal portfolio website built with React and Vite, featuring animated particle backgrounds and interactive typing effects.

>  **Work in Progress** — This project is under active development.

## Features (So Far)

- **Animated Particle Background** — Interactive star-shaped particles with hover repulsion and click-to-spawn effects, powered by [tsParticles](https://particles.js.org/)
- **Typewriter Effect** — Rotating job titles with a live typing animation via [react-simple-typewriter](https://www.npmjs.com/package/react-simple-typewriter)
- **Responsive Design** — Adapts layout and font sizes for mobile and desktop screens
- **Smooth Dark Theme** — Dark slate background with cyan and pink accent colors

## Tech Stack

| Category          | Technology                          |
| ----------------- | ----------------------------------- |
| Framework         | React 19                            |
| Build Tool        | Vite 8                              |
| Particles         | tsParticles v4 (`@tsparticles/slim`)|
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
├── index.html              # Entry HTML
├── package.json            # Dependencies & scripts
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint configuration
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # Main app component (hero section)
    ├── App.css             # Styles for the hero section
    └── index.css           # Global styles (reset)
```

## 📋 TODO / Planned

- [ ] Cursor trail effect
- [x] About Me section
- [ ] New Flower blooming clicking effect
- [ ] Profile icon and show contact information
- [ ] Still Thinking :D 
