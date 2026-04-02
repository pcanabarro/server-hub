export default function DownloadCard({
  icon,
  title,
  meta,
  href,
  buttonText,
  buttonIcon = 'download',
  accentStyle,
  note,
}) {
  // Determine if this is a direct download (local file) or external link
  const isLocalFile = href.startsWith('/') && !href.startsWith('//');
  
  return (
    <div className="download-card">
      <div className="file-info">
        <div className="file-icon" style={accentStyle?.icon}>
          {icon}
        </div>
        <div className="file-details">
          <h2>{title}</h2>
          <div className="file-meta">
            {meta.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </div>
      </div>
      <a
        href={href}
        className="download-btn"
        style={accentStyle?.button}
        id={buttonIcon === 'download' ? 'downloadBtn' : undefined}
        download={isLocalFile ? true : undefined}
      >
        {buttonIcon === 'bolt' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        )}
        {buttonText}
      </a>
      {note && (
        <p
          style={{
            marginTop: '16px',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            textAlign: 'center',
          }}
        >
          {note}
        </p>
      )}
    </div>
  );
}
