export default {
    computed: {
        /**
         * input's model
         * @author Amr
         */
        __input: {
            get() {
                return this.formData[this.input$.field]
            },
            set(val) {
                this.$set(this.formData, this.input$.field, val)
            }
        },
        /**
         * input's options
         * @return {{}|*}
         * @private
         * @author Amr
         */
        __inputAttributes() {
            if (!this.input$.hasOwnProperty('attributes'))
                return {};
            return this.input$.attributes;
        },
        /**
         * the main input field
         * @return {partials.input|{field, rules, attributes}}
         * @author Amr
         */
        input$() {
            return this.field.partials.input;
        },
        /**
         * input's validation rules
         * @return {*|{}}
         * @private
         * @author Amr
         */
        __inputValidationRules() {
            return this.input$.rules ?? {}
        },
        /**
         * the name of model for both (front and back)
         * @return {*}
         * @private
         * @author Amr
         */
        __inputField() {
            return this.input$.field;
        },
    },

}