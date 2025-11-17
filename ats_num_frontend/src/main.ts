import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import './assets/styles.css';
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080';

createApp(App).use(router).mount('#app')
