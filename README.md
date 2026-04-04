# 🎮 Server Hub

A modern Minecraft modpack distribution website for downloading and managing server modpacks. Built with React and Vite, deployed on GitHub Pages.

🌐 **Live Site:** [pcanabarro.dev](https://pcanabarro.dev) | [pcanabarro.github.io/server-hub](https://pcanabarro.github.io/server-hub)

## ✨ Features

- 📦 **Modpack Downloads** — Direct download links for server modpacks via Google Drive
- 🔧 **Batch Installers** — Windows batch scripts for easy installation
- 📋 **Installation Guides** — Step-by-step instructions for each server
- 🎨 **Dynamic Theming** — Each server has its own color scheme and branding
- 📱 **Responsive Design** — Mobile-friendly interface
- ⚡ **Fast & Modern** — React 19 + Vite for optimal performance

## 🖥️ Current Servers

| Server | Description | Minecraft | Mods | Size |
|--------|-------------|-----------|------|------|
| **Pixelmon** | Catch, train, and battle Pokémon | 1.21.1 | 42 | 423 MB |
| **Guerra** | PvP combat and warfare | 1.21.1 | 50 | 170 MB |

## 🛠️ Tech Stack

- **Frontend:** React 19.1.0
- **Routing:** React Router DOM 7.5
- **Build Tool:** Vite 6.3
- **Deployment:** GitHub Pages
- **Styling:** CSS Modules

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/pcanabarro/server-hub.git
cd server-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run deploy` | Deploy to GitHub Pages |

## 📁 Project Structure

```
server-hub/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Background.jsx
│   │   ├── DownloadCard.jsx
│   │   ├── StatsBar.jsx
│   │   ├── Instructions.jsx
│   │   ├── ServerInfo.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── HomePage.jsx     # Server grid
│   │   └── ServerPage.jsx   # Server details
│   ├── data/
│   │   └── servers.js       # Server configuration
│   ├── styles/              # CSS files
│   └── App.jsx              # Main routing
├── public/                  # Static assets & installers
├── vite.config.js
└── package.json
```

## ➕ Adding a New Server

Edit `src/data/servers.js` and add a new server object:

```javascript
{
  id: 'my-server',
  name: 'My Server',
  slug: 'my-server',           // URL slug
  version: '1.21.1',
  neoforgeVersion: '21.11.222',
  modCount: 30,
  sizeMB: 200,
  accentColor: '#3498db',      // Primary color
  accentColorDark: '#2980b9',  // Darker variant
  accentGlow: 'rgba(52, 152, 219, 0.4)',
  icon: 'pickaxe',             // Icon name (see ServerIcons.jsx)
  emoji: '⛏️',
  shortDescription: 'Short description for the home page',
  detailDescription: 'Detailed description for server page',
  serverIp: 'your-server.com',
  downloads: {
    installer: {
      file: 'install-myserver.bat',
      href: '/my-server/install-myserver.bat',
      sizeLabel: '3 KB',
    },
    modpack: {
      file: 'mods-client.zip',
      href: 'https://your-download-link.com',
      sizeLabel: '200 MB',
    },
  },
  instructions: [
    'Step 1...',
    'Step 2...',
  ],
  footerText: 'My Server · NeoForge 21.11.222',
}
```

## 🌐 Deployment

The site auto-deploys to GitHub Pages on push to `main` via GitHub Actions.

**Manual deployment:**
```bash
npm run deploy
```

**Custom domain:** Configure in `CNAME` file and GitHub Pages settings.

## 📄 License

This project is open source. See individual mod licenses for modpack contents.

---

**Server IP:** `tbzz.tech` • **Made with ❤️ for the Minecraft community**
