// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  pages: true,
  modules: ['vuetify-nuxt-module', '@nuxtjs/i18n', '@pinia/nuxt'],
  i18n: {
    vueI18n: './i18n.config.ts' // if you are using custom path, default
  },
  vuetify: {
    vuetifyOptions: {
      icons: {
        defaultSet: 'mdi',
        sets: ['mdi', 'fa']
      }
    }
  }
})