import Base from '../base'

export default {
    mixins: [Base],
    computed: {
        /**
         * check the permission of the current user
         * @returns {boolean|*}
         * @author Amr
         */
        isAuthorized() {
            if (this.__action.is_authorized && this.__action.is_authorized(this.getPermissionTransactions) !== null) {
                return this.__action.is_authorized(this.getPermissionTransactions)
            }
            let name = '';
            if (this.__hasSlug)
                name = this.__routeSlug + '/' + this.attributes.title;
            else {
                name = this.__routeName.split('.');
                name.pop()
                name.push(this.attributes.title)
                name = name.join('/');
            }
            name = name.replace(/ /g, '_').toLowerCase()

            console.log('is_authorized', name)
            return Boolean(
                this.getPermissionTransactions.find(
                    permission => this.isChecked(permission, name)
                )
            );
        }
    },
    methods: {
        /**
         * find the permission according to the generated
         * slug or name
         * @param permission
         * @param name
         * @returns {boolean}
         * @author Amr
         */
        isChecked(permission, name) {

            return permission.toLowerCase().includes(name);
        }
    }

}
