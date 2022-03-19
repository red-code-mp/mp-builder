import Base from '../../mixins/Builder/base'
import ModelWatcher from './ModelWatcher'


export default {
    mixins: [Base, ModelWatcher],
    props: {
        /**
         * field from the Base mixin
         * @author Amr
         */
        field: {
            required: true,
            default: () => {
                return {}
            }
        },
    },
    data() {
        return {
            chosenLanguages: [],
            fields: [],
            model$: {}
        }
    },
    computed: {
        /**
         * get the passed component
         *
         * @return {default.props.component|{require}}
         * @author Amr
         */
        component$() {
            return this.field;
        },
        /**
         * changing the computed attribute
         * @author Amr
         */
        __model: {
            get() {
                return this.formData[this.component$.field]
            },
            set(val) {
                this.set(this.formData, this.component$.field,val)
            }
        }
    },
    methods: {
        /**
         * build the published value
         *
         * @param code
         * @param value
         * @author Amr
         */
        fieldValue(code, value) {
            let newModel = Object.assign({}, !this.__model ? {} : this.__model) // change the reference to wake water's movement @author Amr
            this.set(newModel, code, value)
            this.__model = newModel;
        },
        /**
         * returns the language according to the given index
         * @param index
         * @return {*}
         * @private
         * @author Amr
         */
        __getLanguages(index) {
            try {
                return this.vuex_languages[index];
            } catch (exception) {
                throw new Error('language not found');
            }
        },
        /**
         * add the chosen languages to the
         * fields and chosenLanguages array
         * @param defaultLanguages
         * @private
         * @author Amr
         */
        __pushField(defaultLanguages) {
            this.chosenLanguages.push(defaultLanguages);
            this.fields.push(defaultLanguages)
        },
        /**
         * add new input
         * @author Amr
         */
        addInput() {
            if (this.fields.length >= this.vuex_languages.length)
                return;
            let inputLanguage = _.difference(this.vuex_languages, this.chosenLanguages);
            this.__pushField(inputLanguage.shift())
        },
        /**
         * remove input
         * @param code
         * @param index
         * @author Amr
         */
        removeInput(code, index) {
            this.delete(this.__model, code)
            this.delete(this.fields, index)
            this.chosenLanguages = this.chosenLanguages.filter((language) => {
                return language.code.toLowerCase() !== code.toLowerCase();
            })
        },
        /**
         * add inputs according to the passed values
         * @private
         * @author Amr
         */
        __initializeFirstInput() {
            let repeaters = !this.__model || this.isEmptyObject(this.__model) ? 1 : Object.keys(this.__model).length;
            for (let counter = 0; counter < repeaters; counter++) {
                if (counter == 0)
                    this.__pushField(this.vuex_defaultLanguage)
                else
                    this.addInput()
            }
        }
    },
    watch: {
        vuex_defaultLanguage: function (newVal, oldVal) {
            if (this.fields.length == 0) {
                this.__initializeFirstInput();
            } else {
                this.set(this.fields, 0, newVal)
                // this.fields[0] = newVal;
            }
        }
    }
}
