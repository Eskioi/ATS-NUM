import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import './css/styles.css'
import axios from 'axios'
import navbar from './components/navbar/navbar.vue'

axios.defaults.baseURL = 'http://localhost:8080';

createApp(App).use(router).mount('#app')
