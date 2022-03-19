import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ar from './locale/ar'
import en from './locale/en'

Vue.use(VueI18n);

const messages = {
    ar,
    en
}


const i18n = new VueI18n({
    locale: 'en',
    messages
})

export default i18n;
