import Builder from './builder'
import Vue from 'vue';

/**
 * gather all pre-defined component
 * in one place
 *
 * @type {{BBuilder}}
 * @author Amr
 */
let components = {
    ...Builder
}

/**
 * register builder's component
 * @author Amr
 */
for (let componentsKey in components) {
    Vue.component(componentsKey, components[componentsKey])
}


