import Base from './base'
import {mapGetters} from "vuex";

export default {
    mixins: [Base],
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
        ...mapGetters('Company', ['getDateFormat', 'hasDateFormat']),
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
            get() {
                return this.formData[this.component$.field]
            },
            set(val) {
                this.set(this.formData, this.component$.field, this.$moment(val).format('YYYY-MM-DD'))
            }
        },
    },
    methods: {
        customFormatter(date) {
            return moment(date).format(this.hasDateFormat ? this.phpToMoment(this.getDateFormat) : this.getDateFormat);
        },
        /**
         * publish model's value via FormBuilder Bus
         * @param newVal
         * @param oldVal
         * @author Amr
         */
        model$Watcher(newVal, oldVal) {
            this.publish(this.$moment(newVal).format('YYYY-MM-DD'), oldVal);
        },
    },
    created() {
        if (this.component$.default)
            this.__model = new Date().toISOString().slice(0, 10).toString()
    },
}
