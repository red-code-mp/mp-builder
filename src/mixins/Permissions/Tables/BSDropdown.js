import Base from '../base'

export default {
    mixins: [Base],
    methods: {
        /**
         * check the permission of the current user
         * @returns {boolean|*}
         * @author Amr
         */
        isAuthorized(action) {
            if (this.__hasIsAuthorized(action)) {
                return this.__callComponentIsAuthorized(action);
            }
            let title = action.title ?? action.icon.attributes.title;
            let name ='';
            if(this.__hasSlug){
                name = `${this.__routeSlug}/${title}`
            }else{
                name = this.__routeName.split('.')
                name.pop()
                name.push(title)
                name = name.join('/');
            }
            name = name.replace(/ /g , '_').toLowerCase();
            return Boolean(
                this.getPermissionTransactions.find(
                    permission => permission.includes(name)
                )
            );
        },
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
