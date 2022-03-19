import Vue from 'vue'

/**
 * Form builder bus
 * @type {Vue | CombinedVueInstance<Vue, object, object, object, Record<never, any>>}
 * @author Amr
 */
window.FormBuilder = new Vue();
/**
 * Form builder relations
 * @type {Vue | CombinedVueInstance<Vue, object, object, object, Record<never, any>>}
 * @author Amr
 */
window.FormRelations = new Vue();