export default {
    data() {
        return {
            rowKey: null
        }
    },
    props: {
        field: {
            require: true,
            default: function () {
                return {};
            }
        },

        values: {
            require: false,
            default: function () {
                return {};
            }
        },
        formData: {
            required: false,
            default: function () {
                return {};
            }
        },
    },
    methods: {
        /**
         * @author khalid
         * @param field
         * @returns {*}
         * @private
         */
        _hasCols(field) {
            return field.cols ?? 'auto'
        },
        /**
         * @author khalid
         * @param index
         */
        addNewRecord(index = null) {
            this.formData[this.__rootField].push({})
            // this.formData[this.__rootField].splice(index+1, 0, {});
        },
        /**
         * @author khalid
         * @param index
         */
        dropRecord(index) {
            this.formData[this.__rootField].splice(index, 1)
        },
        __rules(field) {
            if (!field.hasOwnProperty('rules'))
                return {};
            return field.rules;
        },
        /**
         * @author khalid
         * @param newVal
         * @param oldVal
         * assign new array to repeater field property if it does not exists in form
         */
        formDataWatcher(newVal, oldVal) {
            if ((!this.formData[this.__rootField] || this.formData[this.__rootField].length === 0) && !this.__checkRemoval)
                this.$set(this.formData, this.__rootField, [{}])
        },

        /**
         * @author khalid
         * @returns {string}
         * generate random key
         */
        generateRandomKey() {
            return Math.random().toString(36).substring(2, 8)
        },
        __remove_for_all(index){
            if(this.__config.hasOwnProperty('remove_for_all'))
                return this.__config.remove_for_all
            if (index !== 0)
                return true
        },
        __label(label, index) {
            return this.$t(label) + (this.isRequired(this.__fields[index]) ? ' <span class="text-danger">*</span>' : '');
        },
        isRequired(field) {
            return field.hasOwnProperty('rules') ?
                (field.rules.hasOwnProperty('required') && field.rules.required === true) : false;
        },

    },
    created() {
        this.rowKey = this.generateRandomKey()
        if (this.__checkRemoval)
            this.$set(this.formData, this.__rootField, [{}])
    },
    computed: {
        /**
         * @author khalid
         * @returns {*}
         * @private
         * get repeater components
         */
        __fields() {
            return this.field.fields;
        },
        /**
         * @author khalid
         * @returns {*}
         * @private
         * get repeater field
         */
        __rootField() {
            return this.field.field
        },

        __config() {
            return this.field.config ?? {}
        },

        __show_plus_button() {
            return this.__config.hasOwnProperty('show_plus_button') ? (typeof this.__config.show_plus_button == "function" ?
            this.__config.show_plus_button.call(this) : this.__config.show_plus_button) : true
        },
        __show_remove_button(){
            return this.__config.hasOwnProperty('show_remove_button') ? (typeof this.__config.show_remove_button == "function" ?
                this.__config.show_remove_button.call(this) : this.__config.show_remove_button) : true
        },
        __checkRemoval(){
            if(this.__config.hasOwnProperty('remove_for_all'))
                return this.__config.remove_for_all
            return false
        }
    },
    watch: {
        formData: {
            handler: 'formDataWatcher',
            deep: true,
            immediate: true
        }
    },
}
