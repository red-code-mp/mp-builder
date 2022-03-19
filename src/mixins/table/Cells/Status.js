import Permissions from '../../../mixins/Permissions/Tables/StatusPermissions'
export default {
    props: ['columns', 'row'],
    mixins: [Permissions],
    data() {
        return {}
    },
    methods: {
        /**
         * @author khalid
         * @param event
         * change status
         */
        onClick(event) {
            this.$refs[this.__generateRandomRef].checked = !event.target.checked
            this.getStatusCallback({
                column: this.columns.column,
                row: this.row,
                val: {is_active: !event.target.checked}
            })
                .then(
                    (response) => {
                        this.$refs.stInput.checked = !event.target.checked
                    }
                ).catch((error) => {
            })
        },
    },
    computed: {
        /**
         * @author khalid
         * get status
         */
        status: {
            get() {
                return this.row[this.columns.column.attr]
            }
        },
        /**
         * get the current object of column
         * @returns {*}
         * @author Amr
         */
        currentColumn() {
            return this.columns.column;
        },
        /**
         * @author khalid
         * @returns {string}
         * @private
         * generate random ref
         */
        __generateRandomRef() {
            return `stInput-${Math.random().toString(36).substring(2, 8)}`
        },
    }
}
