import Base from './base'
export default {
    mixins : [Base],
    computed:{
        /**
         * check the permission of the current user
         * @returns {boolean|*}
         * @author Amr
         */
        isAuthorized(){
            if (this.__hasIsAuthorized(this.section))
                return this.__callComponentIsAuthorized(this.section);
            return Boolean(this.getPermissionModules.find(module => {
                return this.isChecked(module , this.section.title);
            }));
        }
    },
    methods:{
        /**
         * find the permission according to the generated
         * slug or name
         * @param permission
         * @param name
         * @returns {boolean}
         * @author Amr
         */
        isChecked(permission , name){
            return permission.toLowerCase() == name.replace(/ /g , '_').toLowerCase();
        }
    }

}
