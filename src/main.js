import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import router from "./router";
import ToastService from "primevue/toastservice";
import "primeicons/primeicons.css";
import "./styles/global.scss";

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.use(store);
app.use(router);
app.use(ToastService);
app.mount("#app");
