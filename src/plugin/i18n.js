
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '../locales'
import storage from './storage'

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: storage.get('locale') || 'en', // set locale
  messages, // set locale messages
})

export default i18n
