export default {
    data() {
        return {
            dropDownOptions$: [],
            selectedOption$: {}
        }
    },
    computed: {
        /**
         * dropdown's model
         * @author Amr
         */
        __dropDown: {
            get() {
                return this.formData[this.dropDown$.field]
            },
            set(val) {
                this.$set(this.formData, this.dropDown$.field, val)
            }
        },
        /**
         * dropdown's passed attributes
         * @return {{}|*}
         * @private
         * @author Amr
         */
        __dropDownAttributes() {
            if (!this.dropDown$.hasOwnProperty('attributes'))
                return {};
            return this.dropDown$.attributes;
        },
        /**
         * the main dropdown field
         * @return {partials.dropDown|{field, service, attributes}}
         * @author Amr
         */
        dropDown$() {
            return this.field.partials.dropDown;
        },
        /**
         * dropdown placeholder
         * @return {*}
         * @private
         * @author Amr
         */
        __dropDownPlaceholder() {
            return this.__dropDownAttributes.placeholder
        },
        /**
         * the name of field used for show the text of option
         * @return {*|string}
         * @private
         * @author Amr
         */
        __labelAttribute() {
            return this.__dropDownAttributes.label ?? 'name'
        },
        /**
         * dropdown's validation rules
         * @return {*|{}}
         * @private
         * @author Amr
         */
        __dropDownValidationRules() {
            return this.dropDown$.rules ?? {}
        },
        /**
         * the name of model for both (front and back)
         * @return {*}
         * @private
         * @author Amr
         */
        __dropDownField() {
            return this.dropDown$.field;
        },
        /**
         * check if the dropdown's value is required
         * @return {*}
         * @author Amr
         */
        isRequiredDropDown() {
            return this.__dropDownValidationRules.required;
        },
        /**
         * dropdown's selected option
         * @return {string}
         * @private
         * @author Amr
         */
        __selectedOption() {
            return !this.isEmptyObject(this.selectedOption$) ?
                this.selectedOption$[this.__labelAttribute] :
                `${this.__dropDownPlaceholder} ${this.isRequiredDropDown ? '<span class="text-danger">*</span>' : ''}`
        }
    },
    methods: {
        /**
         * set dropdown's value after finding it from the loaded options
         * @author Amr
         */
        setOptionValue() {
            this.selectedOption$ = this.findOption(this.__dropDown ? this.__dropDown.id : null);
        },
        /**
         * return the option according to the given id
         * @param id
         * @return {null|*}
         * @author Amr
         */
        findOption(id) {
            if (!id)
                return null;
            return this.dropDownOptions$.find(item => item.id == id);
        },
        /**
         * collect both input and select errors in one place
         *
         * @param errors
         * @return {*[]}
         * @author Amr
         */
        customValidationErrors(errors) {
            let __errors = Object.values(errors);
            return [].concat.apply([], __errors)

        },
        /**
         * reset dropdown's value
         * @author Amr
         */
        resetOption() {
            this.selectedOption$ = {};
            this.__dropDown = null;
            this.$refs.dropDownInput.validate(null);
        },

        /**
         * prepare the request's instance
         * @param link
         * @return {*|Promise<unknown>}
         * @private
         * @author Amr
         */
        __optionRequest(link, params = {}) {
            return this.request(link, params);
        },
        /**
         * prepare request's params
         *
         * @param params
         * @return {{select: boolean}|any}
         * @private
         * @author Amr
         */
        __getParams(params = {}) {
            let $params = {
                type: 'select'
            }
            if (params == undefined || params == null)
                return $params;
            return Object.assign($params, params)
        },
        /**
         * returns request's queries
         *
         * @param query
         * @return {*|{}}
         * @private
         * @author ¬Amr
         */
        __getQueries(query) {
            return query ?? {};
        },
        /**
         * prepare request's link
         *
         * @param service
         * @return {*}
         * @private
         * @author Amr
         */
        __prepareLink(service) {
            let params = this.__getParams(service.params)
            let queries = this.__getQueries(service.query)
            return this.route(service.route, queries, params)
        },
        /**
         * load options
         * @param link
         * @author Amr
         */
        fetchDropDownOptions(link) {
            let __link = this.__prepareLink(link);
            this.__optionRequest(__link)
                .then(function ({payload}) {
                    this.dropDownOptions$ = payload;

                }.bind(this))
                .catch((response) => {

                })
        },
        /**
         * chose option be clicking on the supported options
         * @param option
         * @param index
         * @author Amr
         */
        choseOption(option, index) {
            this.selectedOption$ = option;
            this.__dropDown = option;
            this.$refs.dropDownInput.validate(option);

        }
    },
    watch: {
        'dropDown$.service': {
            deep: true,
            immediate: true,
            handler(newVal) {
                this.fetchDropDownOptions(newVal); // load dropdown's options @author Amr
            }
        },
        formData: {
            deep: true,
            immediate: true,
            handler(newVal) {
                this.setOptionValue(); // set the value of dropdown
            }
        }
    }
}