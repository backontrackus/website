import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  prefetch: {
    prefetchAll: true,
  },
  redirects: {},
  routes: [
    {
      path: "404*",
      component: "./src/pages/404.astro",
    },
  ],
});
