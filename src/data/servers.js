export const servers = [
  {
    id: 'pixelmon',
    name: 'Pixelmon',
    slug: 'pixelmon-web',
    version: '1.21.1',
    neoforgeVersion: '21.11.42',
    modCount: 42,
    sizeMB: 423,
    accentColor: '#e63946',
    accentColorDark: '#c1121f',
    accentGlow: 'rgba(230, 57, 70, 0.4)',
    icon: 'pokeball',
    emoji: '🔴',
    shortDescription:
      'Catch, train, and battle Pokémon in Minecraft! Includes Pixelmon Reforged and essential client mods.',
    detailDescription:
      'Download the client mods to play on our server.<br>Extract into your mods folder and join!',
    serverIp: 'tbzz.tech',
    downloads: {
      installer: {
        file: 'install-pixelmon.bat',
        href: '/pixelmon-web/install-pixelmon.bat',
        sizeLabel: '3 KB',
      },
      modpack: {
        file: 'mods-client.zip',
        href: 'https://drive.usercontent.google.com/download?id=16zsKngiMCPcxrWTX42JHa_WSnGYWLXIx&export=download&confirm=t',
        sizeLabel: '423 MB',
      },
    },
    instructions: [
      'Install <strong>NeoForge 21.11.42</strong> for Minecraft 1.21.1 from <a href="https://neoforged.net" target="_blank" style="color: var(--accent-blue-light)">neoforged.net</a>',
      'Make sure you have <strong>Java 21</strong> installed',
      'Extract <code>mods-client.zip</code> into your <code>.minecraft/mods/</code> folder (delete old mods first)',
      'Allocate at least <strong>6-8 GB RAM</strong> in your launcher settings',
      'Launch Minecraft with the NeoForge profile and join the server!',
    ],
    footerText: 'Pixelmon 9.3.14 · NeoForge 21.11.42 · Updated March 2026',
  },
  {
    id: 'guerra',
    name: 'Guerra',
    slug: 'guerra',
    version: '1.21.1',
    neoforgeVersion: '21.11.42',
    modCount: 50,
    sizeMB: 170,
    accentColor: '#ff6b35',
    accentColorDark: '#d63c00',
    accentGlow: 'rgba(255, 107, 53, 0.4)',
    icon: 'sword',
    emoji: '⚔️',
    shortDescription:
      'PvP modpack with combat enhancements and warfare mods. Join the battlefield!',
    detailDescription:
      'Download the client mods to play on our PvP server.<br>Extract into your mods folder and join the battle!',
    serverIp: 'tbzz.tech',
    downloads: {
      installer: {
        file: 'install-guerra.bat',
        href: '/guerra/install-guerra.bat',
        sizeLabel: '3 KB',
      },
      modpack: {
        file: 'mods-client.zip',
        href: 'https://drive.usercontent.google.com/download?id=1CZmTdV7OrjEHq6z68Dud1DObjhyVZ_iB&confirm=t',
        sizeLabel: '170 MB',
      },
    },
    instructions: [
      'Install <strong>NeoForge 21.11.42</strong> for Minecraft 1.21.1 from <a href="https://neoforged.net" target="_blank" style="color: var(--accent-blue-light)">neoforged.net</a>',
      'Make sure you have <strong>Java 21</strong> installed',
      'Extract <code>mods-client.zip</code> into your <code>.minecraft/mods/</code> folder (delete old mods first)',
      'Allocate at least <strong>6-8 GB RAM</strong> in your launcher settings',
      'Launch Minecraft with the NeoForge profile and join the server!',
    ],
    footerText: 'Guerra · NeoForge 21.11.42 · Updated April 2026',
  },
];

export function getServerBySlug(slug) {
  return servers.find((s) => s.slug === slug) || null;
}
