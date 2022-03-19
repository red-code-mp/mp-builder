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
        /**
         * @author khalid
         * computed setter and getter model value
         */
        __model: {
            get() {
                return this.formData[this.component$.field] ?? []
            },
            set(val) {
                FormBuilder.$emit(this.__rowKey, val)
                FormBuilder.$emit('fields-all', this.__rowKey, val)
                this.$set(this.formData, this.component$.field, val)
            }
        },
        component$() {
            return this.field;
        },
        /**
         * @author khalid
         * @private
         * input type
         */
        __type() {
            return this.component$.type ?? 'text'
        }
    },
    methods: {
        onCreated() {
        }
    },
    watch: {
        __model: {
            handler: function (newVal, oldVal) {}
        }
    }
}
