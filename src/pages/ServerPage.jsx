import { useParams, Navigate } from 'react-router-dom';
import { getServerBySlug } from '../data/servers';
import { getServerIcon } from '../components/ServerIcons';
import DownloadCard from '../components/DownloadCard';
import StatsBar from '../components/StatsBar';
import Instructions from '../components/Instructions';
import ServerInfo from '../components/ServerInfo';
import Footer from '../components/Footer';
import '../styles/ServerPage.css';

export default function ServerPage() {
  const { slug } = useParams();
  const server = getServerBySlug(slug);

  if (!server) {
    return <Navigate to="/" replace />;
  }

  const installerAccent = {
    icon: {
      background: 'linear-gradient(135deg, var(--accent-blue), #1d3557)',
      boxShadow: '0 4px 20px rgba(69, 123, 157, 0.4)',
    },
    button: {
      background: 'linear-gradient(135deg, var(--accent-blue), #1d3557)',
      boxShadow: '0 4px 24px rgba(69, 123, 157, 0.4)',
    },
  };

  const modpackAccent = {
    icon: {
      background: `linear-gradient(135deg, ${server.accentColor}, ${server.accentColorDark})`,
      boxShadow: `0 4px 20px ${server.accentGlow}`,
    },
    button: {
      background: `linear-gradient(135deg, ${server.accentColor}, ${server.accentColorDark})`,
      boxShadow: `0 4px 24px ${server.accentGlow}`,
    },
  };

  return (
    <div className="container server-container">
      {/* Server Icon */}
      <div
        className="server-page-icon"
        style={{
          filter: `drop-shadow(0 0 20px ${server.accentGlow})`,
        }}
      >
        {getServerIcon(server.icon, 'large')}
      </div>

      {/* Header */}
      <div className="header">
        <h1
          style={{
            background: `linear-gradient(135deg, var(--accent-white) 0%, ${server.accentColor} 50%, var(--accent-gold) 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {server.name} Modpack
        </h1>
        <div
          className="version-badge"
          style={{
            color: server.accentColor,
            background: `${server.accentColor}1f`,
            borderColor: `${server.accentColor}33`,
          }}
        >
          Minecraft {server.version} · NeoForge
        </div>
        <p dangerouslySetInnerHTML={{ __html: server.detailDescription }} />
      </div>

      {/* Stats */}
      <StatsBar
        accentColor={server.accentColor}
        stats={[
          { value: server.modCount, label: 'Mods' },
          { value: server.sizeMB, label: 'MB' },
          { value: server.version, label: 'Version' },
        ]}
      />

      {/* Auto-Installer */}
      <h3 className="section-heading" style={{ color: 'var(--accent-gold)' }}>
        Option 1: Windows Auto-Installer (Recommended)
      </h3>
      <DownloadCard
        icon="⚙️"
        title={server.downloads.installer.file}
        meta={['🚀 1-Click Install', `💾 ${server.downloads.installer.sizeLabel}`, '🔄 Auto-Backups']}
        href={server.downloads.installer.href}
        buttonText="Download Auto-Installer"
        buttonIcon="bolt"
        accentStyle={installerAccent}
        note="Download this .bat and double-click it to automatically download and install the modpack."
      />

      {/* Manual Download */}
      <h3
        className="section-heading"
        style={{ color: 'var(--text-muted)', marginTop: '32px' }}
      >
        Option 2: Manual Download
      </h3>
      <DownloadCard
        icon="📦"
        title="mods-client.zip"
        meta={[
          `📁 ${server.modCount} mods`,
          `💾 ${server.downloads.modpack.sizeLabel}`,
          '🔧 NeoForge',
        ]}
        href={server.downloads.modpack.href}
        buttonText="Download Modpack ZIP"
        buttonIcon="download"
        accentStyle={modpackAccent}
      />

      {/* Instructions */}
      <Instructions steps={server.instructions} accentColor={server.accentColor} />

      {/* Server IP */}
      <ServerInfo serverIp={server.serverIp} />

      <Footer>{server.footerText}</Footer>
    </div>
  );
}
