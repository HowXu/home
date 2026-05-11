import { defineConfig, loadEnv } from "vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { fileURLToPath, URL } from "node:url";
import { VitePWA } from "vite-plugin-pwa";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue"],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /(.*?)\.(js|css|woff2|woff|ttf)/,
            handler: "CacheFirst",
            options: {
              cacheName: "js-css-cache",
            },
          },
          {
            urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/,
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
            },
          },
        ],
      },
      manifest: {
        name: loadEnv(process.env.NODE_ENV, process.cwd()).VITE_SITE_NAME,
        short_name: loadEnv(process.env.NODE_ENV, process.cwd()).VITE_SITE_NAME,
        description: loadEnv(process.env.NODE_ENV, process.cwd()).VITE_SITE_DES,
        display: "standalone",
        start_url: "/",
        theme_color: "#424242",
        background_color: "#424242",
        icons: [
          { src: "/images/icon/48.png", sizes: "48x48", type: "image/png" },
          { src: "/images/icon/72.png", sizes: "72x72", type: "image/png" },
          { src: "/images/icon/96.png", sizes: "96x96", type: "image/png" },
          { src: "/images/icon/128.png", sizes: "128x128", type: "image/png" },
          { src: "/images/icon/144.png", sizes: "144x144", type: "image/png" },
          { src: "/images/icon/192.png", sizes: "192x192", type: "image/png" },
          { src: "/images/icon/512.png", sizes: "512x512", type: "image/png" },
        ],
      },
    }),
    viteCompression(),
  ],
  server: {
    port: "3000",
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
      },
    },
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        pure_funcs: ["console.log"],
      },
    },
  },
});