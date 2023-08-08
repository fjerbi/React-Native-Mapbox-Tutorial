export interface StoreData {
  id: string;
  name: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
  description: string;
}

export const storesData: readonly StoreData[] = [
  {
    id: '1',
    name: 'Store in Chemnitz',
    imageUrl: 'https://images4.alphacoders.com/869/869425.jpg',
    latitude: 50.833332,
    longitude: 12.916667,
    description: '...',
  },
  {
    id: '2',
    name: 'Store in Heidelberg',
    imageUrl: 'https://e0.pxfuel.com/wallpapers/674/159/desktop-wallpaper-night-aesthetic-dekstop-at-street-aesthetic.jpg',
    latitude: 49.40768,
    longitude: 8.69079,
    description: '...',
  },
  {
    id: '3',
    name: 'Store in Zwickau',
    imageUrl: 'https://e0.pxfuel.com/wallpapers/847/1017/desktop-wallpaper-in-some-districts-urban-anime-life-live-wall.jpg',
    latitude: 50.7150571,
    longitude: 12.4941442,
    description: '...',
  },
  {
    id: '4',
    name: 'Store in Leipzig',
    imageUrl: 'https://images.wallpapersden.com/image/download/night-in-neon-city_bWhmZWyUmZqaraWkpJRmZWdprWpsaw.jpg',
    latitude: 51.3396955,
    longitude: 12.3730747,
    description: '...',
  },
  {
    id: '5',
    name: 'Store in Munich',
    imageUrl: 'https://img.freepik.com/premium-photo/night-city-neon-lights-metropolis-reflection-neon-lights-water-modern-city-with-highrise-buildings-night-street-scene-city-ocean-3d-illustration_129911-3475.jpg',
    latitude: 48.1351253,
    longitude: 11.5819805,
    description: '...',
  },
  // Add more store entries as needed
];
