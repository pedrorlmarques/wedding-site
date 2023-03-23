import * as pckg from "./package.json";
import { fileURLToPath, URL } from "url";
import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
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
  plugins: [
    vue(),
    federation({
      name: "login",
      filename: "remoteEntry.js",
      exposes: {
        // layouts
        "./Layout": "./src/layout/Default.vue",

        // views
        "./Login": "./src/views/Login.vue",
        "./Register": "./src/views/Register.vue",
        "./ForgotPassword": "./src/views/ForgotPassword.vue",

        // components
        "./LoginForm": "./src/components/LoginForm.vue",
        "./RegisterForm": "./src/components/RegisterForm.vue",
        "./ForgotPasswordForm": "./src/components/ForgotPasswordForm.vue",
      },
      shared: [
        {
          vue: {
            eager: true,
            singleton: true,
            requiredVersion: pckg.dependencies.vue,
            strictVersion: true,
          },
        },
        "vue-router",
      ],
    }),
    svgLoader(),
  ],
  build: {
    assetsInlineLimit: 40960,
    target: "esnext",
    minify: true,
    cssCodeSplit: false,
    sourcemap: true,
    rollupOptions: {
      output: {
        format: "esm",
        minifyInternalExports: false,
      },
    },
  },
});
