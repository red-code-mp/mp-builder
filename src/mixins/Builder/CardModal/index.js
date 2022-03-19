export default {
    props: {
        component: {
            require: true,
            default: function () {
                return {};
            }
        },
    },
    data(){
        return{
            endpoint: {},
            header: '',
            data$: []
        }
    },
    computed:{
        /**
         * @author khalid
         * @returns {string}
         * @private
         */
        __id(){
            return this.$route.params.id
        },
        /**
         * @author khalid
         * @returns {[{component: string, field: string, label: string}, {component: string, field: string, label: string}, {component: string, field: string, label: string}]}
         * @private
         */
        __modalAttrs(){
            return this.component.card.attributes
        }
    },
    methods:{
        /**
         * @author khalid
         * @param action
         * @param id
         * prepare endpoint
         */
        prepareEndpoint(action,id=null){
            let link = `${this.getEndpoint()['route']}.${action}`
            let params = this.__prepareParams(this.getEndpoint()['params'])
            if (id){
                this.endpoint = {...this.route(link,{...params,id: id})}
                this.header = link
                return;
            }
            let query = {}
            if (action === 'fetch' && this.getEndpoint()['query'])
                query = this.__prepareParams(this.getEndpoint()['query'])
            this.endpoint = {...this.route(link,{...params}, query)}
            this.header = link
        },
        /**
         * @author khalid
         * @returns {*}
         */
        getEndpoint(){
            return this.component.endpoint
        },
        /**
         * @author khalid
         * fetch records
         */
        fetchObject() {
            this.request(this.endpoint).then(({payload}) => {
                this.data$ = payload.data
            }).finally(() => {
            })
        },
        /**
         * @author khalid
         */
        prepareFetchService(){
            this.prepareEndpoint('fetch')
            this.fetchObject()
        },
        /**
         * @author khalid
         * @param action
         * @param id
         * @returns {Promise<unknown>}
         * @private
         */
        __delete(action,id){
            let self = this
            self.prepareEndpoint(action, id)
            return new Promise((resolve, reject) => {
                this.popSwalConfirm('Are you sure ?', 'are you sure to delete ?')
                    .then(() => {
                        self.request(self.endpoint)
                            .then(
                                (response) => {
                                    self.prepareFetchService()
                                    Toast.$emit('success-message', response.message, 'Done!')
                                }
                            ).catch(
                            (error) => {
                                reject(error)
                            }
                        )
                    }).catch(() => {
                })

            });
        },
        /**
         * @author khalid
         * @param field
         * @returns {string}
         * @private
         */
        __checkValue(field){
            return field.value ?? ''
        },
        /**
         * @author khalid
         * @param field
         * @returns {{}}
         * @private
         */
        __checkAttributes(field){
            return field.attributes ?? {}
        },
        /**
         * @author khalid
         * @param attr
         * @param item
         * @private
         */
        __value(attr, item){
            let value = item[attr.field.value]
            if (this.__checkTextarea(attr.component) && value){
                return this.parseText(item[attr.field.value], 20)
            }
            return value
        },
        /**
         * @author khalid
         * @param component
         * @returns {boolean}
         * @private
         */
        __checkTextarea(component){
            return ['b-form-textarea', 'textarea'].includes(component)
        }
    },

    created() {
        this.prepareFetchService()
    }
}
