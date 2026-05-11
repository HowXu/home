import { createApp } from "vue";
import "@/style/style.scss";
import App from "@/App.vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "swiper/css";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.mount("#app");

navigator.serviceWorker.addEventListener("controllerchange", () => {
  ElMessage("站点已更新，刷新后生效");
});