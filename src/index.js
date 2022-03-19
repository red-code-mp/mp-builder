import BBuilder from './common/builder/BBuilder.vue';
import BTabBuilder from './common/builder/tabs/BTabBuilder.vue';
import BTable from './common/table/BTable.vue';

const BBuilderPlugin = {
    install(Vue, options) {
        Vue.component(BBuilder.name, BBuilder);
        Vue.component(BTabBuilder.name, BTabBuilder);
        Vue.component(BTable.name, BTable);
    },
};

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(BBuilderPlugin);
    window.mp = require('./mixins')
}

/**
 * register plugins
 */
require('./plugins')

export default BBuilderPlugin;
export { BBuilder, BTabBuilder, BTable };
