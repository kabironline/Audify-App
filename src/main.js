import './assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

let app

app = createApp(App)
app.use(router)
app.mount('#app')
