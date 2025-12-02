import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import './style.css';
import axios from 'axios'

axios.defaults.baseURL = 'http://172.30.85.186:8080';

createApp(App).use(router).mount('#app')
