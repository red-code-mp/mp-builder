import Builder from '../../../mixins/Builder'
import FormBuilder from './builder'
import FormTable from './table'

export default {
    mixins: [Builder, FormBuilder, FormTable],
    props: {
        component: {
            required: true,
            default: function () {
                return {}
            }
        }
    },
    data() {
        return {
            chosenId$: {},
            // form$: {},
            storeParams$: {},
            preventFetch: true,
            updateTable: 0,
            updateBuilder: 0,
            runTimeParams : {}
        }
    },

    computed: {
        /**
         * passed component from the outside
         * @return {*}
         * @author Amr
         */
        component$() {
            return this.component;
        },
        /**
         * passed options
         * @return {*}
         * @author Amr
         */
        options$() {
            return this.options;
        },


    },
    methods:{
        onCreated(){
            this.updateTable++;
            this.runTimeParams = this.builderConfig$.params
        }
    },
    watch: {
       '$route.params': {
           deep: true,
           immediate : true,
           handler(){
              this.updateTable++;
           }

        }
    }
}

