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
        __hasLang() {
            return this.component$.hasOwnProperty('lang');
        },
        __componentLang() {
            return this.__hasLang ? this.component$.lang : Env.Language.default;
        },
        /**
         * @author khalid
         * computed setter and getter model value
         */
        __model: {
            get() {
                return this.formData[this.component$.field] && this.formData[this.component$.field].hasOwnProperty(this.__componentLang) ?
                    this.formData[this.component$.field][this.__componentLang] :
                    ''
            },
            set(val) {
                let value = this.formData[this.component$.field] ?? {}
                // value[this.__componentLang] = val
                this.set(value , this.__componentLang , val)
                this.$set(this.formData, this.component$.field, value)
                FormBuilder.$emit(this.component$.field, val)
                FormBuilder.$emit('fields-all', this.component$.field, val)
            }
        },
    },
    watch: {
        __model: {
            handler: function (newVal, oldVal) {
            }
        }
    }
}
