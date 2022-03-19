export default {
    methods: {
        /**
         * listen to attributes changes.
         * Append any coming values within form$
         *
         * @param model
         * @param newValue
         * @param extra
         * @private
         * @author Amr
         */
        __listenFormBuilder(model, newValue, extra) {
            this.set(this.form$, model, newValue);
        },
        /**
         * listen to relation's query
         *
         * @param service
         * @param relationQuery
         * @return {*}
         * @private
         * @author Amr
         */
        __appendQuery(service, relationQuery) {
            let query = service.params;
            if (!query)
                query = {}
            query = {
                ...query,
                ...relationQuery
            }
            this.set(service, 'params', query)
            return service;

        },
        /**
         * listen to relations' of fields
         * @param model
         * @param query
         * @param component
         * @private
         * @author Amr
         */
        __listenFormRelations(model, query, component) {
            // let field = this.__find(model);
            this.__appendQuery(component.service, query);
        },

        __listenForInitRepeater(field) {
            this.set(this.form$, field, []);
        },
        /**
         * find the field among the passed fields
         *
         * @param field
         * @return {*}
         * @private
         * @author Amr
         */
        __find(field) {
            return this.fields.find((el) => {
                return el.field === field;
            })
        },
        /**
         *listen ot form builder and their relations
         *
         * @private
         * @author Amr
         */
        __listeners() {
            FormBuilder.$on('form-builder', this.__listenFormBuilder)
            FormRelations.$on('form-relations', this.__listenFormRelations)
            FormRelations.$on('init-repeater', this.__listenForInitRepeater)
        }
    }
}
