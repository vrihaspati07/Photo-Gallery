# 📸 Modern Photo Gallery

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4.11-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge)](https://github.com/vrihaspati07/Photo-Gallery)

A sleek, modern, high-performance **Photo Gallery** web application built with **React 18**, **Vite**, and **Tailwind CSS**. It fetches high-resolution curated photography from the [Picsum Photos API](https://picsum.photos/), provides real-time author search with instant debounced filtering, and allows users to bookmark favorite photographs with automatic `localStorage` synchronization.

---

## 🌟 Live Demo & Repository

- **GitHub Repository**: [https://github.com/vrihaspati07/Photo-Gallery](https://github.com/vrihaspati07/Photo-Gallery)
- **Author**: [@vrihaspati07](https://github.com/vrihaspati07)

---

## ✨ Features

- **⚡ Real-time Instant Search**: Filter photos instantly by photographer/author name with memoized performance optimization.
- **❤️ Interactive Favourites System**: Save favorite photos with a single tap. Heart animations toggle visually with responsive feedback.
- **💾 Persistent State via LocalStorage**: Favorites persist across browser refreshes with resilient error-handling and lazy state initialization.
- **📱 Fully Responsive Design**: Built mobile-first with an adaptive grid (1 column on mobile, 2 columns on tablets, 4 columns on large desktops).
- **🚀 Performance-Driven Architecture**:
  - Image lazy-loading (`loading="lazy"`) to conserve network bandwidth and speed up initial render.
  - Component memoization (`React.memo`) to eliminate unnecessary re-renders of cards.
  - Stable callback references (`useCallback`) and memoized calculations (`useMemo`).
  - Network request cancellation using native `AbortController` cleanup in React effects.
- **🎨 Premium Visual Aesthetic**:
  - Custom refined color palette (`ink`, `paper`, `muted`, `line`, `sky`, `ember`).
  - Ambient radial background glow accents (`.page-glow`).
  - Clean typography powered by Google's **Manrope** font.
  - Seamless loading spinner and informative error/empty state fallbacks.

---

## 🏗️ Architecture & Component Flow

```mermaid
flowchart TD
    App[App.jsx] --> Gallery[Gallery.jsx]
    Gallery -->|Fetch Data| Hook[useFetchPhotos.js]
    Hook -->|Picsum REST API| API[(Picsum Photos API)]
    Gallery -->|Query State| SearchBar[SearchBar.jsx]
    Gallery -->|Favourites Reducer| Reducer[favouritesReducer.js]
    Reducer <-->|Sync| LocalStorage[(Browser localStorage)]
    Gallery -->|Loading: true| Spinner[Spinner.jsx]
    Gallery -->|Render Photo Grid| Cards[PhotoCard.jsx (Memoized)]
    Cards -->|Toggle Action| Reducer
```

---

## 📂 Project Structure

```plaintext
photo-gallery/
├── public/                 # Static assets
├── src/
│   ├── components/         # Modular React components
│   │   ├── Gallery.jsx     # Core gallery orchestrator, search filter & state
│   │   ├── PhotoCard.jsx   # Memoized photo presentation card with favourite toggle
│   │   ├── SearchBar.jsx   # Search input bar with SVG icon and accessibility attributes
│   │   └── Spinner.jsx     # Minimalist CSS animated spinner for loading state
│   ├── hooks/
│   │   └── useFetchPhotos.js  # Custom hook with fetch lifecycle & AbortController
│   ├── reducers/
│   │   └── favouritesReducer.js # Pure reducer & lazy initializer for favourites
│   ├── App.jsx             # Top-level shell with ambient glow background
│   ├── index.css           # Tailwind base styles, layers & custom gradient utilities
│   └── main.jsx            # React 18 createRoot bootstrap entry point
├── .gitignore              # Git ignore rules for node_modules, dist, etc.
├── index.html              # HTML5 root with Manrope typography preconnects
├── package.json            # Project manifest, scripts, and dependencies
├── postcss.config.js       # PostCSS configuration for Tailwind CSS & Autoprefixer
├── tailwind.config.js      # Tailwind configuration with custom theme tokens
└── vite.config.js          # Vite configuration with React Fast Refresh plugin
```

---

## 💻 Tech Stack & Tools

| Technology | Purpose |
|---|---|
| **[React 18](https://react.dev/)** | Modern component-based UI architecture with Hooks (`useState`, `useEffect`, `useReducer`, `useMemo`, `useCallback`) |
| **[Vite](https://vitejs.dev/)** | Ultra-fast Next Generation frontend build tool and dev server with Hot Module Replacement (HMR) |
| **[Tailwind CSS](https://tailwindcss.com/)** | Utility-first CSS framework for custom responsive styling and color palette management |
| **[Picsum Photos](https://picsum.photos/)** | Reliable REST API supplying random high-resolution photography and metadata |
| **[Manrope](https://fonts.google.com/specimen/Manrope)** | Clean modern geometric sans-serif typography |
| **[Autoprefixer](https://github.com/postcss/autoprefixer)** | PostCSS plugin to parse CSS and add vendor prefixes automatically |

---

## ⚙️ Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Version 18.0 or higher recommended)
- `npm` (comes bundled with Node.js) or `yarn` / `pnpm`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vrihaspati07/Photo-Gallery.git
   cd Photo-Gallery
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to [http://localhost:5173/](http://localhost:5173/) (or the port indicated in your terminal).

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Description |
|---|---|
| `npm run dev` | Runs the app in development mode with Hot Module Replacement (HMR). |
| `npm run build` | Compiles and bundles production-ready assets into the `dist/` directory. |
| `npm run preview` | Locally serves the production build for testing prior to deployment. |

---

## 🧠 State Management Deep Dive

### 1. Custom Hook: `useFetchPhotos`
- Located in `src/hooks/useFetchPhotos.js`.
- Manages `{ photos, loading, error }` state.
- Utilizes `AbortController` to abort in-flight network requests if the component unmounts before response resolution, preventing memory leaks and state updates on unmounted trees.

### 2. State & Persistence: `favouritesReducer`
- Located in `src/reducers/favouritesReducer.js`.
- Implements a pure reducer function handling `'TOGGLE_FAVOURITE'`.
- Uses a **lazy initializer** (`loadFavourites`) passed to `useReducer(favouritesReducer, [], loadFavourites)` so that reading from `localStorage` happens only once on initial mount rather than every re-render.
- Wrapped with a `try/catch` guard for resilient operation even when browser storage is restricted (e.g., private browsing mode or cookies blocked).

---

## 🚀 Deployment

This application can be deployed instantly to modern hosting platforms:

### Vercel / Netlify
1. Connect your GitHub repository to [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).
2. Set Build Command: `npm run build`
3. Set Output Directory: `dist`
4. Deploy!

### GitHub Pages
1. Configure `base: '/Photo-Gallery/'` in `vite.config.js`.
2. Run `npm run build` and deploy the `dist/` directory using GitHub Actions or the `gh-pages` package.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/vrihaspati07/Photo-Gallery/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

**Vrihaspati Chaubey**
- GitHub: [@vrihaspati07](https://github.com/vrihaspati07)
