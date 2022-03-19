import Vue from 'vue'
import Bundle from './Bundle';

/**
 * register modules
 *
 * @author Amr
 */
Bundle.forEach(module => {
    if (module.hasOwnProperty('Mixins'))
        registerMixins(module.Mixins)
})

/**
 * register mixin in global vue instance
 *
 * @param mixins
 * @author Amr
 */
function registerMixins(mixins) {
    mixins.forEach(mixin => Vue.mixin(mixin))
}