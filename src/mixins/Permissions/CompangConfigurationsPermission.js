import Base from './base'

export default {
    mixins: [Base],
    computed: {
        isAuthorized() {
            return this.isChecked(null, null)
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
            return this.getRoles.includes('super-admin')
        }
    }
}
