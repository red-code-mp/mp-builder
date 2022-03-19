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
            imageUrl: null
        };
    },
    computed: {
        __fillImage() {
            return this.uploadedImage$.trim() != '' ? this.uploadedImage$ : (this.imageUrl ?? this.__model)
        },
        component$() {
            return this.field;
        },
        /**
         * @author khalid
         * computed setter and getter model value
         */
        __model: {
            get() {
                return this.imageUrl ?? this.formData[this.component$.field]
            },
            set(val) {
                if (val instanceof File)
                    this.$set(this.formData, this.component$.field, val)
            }
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
        uploadImage(event) {
            let image = event.target.files[0]
            this.__model = image;
            let reader = new FileReader();
            reader.onload = (e) => {
                this.uploadedImage$ = e.target.result;
            }
            reader.readAsDataURL(image);
        },
        showImage(img) {
            if (!this.__fillImage)
                return
            ModalBus.$emit('image-magnifier', this.__fillImage)

        }
    },
    watch: {
        formData: {
            deep: true,
            immediate: true,
            handler(newVal) {
                if(!newVal)
                    return;
                let __value = newVal[this.component$.field]
                if (__value && !(__value instanceof File)) {
                    this.imageUrl = __value;
                    this.$delete(this.formData, this.component$.field)
                }
            }
        }
    }
}
