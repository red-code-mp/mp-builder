export default {
    props: {
        columns: {
            type: Object,
            required: true
        },
    },
    data() {
        return {}
    },
    created() {
    },
    mounted() {
    },
    methods: {
        chosenId(id) {
            this.$emit('chosen-id', id)
        }
    },
    computed: {
        row() {
            return this.columns.row
        },
        column() {
            return this.columns.column
        },
        /**
         * @author khalid
         * @returns {boolean}
         * check if components include field to render a field component
         */
        is_component() {
            return this.getColumnComponents().includes(this.column.field)
        }
    }
}
