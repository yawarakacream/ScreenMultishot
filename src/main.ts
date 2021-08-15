import { createApp } from "vue";
import App from "./window/App.vue";
import router from "./window/router";

createApp(App).use(router).mount("#app");
