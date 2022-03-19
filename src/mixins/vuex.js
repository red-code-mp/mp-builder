import settings from '../utils/vuex'
import {mapActions} from 'vuex'
import Store from '../vuex'

let methods = appendMethods(settings);
let computed = appendComputed(settings);

export default {
    computed,
    methods: {
        ...methods,
        /**
         * load basic vuex actions
         * @author Amr
         */
        loadVuex() {
            let keys = Object.keys(settings)
            keys.forEach(this.__loadVuexModule)
        },
        /**
         * load module's actions
         *
         * @param module
         * @author Amr
         */
        __loadVuexModule(module) {
            settings[module].actions.forEach(function (action) {
                eval(`this.${action}(this)`)
            }.bind(this))
        }
    }
}

/**
 * collect all vuex methods to be called
 * firstly
 *
 * @param actions
 * @author Amr
 */
function appendMethods(actions) {
    let keys = Object.keys(actions)
    let methods = {};
    keys.forEach((module) => {
        methods = Object.assign(methods, {...mapActions(module, actions[module].actions)})
    })
    return methods;
}

/**
 * load vuex default states
 * with vuex_ prefix so they will be
 * available in any vue component
 * @param actions
 */
function appendComputed(actions) {
    let keys = Object.keys(actions)
    let states = {};
    keys.forEach((module) => {
        actions[module].states.forEach(state => {
            states['vuex_' + state] = function () {
                return Store.getters[module + '/' + state]
            }
        })
    })
    return states;
}
