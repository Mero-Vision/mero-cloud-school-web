import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [
      react(),
      svgr({
         svgrOptions: {
            // svgr options
         },
      }),
      VitePWA({
         registerType: "prompt",

         // add this to cache all the imports
         workbox: {
            globPatterns: ["**/*"],
            maximumFileSizeToCacheInBytes: 5000000,
         },
         devOptions: {
            enabled: true,
            type: "module",
         },
         includeAssets: ["**/*"],
         manifest: {
            theme_color: "#36393F",
            background_color: "#36393F",
            display: "standalone",
            scope: "/",
            start_url: "/",
            short_name: "POS",
            description: "POS Demo",
            name: "POS",
            icons: [
               {
                  src: "/logo192.png",
                  type: "image/png",
                  sizes: "192x192",
                  purpose: "any maskable",
               },
               {
                  src: "/logo512.png",
                  type: "image/png",
                  sizes: "512x512",
                  purpose: "any maskable",
               },
               {
                  src: "/logo144.png",
                  type: "image/png",
                  sizes: "144x144",
                  purpose: "any maskable",
               },
            ],
         },
      }),
   ],
});
