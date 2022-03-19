import Permissions from '../../../mixins/Permissions/Tables/IconPermissions'

export default {
    props: ['action', 'columns'],
    mixins : [Permissions],
    computed: {
        __action() {
            return this.action;
        },
        attributes() {
            return this.action.attributes
        },
        config$() {
            return this.columns.column.config ?? {};
        },
        row$() {
            return this.columns.formattedRow;
        },
        is_visible() {
            if (this.action.hasOwnProperty('is_visible')) {
                if (this.action.is_visible instanceof Function)
                    return this.action.is_visible.call(this, this.columns)
                return this.action.is_visible
            }
            return true
        }
    },
    methods: {
        doAction() {
            try {
                this.action.callback(this)
            } catch (e) {
                console.error('callback must be a function')
            }
        },
        chosenId(id) {
            this.$emit('chosen-id', id)
        }
    }
}
