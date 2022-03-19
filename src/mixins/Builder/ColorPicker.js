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
         * get the passed component
         *
         * @return {default.props.component|{require}}
         * @author Amr
         */
        component$() {
            return this.field;
        },
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
    },
    methods: {
        /**
         * show the picker of colors if user click on
         * the readonly input
         * @author Amr
         */
        click() {
            this.$refs[this.__field].click();
        }
    }
}
