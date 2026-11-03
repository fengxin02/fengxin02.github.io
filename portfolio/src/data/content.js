import leagueCover from '../assets/league_of_legends.jpg';
import osuCover from '../assets/osu.png';
import clashCover from '../assets/clash_royale.webp';

// 页面内容都集中在这里，改文字、加项目不用碰组件

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'background', label: 'Background' },
  { id: 'anime', label: 'Anime' },
  { id: 'games', label: 'Games' },
];

// 第一个会以大卡片显示
export const projects = [
  {
    title: 'Otaku Quest',
    description:
      'A full-stack to-do app that plays like an RPG: finish tasks to level up, buy and equip items, and fight boss enemies.',
    tags: ['React', 'TypeScript', 'C#', 'EF Core', 'SQL Server', 'Azure'],
    links: [{ label: 'Live site', url: 'https://otaku-quest-pi.vercel.app/' }],
  },
  {
    title: 'Index-based RAG System',
    description:
      'Answers questions about PDF documents by pairing an inverted-index keyword search with an LLM, and attributes its sources.',
    tags: ['Python', 'LLM', 'OpenAI API'],
    links: [{ label: 'GitHub', url: 'https://github.com/fengxin02/termeszetesnyelv_hazi' }],
  },
  {
    title: 'Recipe Book',
    description:
      'An Android kitchen assistant with recipes from an open API, offline favourites, and a timer that keeps running in the background.',
    tags: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Hilt', 'Room'],
    links: [{ label: 'GitHub', url: 'https://github.com/fengxin02/RecipeApp-Android' }],
  },
  {
    title: 'Fungorium',
    description:
      'A strategy board game built by a team of five, with an MVC desktop app, 200+ pages of technical documentation, and CI on GitHub Actions.',
    tags: ['Java', 'Swing', 'MVC', 'GitHub Actions'],
    links: [{ label: 'GitHub', url: 'https://github.com/BMateHU/Fungorium-ProjLab' }],
  },
  {
    title: 'This website',
    description: 'The page you are looking at, hyacinth included.',
    tags: ['React', 'Vite', 'Framer Motion'],
    links: [{ label: 'GitHub', url: 'https://github.com/fengxin02/fengxin02.github.io' }],
  },
];

export const background = [
  {
    title: 'Education',
    lines: ['Computer Engineering BSc', 'Budapest University of Technology and Economics', '2023 – present'],
  },
  {
    title: 'Languages',
    lines: ['Chinese: native', 'Hungarian: native level', 'English: C1'],
  },
];

// 手动更新就好
export const now = [
  { label: 'Studying', value: 'Computer Engineering at BME' },
  { label: 'Building', value: 'This website' },
  { label: 'Playing', value: 'League of Legends' },
];

export const favouriteTech = ['React', 'Python', 'C#'];
export const otherTech = ['Java', 'Kotlin', 'C / C++', 'SQL', 'JavaScript', 'Vue.js'];

const ANILIST = 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium';

export const anime = [
  { title: 'Citrus', image: `${ANILIST}/bx97832-uMSoHPCn5BnJ.png` },
  { title: 'Grand Blue Dreaming', image: `${ANILIST}/bx100922-uxEhaCsqMMp3.png` },
  { title: 'Bloom into You', image: `${ANILIST}/nx101573-Gql3Q3UX1jcu.jpg` },
  { title: 'This Monster Wants to Eat Me', image: `${ANILIST}/bx183385-f1TgnttLckBT.jpg` },
  { title: 'Happy Sugar Life', image: `${ANILIST}/bx101351-TWLbnRdE1tBI.jpg` },
  { title: 'Maria-sama ga Miteru', image: `${ANILIST}/bx158-8bOVtlzJmq1r.jpg` },
  { title: 'YuruYuri', image: `${ANILIST}/bx10495-FbK4ybSp2DNG.jpg` },
  { title: 'Cosmic Princess Kaguya!', image: `${ANILIST}/bx201903-v43gxQKw8Tc8.jpg` },
  { title: 'Manaria Friends', image: `${ANILIST}/bx21322-c3VbtNvaRi6p.png` },
  { title: '...and more' },
];

const STEAM = 'https://cdn.cloudflare.steamstatic.com/steam/apps';

// note 目前只写了游戏类型，可以换成你自己想说的一句话
// imageStyle 用来单独调整某张图的显示方式
export const games = [
  {
    title: 'League of Legends',
    note: 'MOBA',
    image: leagueCover,
    imageStyle: { objectPosition: 'center top' },
  },
  { title: 'osu!', note: 'Rhythm', image: osuCover },
  { title: 'Muse Dash', note: 'Rhythm', image: `${STEAM}/774171/header.jpg` },
  { title: 'CSGO', note: 'FPS', image: `${STEAM}/730/header.jpg` },
  {
    title: 'Clash Royale',
    note: 'Strategy',
    image: clashCover,
    // 透明背景的 logo：完整显示，不裁切
    imageStyle: { objectFit: 'contain', padding: '10px' },
  },
  { title: 'Stellar Blade', note: 'Action', image: `${STEAM}/3489700/header.jpg` },
  { title: 'Elden Ring', note: 'Action RPG', image: `${STEAM}/1245620/header.jpg` },
  { title: 'Granblue Fantasy: Relink', note: 'Action RPG', image: `${STEAM}/881020/header.jpg` },
];
