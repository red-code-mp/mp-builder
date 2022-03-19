import Bundle from './Bundle';

let vuex = {}
/**
 * register modules
 *
 * @author Amr
 */
Bundle.forEach(module => {
    if (module.hasOwnProperty('Vuex'))
        vuex = Object.assign(vuex, module.Vuex)
})

export default vuex;