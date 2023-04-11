import { createApp } from 'vue';
import './style/style.css';
import router from './router/index.js';
import piniaStore from './store/index.js';
import App from './App.vue';

const app = createApp(App);

app.use(router);
app.use(piniaStore);
app.mount('#app');
