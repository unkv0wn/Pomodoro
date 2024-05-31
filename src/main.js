import { createApp } from "vue";
import "./styles.css";
import App from "./App.vue";

import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config';

import 'primevue/resources/themes/aura-light-green/theme.css'


createApp(App).use(PrimeVue).mount("#app");
