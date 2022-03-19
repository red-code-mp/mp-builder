export default {
    provide: function () {
        return {
            submit: this.submit,
            cancel: this.cancel,
            addMore: this.addMore
        }
    },
    methods: {
        /**
         * empty method to be overridden later
         * @author Amr
         */
        beforeSubmit() {
            // @toDo you can override this function before submit request
        },
        /**
         * empty method to be overridden later
         * @author Amr
         */
        afterSubmit() {
            // @toDo you can override this function before submit request
        },
        /**
         * @author khalid
         */
        $beforeSubmit() {
            // @ toDo this function is specific to the form builder
        },
        /**
         * cancel save or update operation
         * @author Amr
         */
        cancel() {
            this.__toSource();
        },
        /**
         * submit form
         * @author Amr
         */
        submit() {
            this.$beforeSubmit()
            this.beforeSubmit();
            this.__save();
            this.afterSubmit();
        },
        /**
         * submit form and stay in the page
         * @author Amr
         */
        addMore() {
            this.$beforeSubmit()
            this.beforeSubmit();
            this.__save(false);
        },
    }
}
