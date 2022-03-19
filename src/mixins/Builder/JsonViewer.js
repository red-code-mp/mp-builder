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
         * @private
         * input type
         */
        __type() {
            return this.component$.type ?? 'text'
        },
        /**
         * @author khalid
         * computed setter and getter model value
         */
        __model: {
            get() {
                return this.formData[this.component$.field] ?? {};
            },
            set(val) {
                this.$set(this.formData, this.component$.field, val)
                FormBuilder.$emit(this.__rowKey, val)
                FormBuilder.$emit('fields-all', this.__rowKey, val)

            }
        },
    },
    methods: {
        onCreated() {
        }
    },
    watch: {}
}
