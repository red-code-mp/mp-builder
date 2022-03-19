import Base from './base'

export default {
    mixins: [Base],
    computed: {
        isAuthorized() {
            if (this.__hasIsAuthorized(this.section))
                return this.__callComponentIsAuthorized(this.section);
            return Boolean(this.getPermissionDocs.find(doc => {
                return this.isChecked(doc, this.section.slug) //doc.toLowerCase() == this.section.slug.toLowerCase();
            }));
        },
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
            return permission.toLowerCase() == name.toLowerCase();
        }
    }
}
