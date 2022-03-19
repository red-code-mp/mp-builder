import Base from '../base'

export default {
    mixins: [Base],
    methods: {
        /**
         * check the permission of the current user
         * @returns {boolean|*}
         * @author Amr
         */
        isAuthorized(tab) {
            if (this.__hasIsAuthorized(tab)) {
                return this.__callComponentIsAuthorized(tab);
            }
            let title = tab.title ?? tab.icon.attributes.title;
            let name = '';
            if (this.__hasSlug) {
                name = `${this.__routeSlug}/${title}`
            } else {
                name = this.__routeName.split('.')
                name.pop()
                name.push(title)
                name = name.join('/').toLowerCase();
            }
            name = name.replace(/ /g, '_').toLowerCase()
            console.log('is_authorized', name)
            return Boolean(
                this.getPermissionDocs.find(
                    permission => this.isChecked(permission, name)
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

            return permission.toLowerCase().includes(name)
        }
    }

}
