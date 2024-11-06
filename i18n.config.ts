import en from './locales/en'
import es from './locales/es'
export default defineI18nConfig(() => ({
    legacy: false,
    locales: [{
        code: 'en',
        name: 'English',
        }, {
        code: 'es',
        name: 'Español',
        }],
    defaultLocale: 'es',
    messages: {
      en,
      es,
    }
  }))
  