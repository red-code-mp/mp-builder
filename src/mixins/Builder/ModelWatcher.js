export default {
    methods: {
        /**
         * publish model's value via FormBuilder Bus
         * @param newVal
         * @param oldVal
         * @author Amr
         */
        model$Watcher(newVal, oldVal) {
            try {
                this.modelNewValue(newVal, oldVal)
            } catch (e) {
            }
            this.publish(newVal, oldVal);
        },
    }

}