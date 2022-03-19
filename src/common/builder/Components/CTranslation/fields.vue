<template>
    <ValidationProvider :rules="__rules" :name="builderField" v-slot="{ errors }">
        <div class="input-group mb-2">
            <input type="text" :name="`translation-field-${fieldIndex}`" class="form-control"
                   v-model="translation$">

            <div class="input-group-append">
                <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false">
                    {{__chosenLanguage.name}}
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" v-for="(language , index) in vuex_languages"
                       :key="`vuex-languages-${index}`"
                       @click="chooseLanguage(index)">
                        {{language.name}}
                    </a>
                </div>
            </div>
            <div class="input-group-append">
                <button type="button" class="btn btn-success" @click="addInput" v-if="fieldIndex == 0">
                    +
                </button>
                <button type="button" class="btn btn-danger" @click="remove" v-else>
                    -
                </button>
            </div>
        </div>
        <v-error :errors="errors"/>
    </ValidationProvider>
</template>
<script>
    export default {
        data() {
            return {
                /**
                 * input's v-model
                 * @author Amr
                 */
                translation$: null,
                /**
                 * language's v-model
                 * @author Amr
                 */
                chosenLanguages: {}
            }
        },
        props: {
            /**
             * field index
             * @author Amr
             */
            fieldIndex: {
                required: true,
                type: Number
            },
            /**
             * the chosen language
             * @author Amr
             */
            defaultLanguage: {
                required: true,
                type: Object
            },
            /**
             * the initialized value
             * @author Amr
             */
            value: {
                required: true
            },
            /**
             * ValidationRules
             * @author Amr
             */
            rules: {
                required: true
            },
            /**
             * the field that component's got from form builder
             * @author Amr
             */
            builderField: {
                required: true
            }

        },
        computed: {
            /**
             * custom the name of input, just for ValidationName
             * @return {string}
             * @private
             * @author Amr
             */
            __field() {
                return this.builderField + '-' + this.__code;
            },
            /**
             * the passed ValidationRules
             *
             * @return {default.props.rules|{required}}
             * @private
             * @author Amr
             */
            __rules() {
                return this.rules;
            },
            /**
             * indicate the chosen Language
             * @return {chosenLanguages|{}|default.props.defaultLanguage|{type, required}}
             * @private
             * @author Amr
             */
            __chosenLanguage() {
                if (this.isEmptyObject(this.chosenLanguages))
                    return this.defaultLanguage;
                return this.chosenLanguages;
            },
            /**
             * get the code of the chosen language
             * @return {string|null}
             * @private
             * @author Amr
             */
            __code() {
                try {
                    return this.__chosenLanguage.code.toLowerCase();
                } catch (exception) {
                    return null
                }
            }
        },
        methods: {
            /**
             * fire add-input event
             * @author Amr
             */
            addInput() {
                this.$emit('add-input')
            },
            /**
             * fire remove input event
             * with code and current field's index
             * @author  Amr
             */
            remove() {
                this.$emit('remove', this.__code, this.fieldIndex)
            },
            /**
             * assign the chosen language
             * @param index
             * @author Amr
             */
            chooseLanguage(index) {
                this.chosenLanguages = this.__getLanguages(index)
            },
            /**
             * get Language according to the passed index
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
             * update the value of field
             * if translation$ or the __chosenLanguage changed
             * @param newValue
             * @param oldValue
             * @private
             * @author Amr
             */
            __watcher(newValue, oldValue) {
                this.$emit('field-value', this.__code, this.translation$)
            },
            /**
             * update the value of current field
             * with the initialized value
             * @param newVal
             * @param oldVal
             * @private
             * @author Amr
             */
            __valueWatcher(newVal, oldVal) {
                if (!newVal)
                    return;
                this.translation$ = newVal;
            }
        },
        watch: {
            /**
             * translation$ watcher
             * @author Amr
             */
            translation$: {
                handler: '__watcher'
            },
            /**
             * __chosenLanguage watcher
             * @author Amr
             */
            __chosenLanguage: {
                immediate: true,
                deep: true,
                handler: '__watcher'
            },
            /**
             * value watcher
             * @author Amr
             */
            value: {
                immediate: true,
                handler: '__valueWatcher'
            }
        }
    }
</script>