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
    data() {
        return {
            uploadedImage$: '',
            attachment: null,
            file: null
        };
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
                if (val instanceof File) {
                    this.$set(this.formData, this.component$.field, val)
                    FormBuilder.$emit(this.component$.field, val)
                    FormBuilder.$emit('fields-all', this.component$.field, val)
                }

            }
        },
        __attachment: {
            get() {
                return this.attachment;
            },
            set(val) {
                this.attachment = `<a href="${val}" target="_blank">Attachment</a>`;
            }
        },

    },
    methods: {},
    watch: {
        __model: {
            handler: function (newVal, oldVal) {

                if (newVal && !(newVal instanceof File)) {
                    this.__attachment = newVal;
                    this.$delete(this.formData, this.component$.field)
                } else if (newVal != undefined)
                    this.attachment = null;
            }
        }
    }
}
