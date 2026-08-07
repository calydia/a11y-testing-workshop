import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://testing.a11y.ing/',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap(), react(), icon()],
});
