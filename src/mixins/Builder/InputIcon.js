import Base from './base'
import ModelWatcher from './ModelWatcher'

export default {
    mixins: [Base, ModelWatcher],
    /**
     * field's component
     * @author Amr
     */
    props: {
        field: {
            required: true,
            default: () => {
                return {}
            }
        }
    },
    computed: {
        /**
         * @author khalid
         * computed setter and getter model value
         */
        __model: {
            get(){
                return this.formData[this.component$.field]
            },
            set(val){
                this.$set(this.formData,this.component$.field,val)
            }
        },
        /**
         * get the passed component
         *
         * @return {default.props.component|{require}}
         * @author Amr
         */
        component$() {
            return this.field;
        },
        /**
         * get the passed component
         *
         * @return {default.props.component|{require}}
         * @author Amr
         */
        icon$() {
            return this.__extra.icon;
        },
    }
}
