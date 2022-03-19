export default {
    computed: {
        /**
         * builder's fields
         * @return {*|Array}
         * @author Amr
         */
        fields$() {
            return this.component$.fields ?? [];
        },
        /**
         * builder's config
         * @return {builder_config|{name, params}|{}}
         * @author Amr
         */
        builderConfig$() {
            return this.component$.builder_config ?? {};
        },
        /**
         * builder's name
         * (for endpoints)
         * @return {string | string}
         * @author Amr
         */
        builder_name() {
            return this.builderConfig$.name ?? '';
        },
        show_actions() {
            return this.builderConfig$.hasOwnProperty('show_actions') ? this.builderConfig$.show_actions : true
        },
        /**
         * builder's params
         * @return {*|null}
         * @author Amr
         */
        builder_params() {
            let params = this.builderConfig$.params ?? {}
            if (this.chosenId$ instanceof Object)
                params = {
                    ...params,
                    ...this.chosenId$
                }
            return params
        }
        ,
        /**
         * read id for route
         *
         * @return {string}
         * @private
         * @author Amr
         */
        __id() {
            return this.chosenId$ instanceof Object ? this.chosenId$.id : this.chosenId$;
        },
        /**
         * get the base name of CRUD
         * to predicate operations' urls
         *
         * @return {string}
         * @private
         * @author Amr
         */
        __baseName() {
            return this.builder_name.toLowerCase();
        },
    },
    methods: {
        updateBuilderParams(builderParams) {
            let params = this.clone(builderParams)
            for (let key in params) {
                if (!params.hasOwnProperty(key))
                    continue
                if (params[key] instanceof Function)
                    params[key] = params[key].call(this);
                this.set(this.baseParams, key, params[key])
            }
        },
        /**
         * reset builder's attributes
         * @author Amr
         */
        resetFormTableBuilder() {
            this.form$ = {}
            this.values = {}
        },
        /**
         * stop redirection
         * @param link
         * @author Amr
         */
        redirection(link) {
            this.resetFormTableBuilder()
            this.updateTable++;
            this.updateBuilder++;
        },
        /**
         * cancel save or update operation
         * @author Amr
         */
        cancel() {
            this.resetFormTableBuilder()
            this.updateBuilder++;
            this.preventFetch = true;
        },
    },
    watch: {
        builder_params: {
            deep: true,
            immediate: true,
            handler: function (val) {
                /**
                 * update baseParams immediately once the value of builder
                 * params changed
                 * @author Amr
                 */
                this.updateBuilderParams(val)
                // let params = this.clone(val)
                // for (let key in params) {
                //     if (!params.hasOwnProperty(key))
                //         continue
                //     if (params[key] instanceof Function)
                //         params[key] = params[key].call(this);
                //     this.set(this.baseParams, key, params[key])
                //
                // }
            }
        }
    }
}
