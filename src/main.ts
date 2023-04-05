import { createApp } from "vue";
import { plugin, defaultConfig } from "@formkit/vue";
import Toast, { PluginOptions } from "vue-toastification";
import App from "./App.vue";
import router from "@/router";
import "./main.css";
import "vue-toastification/dist/index.css";

const options: PluginOptions = {
  timeout: 2000,
};

const app = createApp(App);

app.use(Toast, options);
app.use(router);
app.use(plugin, defaultConfig);
app.mount("#app");
