import Base from './base'

export default {
    mixins: [Base],
    props: {
        field: {
            required: true,
            default: () => {
                return {}
            }
        }
    },
    computed: {
        component$() {
            return this.field;
        },
        /**
         * @author khalid
         * @private
         * input type
         */
        __type() {
            return this.component$.type ?? 'text'
        },
        __is(){
            return this.field.is;
        }
    },
    methods: {
        onCreated() {
        }
    },
    watch: {
        // __model: {
        //     handler: function (newVal, oldVal) {
        //         // FormBuilder.$emit(this.component$.field, newVal)
        //     }
        // }
    }
}
