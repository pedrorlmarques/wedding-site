import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "@assets",
        replacement: fileURLToPath(new URL("./src/assets", import.meta.url)),
      },
      {
        find: "@components",
        replacement: fileURLToPath(
          new URL("./src/components", import.meta.url)
        ),
      },
      {
        find: "@views",
        replacement: fileURLToPath(new URL("./src/views", import.meta.url)),
      },
      {
        find: "@layout",
        replacement: fileURLToPath(new URL("./src/layout", import.meta.url)),
      },
      {
        find: "@composables",
        replacement: fileURLToPath(
          new URL("./src/composables", import.meta.url)
        ),
      },
      {
        find: "vue",
        replacement: fileURLToPath(
          new URL(
            "./node_modules/vue/dist/vue.runtime.esm-bundler.js",
            import.meta.url
          )
        ),
      },
    ],
    dedupe: ["vue", "vue-router"],
  },
  assetsInclude: ["src/assets"],
  plugins: [vue(), svgLoader()],
});
