import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { zhHans } from 'vuetify/locale'

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        locale: {
            locale: 'zhHans',
            fallback: 'zhHans',
            messages: { zhHans },
        },
    })
    app.vueApp.use(vuetify)
})
