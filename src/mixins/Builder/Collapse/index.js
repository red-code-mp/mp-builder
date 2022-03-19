export default {
    props: {
        field: {
            required: true,
            type: Object
        },
        formData: {
            required: false,
            default: function () {
                return {}
            }
        }
    },
    data() {
        return {}
    },

    computed: {
        __fields() {
            return this.field.fields
        },
        __title() {
            return this.field.title ?? ''
        },
        /**
         * @author khalid
         * @returns {string}
         * generate random key
         */
        __generateRandomKey() {
            return `accordion-${Math.random().toString(36).substring(2, 8)}`
        },

        __formData() {
            if (this.__hasRootField)
                return this.formData[this.__rootField];
            return this.formData
        },

        __hasRootField() {
            return this.field.hasOwnProperty('rootField')
        },

        __rootField(){
            return this.field.rootField
        }
    },

    methods: {},
    created() {
        if (this.__hasRootField)
            this.$set(this.formData, this.__rootField, {})
    }
}
