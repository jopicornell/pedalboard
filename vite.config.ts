import { defineConfig, loadEnv, type UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }): Promise<UserConfig> => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      vue(),
      VitePWA({
        registerType: "autoUpdate",
        includeManifestIcons: true,
        injectRegister: "auto",
        includeAssets: [
          "favicon.ico",
          "apple-touch-icon-180x180.png",
          "masked-icon-512x512.svg",
        ],
        manifest: {
          name: "Pedalboard Middleware",
          short_name: "Pedalboard",
          description:
            "A pedalboard middleware for connecting midi controllers and DAWs to the Uno2",
          theme_color: "#",
          start_url: "/?standalone=true",
          display: "standalone",
          icons: [
            {
              src: "pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),
    ],
    // prevent vite from obscuring rust errors
    clearScreen: false,

    resolve: {
      alias: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("./front", import.meta.url)),
        },
        {
          find: "@types",
          replacement: fileURLToPath(new URL("./types", import.meta.url)),
        }
      ],
    },
  };
});
