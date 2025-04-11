import "@app/styles/fonts/Klein/stylesheet.css";
import "@app/styles/main.css";

import App from "@app/App.vue";
import router from "@app/router";
import uiPlugin from "@nuxt/ui/vue-plugin";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";
import { createApp } from "vue";

const app = createApp(App);

app.use(uiPlugin);
app.use(createPinia());
app.use(VueQueryPlugin);
app.use(router);

app.mount("#app");
