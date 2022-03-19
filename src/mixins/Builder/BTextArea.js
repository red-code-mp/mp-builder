import Base from './base'

export default {
    mixins: [Base],
    props: {
        field: {
            required: true,
            default: () => {
                return {}
            }
        }
    },
    computed: {
        component$() {
            return this.field;
        },
        /**
         * @author khalid
         * computed setter and getter model value
         */
        __model: {
            get() {
                return this.formData[this.component$.field]
            },
            set(val) {
                this.$set(this.formData, this.component$.field, val)
            }
        },
    },
    methods: {
        onCreated() {
        }
    },
    watch: {
        __model: {
            handler: function (newVal, oldVal) {
            }
        }
    }
}
