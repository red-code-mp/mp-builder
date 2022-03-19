import EndPoints from '../../mixins/Builder/endPoints'
import BasicOperations from '../../mixins/Builder/mainOperations'
import Listeners from '../../mixins/Builder/Listeners'
import Redirect from '../../mixins/Builder/redirect'

export default {
    mixins: [EndPoints, BasicOperations, Listeners, Redirect],
    provide() {
        return {
            setOverlay: this.setOverlay,
            resetValidation: this.resetValidation,
            __setValidationObserver: this.__setValidationObserver
        }
    },
    reactiveProvide: {
        name: 'getOverlay',
        include: ['overlay'],
    },
    data() {
        return {
            form$: {},
            fields: [],
            values: {},
            overlay: false,
            validationErrors: [],
            hasAttachment: false,
            preventFetch: false,
            preventActions: false,
            still_update: false,
            validationObserver: null
        }
    },
    methods: {

        onCreated() {
        },

        settings() {
            this.__listeners();
            this.redirectTo = this.predicateRedirectTo();
            this.id = this.$route.params.id;

        },

        setOverlay(show) {
            this.overlay = show
        },
        /**
         * @author khalid
         * @param observer
         * rest validation errors
         */
        resetValidation(observer){
            observer.reset()
        },
        /**
         * @author khalid
         * @param observer
         * @private
         */
        __setValidationObserver(observer){
            this.validationObserver = observer
        }
    },
    watch: {
        fields: {
            deep: true,
            immediate: true,
            handler: function (value) {
                let result = value.find(item => ['image', 'avatar'].includes(item.component))
                if (result)
                    this.hasAttachment = true;
            }
        }
    },

    created() {
        this.settings();
        this.onCreated();
    },
}
