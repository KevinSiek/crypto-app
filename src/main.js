import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import axios from 'axios'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

axios.defaults.baseURL = 'https://cryoto-app.netlify.app/'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
