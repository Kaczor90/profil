import { defineConfig } from 'astro/config';

// Defaults build the production site for profil-okna.com.pl.
// The GitHub Pages workflow sets SITE_URL and BASE_PATH to publish a preview in a subfolder.
export default defineConfig({
  site: process.env.SITE_URL || 'https://profil-okna.com.pl',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
