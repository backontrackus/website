import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  prefetch: {
    prefetchAll: true,
  },
  redirects: {
    "/apply": "https://forms.gle/j6vYD5Ki6pDzpHod9",
  },
  routes: [
    {
      path: "404*",
      component: "./src/pages/404.astro",
    },
  ],
});
