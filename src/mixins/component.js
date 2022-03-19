import Vue from 'vue'

export default {
    methods: {
        /**
         * checks the existence of components in the global
         * vue instance
         *
         * @param component
         * @return {boolean}
         * @author Amr
         */
        isValidComponent(component) {
            return Vue.options.components[component] !== undefined;
        }
    }

}