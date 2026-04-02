import { Link } from 'react-router-dom';
import { servers } from '../data/servers';
import { getServerIcon } from '../components/ServerIcons';
import Footer from '../components/Footer';
import '../styles/HomePage.css';

export default function HomePage() {
  return (
    <div className="container home-container">
      {/* Hero */}
      <section className="hero">
        <div className="hero-icon">🎮</div>
        <h1>Server Hub</h1>
        <p>
          Download modpacks and installers for our Minecraft servers. Pick a
          server below to get started!
        </p>
      </section>

      {/* Servers */}
      <section className="servers-section">
        <h2 className="section-title">Available Servers</h2>
        <div className="servers-grid">
          {servers.map((server) => (
            <Link
              key={server.id}
              to={`/${server.slug}/`}
              className={`server-card ${server.id}`}
              style={{ '--card-accent': server.accentColor }}
            >
              <div className="server-card-header">
                <div
                  className="server-icon"
                  style={{
                    background: `linear-gradient(135deg, ${server.accentColor}, ${server.accentColorDark})`,
                    boxShadow: `0 4px 20px ${server.accentGlow}`,
                  }}
                >
                  {getServerIcon(server.icon, 'small')}
                </div>
                <div className="server-card-info">
                  <h2>{server.name}</h2>
                  <div className="version">
                    Minecraft {server.version} · NeoForge
                  </div>
                </div>
              </div>
              <p className="server-card-description">
                {server.shortDescription}
              </p>
              <div className="server-card-meta">
                <span className="meta-item">
                  <span className="icon">📦</span> {server.modCount} mods
                </span>
                <span className="meta-item">
                  <span className="icon">💾</span> {server.sizeMB} MB
                </span>
                <span className="meta-item">
                  <span className="icon">🟢</span> Online
                </span>
              </div>
              <div className="server-card-cta">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}

          {/* Coming Soon Placeholder */}
          <div className="server-card placeholder-card">
            <div className="server-card-header">
              <div className="server-icon placeholder-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div className="server-card-info">
                <h2>Coming Soon</h2>
                <div className="version">New adventures await</div>
              </div>
            </div>
            <p className="server-card-description">
              More modpacks are being crafted! Stay tuned for new servers and
              exciting gameplay experiences.
            </p>
            <div className="server-card-meta">
              <span className="meta-item">
                <span className="icon">🔨</span> In development
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer>
        <p>
          Server Hub ·{' '}
          <a href="https://pcanabarro.dev">pcanabarro.dev</a> · Updated March
          2026
        </p>
      </Footer>
    </div>
  );
}
