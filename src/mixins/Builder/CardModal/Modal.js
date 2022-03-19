import * as _ from 'lodash'

export default {
    props: {
        component: {
            require: true,
            default: function () {
                return {};
            }
        },
        header: {
            required: false,
            default: ''
        },
        endpoint: {
            require: true,
            type: Object
        },
    },
    data() {
        return {
            form$: {},
            validationErrors: [],
            endpoint$: {},
            header$: ''
        }
    },
    computed: {
        /**
         * @author khalid
         * @returns {[{component: string, field: string, extra: {description: string, class: string}, rules: {required: boolean}, label: string, cols: {field: number, label: number}}, {component: string, field: string, extra: {description: string, class: string}, rules: {required: boolean}, label: string, cols: {field: number, label: number}}, {component: string, field: string, extra: {description: string, class: string}, rules: {required: boolean}, label: string, cols: {field: number, label: number}}, {component: string, field: string, service: {route: string, params: {n_parent: boolean, f_key: string}}, extra: {description: string, class: string}, multiple: boolean, rules: {required: boolean}, attributes: {normalizer(*): {id: *, label: *}}, label: string, cols: {field: number, label: number}}]}
         * @private
         */
        __fields() {
            return this.component.modal.fields
        },
        /**
         * @author khalid
         * @returns {VueI18n.TranslateResult}
         * @private
         */
        __title() {
            return this.$t(this.header$)
        },
        /**
         * @author khalid
         * @returns {string}
         * @private
         */
        __id() {
            return this.$route.params.id
        },
    },
    methods: {
        /**
         * @author khalid
         * @returns {*}
         * return fields
         */
        getModalFields() {
            return this.__fields.map((value) => {
                if (value.fields) {
                    return value.fields.map((value) => {
                        return value.field
                    })
                } else {
                    return value.field
                }
            })
        },

        /**
         * @author khalid
         * clear form data and values
         */
        clearData() {
            this.form$ = {}
        },
        /**
         * @author khalid
         */
        prepareCreteEndpoint() {
            this.endpoint$ = {
                ...this.route(`${this.component.endpoint.route}.store`,
                    {...this.__prepareParams(this.component.endpoint.params)})
            }
            this.header$ = `${this.component.endpoint.route}.store`
        },
        /**
         * @author khalid
         * @private
         */
        async __save() {
            const isValid = await this.$refs.modalBuilder.$refs.validationObserver.validate();
            if (!isValid)
                return
            this.request(this.endpoint$, this.form$).then((payload) => {
                Toast.$emit('success-message', payload.message, 'Done!')
                this.hideModal()
                this.$emit('fetchData')
            }).catch(({status, data}) => {
                this.validationErrors = data.payload;
            }).finally(() => {
            })
        },
        /**
         * @author
         * @private
         */
        __find(){
            this.request(this.endpoint$).then((payload) => {
                this.showModal()
                this.form$ = payload.payload
            }).catch(({status, data}) => {
            }).finally(() => {
            })
        },
        /**
         * @author khalid
         * hide modal
         */
        hideModal() {
            this.$bvModal.hide('modal-prevent-closing')
            this.clearData()
            this.$refs.modalBuilder.$refs.validationObserver.reset()
        },
        /**
         * @author khalid
         * show modal
         */
        showModal(){
            this.$bvModal.show('modal-prevent-closing')
        },
        /**
         * @author khalid
         * @param newVal
         * @param oldVal
         */
        endpointWatcher(newVal, oldVal){
            if (this.header.split('.').includes('update')){
                this.endpoint$ = newVal
                this.header$ = `${this.component.endpoint.route}.update`
                this.__find()
            }
        }

    },
    mounted() {
    },
    created() {
    },
    watch: {
        deep: true,
        immediate: true,
        /**
         * @author khalid
         */
        endpoint: 'endpointWatcher',
    }
}
