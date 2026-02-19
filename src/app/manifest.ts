import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TreonStudio — Creative House from Indonesia',
    short_name: 'TreonStudio',
    description:
      'Crafting digital experiences that matter. Strategy, design, and technology — all under one roof.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
