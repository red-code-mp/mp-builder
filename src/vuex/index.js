import Vue from 'vue'
import Vuex from 'vuex'
import modules from '../structure/RegisterVuex'
import createPersistedState from "vuex-persistedstate";

/**
 * add vuex
 * @author Amr
 */
Vue.use(Vuex)
/**
 * initialize the vuex
 * @author Amr
 */
export default new Vuex.Store({
    modules,
    plugins: [createPersistedState()],
})