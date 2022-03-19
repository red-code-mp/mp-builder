import Vue from 'vue'
import toast from '../mixins/toast'

/**
 * toast messages bus
 * @type {Vue | CombinedVueInstance<Vue, object, object, object, Record<never, any>>}
 * @author Amr
 */
window.Toast = new Vue({
    mixins: [toast],
    created() {
        this.$on('danger-message', (text, title) => {
            this.popDefaultToast(text, title, 'danger')
        })
        this.$on('success-message', (text, title) => {
            this.popDefaultToast(text, title, 'success')
        })
        this.$on('info-message', (text, title) => {
            this.popDefaultToast(text, title)
        })
    }
});
