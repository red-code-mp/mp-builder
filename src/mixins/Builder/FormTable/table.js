export default {
    computed: {
        /**
         * table's configs
         * @return {{endpoint, columns, actions}|{}}
         * @author Amr
         */
        tableConfig$() {
            return this.component$.table_config ?? {};
        },
    },
    methods: {
        /**
         * get the chosen if from table
         * @param id
         * @author Amr
         */
        chosenId(object) {
            this.resetFormTableBuilder()
            this.chosenId$ = object
            if (this.chosenId$ instanceof Object)
                this.updateBuilderParams(this.builder_params)
            this.preventFetch = false;
            this.fetchObject()
        }
    }
}
