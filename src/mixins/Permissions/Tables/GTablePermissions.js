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
            let name= '';
            if (this.__hasSlug)
                name = this.__routeSlug+'/status';
            else {
                name = this.__routeName.split('.');
                name.pop()
                name.push('status')
                name = name.join('/').toLowerCase();
            }
            return Boolean(
                this.getPermissionTransactions.find(
                    permission => this.isChecked(permission , name)
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
