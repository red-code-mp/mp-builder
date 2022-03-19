export default {
    data() {
        return {
            formData$: null,
            fileRequestHeader: {
                'Content-type': 'multipart/form-data'
            }
        }
    },
    computed: {
        hasFiles() {
            let values = Object.values(this.__getForm())
            return values.find(attr => attr instanceof File);
        },
        formKeys() {
            return Object.keys(this.__getForm());
        }
    },
    methods: {
        __getForm() {
            return this.beforeSaveForm(this.form$);
        },
        getFormDataInstance() {
            return new FormData();
        },
        toFormData() {
            this.formData$ = this.getFormDataInstance();
            this.formKeys.forEach(this.walkThroughFormAttributes);
            return this.formData$;
        },
        walkThroughFormAttributes(key, index) {
            let value = this.__getFormValue(key)
            if (!value)
                return;
            if (typeof value === 'object' && !(value instanceof File)) {
                value = JSON.stringify(value)
            } else if (typeof value === 'boolean') {
                value = value & 1;
            }
            this.formData$.append(key, value)
        },
        __getFormValue(key) {
            return this.__getForm()[key]
        }
    }
}