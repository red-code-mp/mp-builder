export default {
    props: ['action', 'columns'],
    computed: {
        /**
         * @author khalid
         * @returns {*}
         * bind icon attributes
         */
        iconAttributes() {
            return this.action.icon.attributes
        },
        /**
         * @author khalid
         * @returns {string}
         * icon title
         */
        title() {
            return this.action.title ?? ''
        },
        caretAttributes() {
            return this.action.attributes ?? {}
        }
    },
    methods: {
        /**
         * @param item
         * @returns {{}}
         */
        itemAttributes(item) {
            return item.attributes ?? {}
        },
        /**
         * @author khalid
         * @param item
         */
        doAction(item) {
            try {
                item.callback(this)
            } catch (e) {
                console.error('callback must be a function')
            }
        }
    }
}
