import './assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import vuetify_theme from './themes/vuetify_theme'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'vuetify_theme',
    themes: {
      vuetify_theme
    }
  }
})

let app

app = createApp(App)
app.use(router)
app.use(vuetify)
app.mount('#app')
