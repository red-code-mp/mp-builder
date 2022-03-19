import {mapGetters} from 'vuex'

export default {
    computed: {
        ...mapGetters('Auth', ['getPermissions', 'getPermissionModules', 'getPermissionDocs', 'getPermissionTransactions', 'getPermissionRoutes', 'getRoles']),
        /**
         * returns the route name
         * @returns {string}
         * @private
         * @author Amr
         */
        __routeName() {
            return this.$route.name;
        },
        /**
         * check if route has slug
         * @returns {boolean}
         * @private
         * @author Amr
         */
        __hasSlug() {
            return this.$route.meta.hasOwnProperty('slug')
        },
        /**
         * returns the slug of route if it has any
         * @returns {*|null}
         * @private
         * @author Amr
         */
        __routeSlug() {
            return this.__hasSlug ? this.$route.meta.slug : '';
        }
    },
    methods: {
        /**
         * check if the given component has its own isAuthorized method
         * @param component
         * @returns {boolean}
         * @private
         * @author Amr
         */
        __hasIsAuthorized(component) {
            return component.hasOwnProperty('is_authorized');
        },
        /**
         * call component's isAuthorized
         * @param component
         * @returns {*}
         * @private
         * @author Amr
         */
        __callComponentIsAuthorized(component) {
            return component.is_authorized instanceof Function ?
                component.is_authorized.call(this, this.getPermissions, component)
                : component.is_authorized;
        },
        isChecked(permission, name) {
            return true;
        }
    }
}
