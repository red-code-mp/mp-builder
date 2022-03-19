export default {
    data(){
        return {
            count: 0,
            config: {}
        }
    },
    computed: {
        /**
         * @author khalid
         * @returns {*}
         * @private
         */
        __component(){
            return this.config.component
        },
        /**
         * @author khalid
         * @returns {string}
         * @private
         */
        __title(){
            return this.config.title ?? ''
        },
        /**
         * @author khalid
         * @private
         */
        __endpoint(){
            return this.config.endpoint ?? {}
        },
        /**
         * @author khalid
         * @returns {string}
         * @private
         */
        __generateFormBuilderID(){
            return `formBuilder-${Math.random().toString(36).substring(2, 8)}`
        },
        /**
         * @author khalid
         * @returns {{}}
         * @private
         * bind attributes
         */
        __attributes(){
            return this.config.attributes ?? {}
        }
    },
    methods: {
        /**
         * @author khalid
         * hide modal
         */
        hideModal() {
            this.$bvModal.hide(this.__generateFormBuilderID)
        },
        /**
         * @author khalid
         * show modal
         */
        showModal(event){
            this.count++
            this.config = event
            this.$bvModal.show(this.__generateFormBuilderID)
        },
        /**
         * @author khalid
         * @private
         */
        async __save() {
            const isValid = await this.$refs.formBuilder.$refs.builder.$refs.validationObserver.validate();
            if (!isValid)
                return
            let link = this.route(this.__endpoint.route, this.__prepareParams(this.__endpoint.params ?? {}))
            this.request(link, this.$refs.formBuilder.form$).then((payload) => {
                Toast.$emit('success-message', payload.message, 'Done!')
                this.hideModal()
                this.$emit('refreshSelect', payload)
            }).catch(({status, data}) => {
                this.$refs.formBuilder.validationErrors = data.payload;
            }).finally(() => {
            })
        },
        /**
         * @author khalid
         * @returns {string}
         * @private
         * generate key
         */
        __generateKey(){
            return `form-modal-${this.count}`
        },
    },
}
