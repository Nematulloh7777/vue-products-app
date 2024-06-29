import { createApp } from 'vue'

//vuetify
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'

import router from './router.js'
import {createPinia} from 'pinia'

import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

const vuetify = createVuetify({
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    ssr: true,
    components,
    directives,
  })

app.use(vuetify)

app.use(router)

app.use(pinia)
app.mount('#app')
