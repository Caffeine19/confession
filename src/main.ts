import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@phosphor-icons/web/regular'
import '@phosphor-icons/web/fill'

import App from './App.vue'
import router from './router'

import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
