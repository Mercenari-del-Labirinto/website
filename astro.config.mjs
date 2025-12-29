// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://mercenari.org",
  integrations: [mdx(), sitemap()],
  redirects: {
    "/blog/musica-e-rievocazione": "/blog/2025/musica-e-rievocazione",
  },
});
