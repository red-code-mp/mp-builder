import Settings from '../../utils/builder'
import * as _ from 'lodash'

export default {
    name: 'Base-Mixin',
    props: {
        /**
         * component's object
         * @author Amr
         */
        component: {
            require: true,
            default: function () {
                return {};
            }
        },
        /**
         * builder's values
         * @author Amr
         */
        values: {
            require: false,
            default: function () {
                return {};
            }
        },
        /**
         * @author khalid
         */
        rootField: {
            require: false
        },

        index: {
            required: false
        },
        formData: {
            required: false,
            default: function () {
                return {}
            }
        },
        rowKey: {
            required: false,
            type: String
        },
        indexRow: {
            required: false
        },
        allFormData: {
            required: false,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            /**
             * static classes
             * @author Amr
             */
            classes: Settings.classes,
            /**
             * field's model
             * @author Amr
             */
            model$: null,
            /**
             * field should not has the default classes
             * 'cause it affects on its style
             * @author Amr
             */
            filedHasDefaultClass: Settings.filedHasDefaultClass //['b-form-input'],//['c-select', 'c-check-box', 'c-radio', 'c-date-picker', 'c-text-area']
        }
    },
    computed: {
        classes$() {
            if (this.filedHasDefaultClass.includes(this.component$.component))
                return this.classes;
            return [];
        },
        /**
         * get the passed component
         *
         * @return {default.props.component|{require}}
         * @author Amr
         */
        component$() {
            return this.component;
        },
        /**
         * predicate component's name by using the names
         * of bootstrap components
         *
         * @return {string}
         * @private
         * @author Amr
         */
        __predicatedName() {
            return Settings.customComponents.includes(this.component$.component) ? 'c-' + this.component$.component : 'b-form-' + this.component$.component;
        },
        /**
         * return the real name of component after checking the
         * existence of the predicated name
         * @return {*}
         * @private
         * @author Amr
         */
        __name() {
            let name = this.capitalize(this.__predicatedName, ' ')
            return this.isValidComponent(name) ? this.__predicatedName : this.component$.component;
        },
        /**
         * returns the extra attributes to be binded with field
         * @return {*}
         * @private
         * @author Amr
         */
        __extra() {
            return this.component$.hasOwnProperty('extra') ? this.__prepareParams(this.component$.extra) : {}
        },
        /**
         * return the field of component
         *
         * @return {*}
         * @private
         * @author Amr
         */
        __field() {
            return this.component$.field;
        },
        __hasRules() {
            return this.component$.hasOwnProperty('rules')
        },
        __rules() {
            if (!this.__hasRules)
                return {};
            return this.__prepareParams(this.component$.rules);
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
                FormBuilder.$emit(this.__rowKey, val)
                FormBuilder.$emit('fields-all', this.__rowKey, val)

            }
        },
        /**
         * @author khalid
         * @returns {*}
         * @private
         * assign generated random key for input name in repeater case
         */
        __rowKey() {
            // console.log(this.rowKey ? `${this.__field}--${this.rowKey}` : this.__field)
            return this.rowKey ? `${this.__field}--${this.rowKey}` : this.__field
        }
    },
    methods: {
        /**
         * publish field's data to the component that
         * called builder
         *
         * @param newVal
         * @param oldVal
         * @author Amr
         */
        publish(newVal, oldVal) {
            // FormBuilder.$emit('form-builder', this.__field, newVal)
            // FormBuilder.$emit(this.__rowKey, newVal)
        },
        /**
         * this function returns the extra
         * data that should be pushed with another through Bus
         * @return {{}}
         */
        extra() {
            if (!this.model$)
                return undefined;
            return {};
        },
        /**
         * listen to the changes of values and
         * get the suitable value
         * @param newVal
         * @param oldVal
         * @author Amr
         */
        valuesWatcher(newVal, oldVal) {
            // try {
            //     this.model$ = newVal[this.__field]
            // } catch (e) {
            // }
        },
        /**
         * gets the model new value
         * @author Amr
         */
        modelNewValue(newVal, oldVal) {

        },
        /**
         * publish model's value via FormBuilder Bus
         * @param newVal
         * @param oldVal
         * @author Amr
         */
        model$Watcher(newVal, oldVal) {
            // if (newVal !== oldVal) {
            let event = {
                field: this.__field, newValue: newVal, oldValue: oldVal,
                index: this.indexRow, rowKey: this.rowKey, rootField: this.rootField
            }
            this.$parent.$emit('updateValue', event)
            FormBuilder.$emit('repeater-fields', event)
            // }
        },
        /**
         * this function just for the new component
         * which maybe added later
         *
         * @param data
         * @private
         * @author Amr
         */
        __export(data) {
            this.publish(data, undefined);
        },
        onCreated() {
        }
    },
    created() {
        this.onCreated();
    },
    watch: {
        // deep: true,
        // immediate: true,
        // model$: {
        //     deep: true,
        //     immediate: true,
        //     handler: 'model$Watcher'
        // },
        /**
         * watch model$'s changes
         * @author Amr
         */
        __model: {
            deep: false,
            immediate: true,
            handler: 'model$Watcher'
        },
        /**
         * deep watcher to values attribute's changes
         * @author Amr
         */
        values: {
            deep: true,
            immediate: true,
            handler: 'valuesWatcher'
        }
    },
}
