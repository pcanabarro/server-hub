import { useCallback } from 'react';

export default function ServerInfo({ serverIp }) {
  const handleCopy = useCallback(
    (e) => {
      navigator.clipboard.writeText(serverIp).then(() => {
        e.target.style.color = '#06d6a0';
        setTimeout(() => {
          e.target.style.color = '';
        }, 1000);
      });
    },
    [serverIp]
  );

  return (
    <div className="server-info">
      <div className="server-status" />
      <div className="server-info-text">
        <strong>Server is online</strong> — connect to{' '}
        <span
          className="server-ip"
          onClick={handleCopy}
          title="Click to copy"
          role="button"
          tabIndex={0}
        >
          {serverIp}
        </span>
      </div>
    </div>
  );
}
