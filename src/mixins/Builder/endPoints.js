import Files from './Files'

export default {
    mixins: [Files],
    data() {
        return {
            /**
             * endPint used to save new data
             * @author Amr
             */
            saveEndpoint: {},
            /**
             * endPint used to update resource
             * @author Amr
             */
            editEndpoint: {},
            /**
             * endPint used to fetch resource
             * @author Amr
             */
            findEndpoint: {},
            /**
             * id attribute of object
             * @author Amr
             */
            id: null,
            /**
             * base params
             * @author Amr
             */
            baseParams: {},

        }

    },
    computed: {
        /**
         * get the base name of CRUD
         * to predicate operations' urls
         *
         * @return {string}
         * @private
         * @author Amr
         */
        __baseName() {
            return this.name.toLowerCase();
        },
        /**
         * read id for route
         *
         * @return {string}
         * @private
         * @author Amr
         */
        __id() {
            return this.$route.params.id;
        },
        /**
         * to be override later
         * @return {}
         * @private
         * @author Amr
         */
        __baseParams() {
            return this.baseParams
        },
        /**
         * this params passed with edit endPoint
         *
         * @return {{id: default.computed.__id}}
         * @author Amr
         */
        editParams() {
            return {
                ...this.__baseParams,
                id: this.__id
            }
        },
        /**
         * this params passed with fetch endPoint
         *
         * @return {{id: default.computed.__id}}
         * @author Amr
         */
        findParams() {

            let params = {
                ...this.__baseParams,
                id: this.__id
            }
            return params;
        },
        /**
         * this params passed with store endPoint
         *
         * @return {{}}
         * @author Amr
         */
        storeParams() {
            let baseParams = this.baseParams
            return {
                ...baseParams
            }
        },
        /**
         * returns the save endPoint
         * @return {default.data.saveEndpoint|{}|*}
         * @private
         * @author Amr
         */
        __saveEndPoint() {
            if (!this.isEmptyObject(this.saveEndpoint))
                return this.saveEndpoint;
            return this.route(this.__baseName + '.store', this.storeParams);
        },
        /**
         * returns the edit endPoint
         * @return {default.data.editEndpoint|{}|*}
         * @private
         * @author Amr
         */
        __editEndPoint() {
            if (!this.isEmptyObject(this.editEndpoint))
                return this.editEndpoint;
            return this.route(this.__baseName + '.update', this.editParams);
        },
        /**
         * returns the fetch endPoint
         * @return {default.data.findEndpoint|{}|*}
         * @private
         * @author Amr
         */
        __findEndPoint() {
            if (!this.isEmptyObject(this.findEndpoint))
                return this.findEndpoint;
            return this.route(this.__baseName + '.find', this.findParams);
        },
        /**
         * determine save endPoint which may be edit or save accordin' to
         * id params in the router
         * @return {default.computed.__saveEndPoint|default.computed.__editEndPoint}
         * @author Amr
         */
        saveChosenEndpoint() {
            if (this.__id)
                return this.__editEndPoint
            return this.__saveEndPoint
        },
    },
    methods: {
        /**
         * clear methods to be overriden later
         * @author Amr
         */
        afterFetchObject(form) {

        },
        /**
         * clear method to be called later
         * @param form
         * @return {*}
         * @author Amr
         */
        beforeSaveForm(form) {
            return form;
        },
        /**
         * @author khalid
         * before save form
         */
        $beforeSaveForm(form) {

        },
        /**
         * prepare the request to backend
         *
         * @param route
         * @return {*|Promise<unknown>}
         * @private
         * @author Amr
         */
        __request(route) {
            this.$beforeSaveForm(this.form$)
            let __form = this.beforeSaveForm(this.form$);
            let __route = route;
            if (this.hasFiles) {
                __form = this.toFormData();
                __route.header = this.fileRequestHeader
            }
            return this.request(__route, __form)
        },
        /**
         * save data or update it
         * @param justOnce
         * @private
         * @author Amr
         */
        __save(justOnce = true) {
            let link = this.saveChosenEndpoint;
            this.overlay = true

            this.__request(link).then((payload) => {
                Toast.$emit('success-message', payload.message, 'Done!')
                this.$afterSuccessSubmit(payload)
                this.afterSuccessSubmit(payload)
                if (this.still_update) {
                    this.form$ = payload.payload
                    return;
                }
                if (justOnce) {
                    this.__redirectLink();
                    return;
                }
                // this.__redirectLink(this.creationLink());


            }).catch(({status, data}) => {
                this.validationErrors = data.payload;
            }).finally(() => {
                this.overlay = false
            })
        },
        /**
         * fetch object accordin' to the router's id
         * @author Amr
         */
        fetchObject() {
            if (this.preventFetch)
                return
            this.overlay = true
            this.__request(this.__findEndPoint).then(({payload}) => {
                this.beforeLoadForm(payload);
                this.values = payload
                this.form$ = payload
                this.afterFetchObject(payload);
            }).finally(() => {
                this.overlay = false
            })
        },
        /**
         * @author khalid
         * clear form data and values
         */
        $afterSuccessSubmit(payload) {
            this.form$ = {}
            this.values = {}
            this.validationObserver.reset()
        },

        beforeLoadForm(){

        },
        /**
         * @author khalid
         * @param payload
         */
        afterSuccessSubmit(payload) {
            // @toDo you can override this function after submit request
        },
        /**
         * watch id changes
         *
         * @param newVal
         * @param oldVal
         * @private
         * @author Amr
         */
        __idWatcher(newVal, oldVal) {
            if (!newVal)
                return;
            this.fetchObject();
        },
    },
    watch: {
        id: {
            handler: '__idWatcher'
        }
    },
}
