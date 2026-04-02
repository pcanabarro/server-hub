import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { servers } from '../data/servers';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (!e.target.closest('.navbar')) {
        setMobileOpen(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const isHome = location.pathname === '/';
  const currentSlug = location.pathname.replace(/^\/|\/$/g, '');

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="80" height="80" rx="12" fill="#457b9d" />
          <rect x="25" y="25" width="20" height="20" rx="3" fill="#a8dadc" />
          <rect x="55" y="25" width="20" height="20" rx="3" fill="#a8dadc" />
          <rect x="25" y="55" width="20" height="20" rx="3" fill="#a8dadc" />
          <rect x="55" y="55" width="20" height="20" rx="3" fill="#e63946" />
        </svg>
        <span>Server Hub</span>
      </Link>

      <ul className={`nav-links${mobileOpen ? ' open' : ''}`}>
        <li>
          <Link to="/" className={`nav-link${isHome ? ' active' : ''}`}>
            <span className="nav-icon">🏠</span>
            Home
          </Link>
        </li>
        <li className="nav-dropdown">
          <button className="nav-dropdown-btn">
            <span className="nav-icon">🎮</span>
            Servers
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
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <ul className="nav-dropdown-menu">
            {servers.map((server) => (
              <li key={server.id}>
                <Link
                  to={`/${server.slug}/`}
                  className={`nav-dropdown-item${
                    currentSlug === server.slug ? ' active' : ''
                  }`}
                >
                  <span className="nav-dropdown-icon">{server.emoji}</span>
                  <span className="nav-dropdown-text">
                    <span className="nav-dropdown-name">{server.name}</span>
                    <span className="nav-dropdown-version">
                      {server.version} · NeoForge
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>

      <button
        className="nav-mobile-btn"
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
        onClick={(e) => {
          e.stopPropagation();
          setMobileOpen((prev) => !prev);
        }}
      >
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
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </nav>
  );
}
