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
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: '2',
    name: 'Store in Heidelberg',
    imageUrl:
      'https://e0.pxfuel.com/wallpapers/674/159/desktop-wallpaper-night-aesthetic-dekstop-at-street-aesthetic.jpg',
    latitude: 49.40768,
    longitude: 8.69079,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: '3',
    name: 'Store C',
    imageUrl:
      'https://e0.pxfuel.com/wallpapers/847/1017/desktop-wallpaper-in-some-districts-urban-anime-life-live-wall.jpg',
    latitude: 50.7150571,
    longitude: 12.4941442,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: '4',
    name: 'Store D',
    imageUrl:
      'https://images.wallpapersden.com/image/download/night-in-neon-city_bWhmZWyUmZqaraWkpJRmZWdprWpsaw.jpg',
    latitude: 50.7150571,
    longitude: 12.4941442,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];
