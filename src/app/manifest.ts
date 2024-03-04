import { MetadataRoute } from 'next';
import icon from './icon.svg';

const manifest = (): MetadataRoute.Manifest => ({
  name: '信带课表',
  short_name: '信带课表',
  description: '信带课表',
  start_url: '/',
  display: 'standalone',
  background_color: '#f7f7f7',
  theme_color: '#f7f7f7',
  icons: [{ src: icon.src, sizes: '256x256', type: 'image/svg+xml', purpose: 'any' }],
});

export default manifest;
