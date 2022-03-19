import {mapGetters} from 'vuex'
import Permissions from '../../../mixins/Permissions/Tables/BSDropdown'

export default {
    props: ['action', 'columns'],
    mixins : [Permissions],
    computed: {
        // ...mapGetters('Auth', ['getPermissions','getPermissionRoutes','getPermissionTransactions']),
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
        is_parent_visible() {
            let result = true
            if (this.action.hasOwnProperty('is_visible')) {
                result = this.action.is_visible;
                if (this.action.is_visible instanceof Function)
                    result = this.action.is_visible.call(this, this.columns)
            }
            return result;
        }
    },
    methods: {
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
        },
        is_visible(item) {
            let result = true
            if (item.hasOwnProperty('is_visible')) {
                result = item.is_visible;
                if (item.is_visible instanceof Function)
                    result = item.is_visible.call(this, this.columns)
            }

            return result && this.isAuthorized(item)
        },

    }
}
