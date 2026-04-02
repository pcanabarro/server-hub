export function PokeballIcon() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="none" stroke="#333" strokeWidth="3" />
      <path d="M2,50 A48,48 0 0,1 98,50 Z" fill="#e63946" />
      <path d="M2,50 A48,48 0 0,0 98,50 Z" fill="#f1faee" />
      <rect x="2" y="47" width="96" height="6" fill="#333" rx="1" />
      <circle cx="50" cy="50" r="14" fill="#333" />
      <circle cx="50" cy="50" r="10" fill="#f1faee" stroke="#333" strokeWidth="3" />
      <circle cx="50" cy="50" r="5" fill="#333" />
    </svg>
  );
}

export function PokeballIconSmall() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="40" fill="none" stroke="#fff" strokeWidth="3" opacity="0.5" />
      <path d="M10,50 A40,40 0 0,1 90,50 Z" fill="rgba(255,255,255,0.3)" />
      <path d="M10,50 A40,40 0 0,0 90,50 Z" fill="#fff" />
      <rect x="10" y="47" width="80" height="6" fill="rgba(0,0,0,0.3)" rx="1" />
      <circle cx="50" cy="50" r="12" fill="rgba(0,0,0,0.3)" />
      <circle cx="50" cy="50" r="8" fill="#fff" stroke="rgba(0,0,0,0.3)" strokeWidth="2" />
    </svg>
  );
}

export function SwordIcon() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,5 55,45 50,50 45,45" fill="#c0c0c0" />
      <polygon points="50,5 55,45 50,50" fill="#a0a0a0" />
      <rect x="35" y="48" width="30" height="8" rx="2" fill="#8b4513" />
      <rect x="46" y="56" width="8" height="25" rx="2" fill="#654321" />
      <circle cx="50" cy="85" r="6" fill="#ff6b35" />
      <circle cx="50" cy="85" r="3" fill="#ffd700" />
    </svg>
  );
}

export function SwordIconSmall() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,10 55,45 50,50 45,45" fill="#fff" />
      <rect x="35" y="48" width="30" height="8" rx="2" fill="rgba(255,255,255,0.7)" />
      <rect x="46" y="56" width="8" height="22" rx="2" fill="rgba(255,255,255,0.5)" />
      <circle cx="50" cy="82" r="5" fill="#ffd700" />
    </svg>
  );
}

// Map icon names to components
const iconMap = {
  pokeball: { large: PokeballIcon, small: PokeballIconSmall },
  sword: { large: SwordIcon, small: SwordIconSmall },
};

export function getServerIcon(iconName, size = 'large') {
  const icons = iconMap[iconName];
  if (!icons) return null;
  const Component = icons[size];
  return <Component />;
}
