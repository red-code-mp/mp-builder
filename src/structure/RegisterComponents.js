import Vue from 'vue'
import Bundle from './Bundle';

/**
 * register modules
 *
 * @author Amr
 */
Bundle.forEach(module => registerComponents(module.Components))

/**
 * register component in global vue instance
 *
 * @param components
 * @author Amr
 */
function registerComponents(components) {
    for (let key in components)
        Vue.component(key, components[key])
}