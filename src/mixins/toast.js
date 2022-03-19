import i18n from '../lang/i18n'

export default {
    data() {
        return {
            count: 0
        }
    },
    methods: {
        popDefaultToast(text, title, variant = 'info') {
            title = i18n.t(title)
            this.$bvToast.toast(text, {
                title: title,
                variant: variant,
                solid: true,
                toaster: 'b-toaster-bottom-' + (this.vuex_defaultLanguage.is_rtl ? 'left' : 'right'),
            })
        }
    }
}
