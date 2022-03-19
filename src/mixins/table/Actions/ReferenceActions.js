export default {
    props: ['action', 'columns'],
    data() {
        return {}
    },
    methods: {
        /**
         * @author khalid
         * @param action
         * @returns {boolean}
         * check is component action
         */
        is_component(action) {
            return this.getActionComponents().includes(action.component)
        },
        is_visible(action) {
            if (!action.hasOwnProperty('is_visible'))
                return true;
            if (action.is_visible instanceof Function)
                return action.is_visible.call(this, this.columns)
            return action.is_visible;
        },
    },
    computed: {
        /**
         * @author khalid
         * @returns {[]}
         * call global actions
         */
        actions() {
            let acts = []
            this.action.references.map((act) => {
                acts.push(this.getGlobalActions(act, act.refs ?? {}, act.is_visible, act.is_authorized))
            })
            return acts
        }
    },

    created() {
    }
}
