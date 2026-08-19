import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { legacyRedirects } from './src/config/legacy-redirects.js';

// https://astro.build/config
export default defineConfig({
  site: 'https://testing.a11y.ing/',
  redirects: legacyRedirects,
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap({
    filter: (page) => {
      const pathname = new URL(page).pathname;
      return !pathname.startsWith('/exercise-fixtures/')
        && !pathname.startsWith('/journey-workspaces/');
    },
  })],
});
