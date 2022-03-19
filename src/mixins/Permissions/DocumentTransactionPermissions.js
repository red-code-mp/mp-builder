import Base from './base'

export default {
    mixins: [Base],
    computed: {
        /**
         * menu transaction
         *
         * @returns {string}
         * @author Amr
         */
        transactionSlug() {
            return `${this.parent.slug}/${this.section.title.replace(/ /g, '_')}`.toLowerCase()
        },
        /**
         * check the permission of the current user
         * @returns {boolean|*}
         * @author Amr
         */
        isAuthorized() {
            if (this.__hasIsAuthorized(this.section))
                return this.__callComponentIsAuthorized(this.section);
            return Boolean(this.getPermissionTransactions.find(permission => {
                    return this.isChecked(permission, this.transactionSlug)
                })
            )
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
            return permission.toLowerCase().includes(name.toLowerCase())
        }
    }

}
