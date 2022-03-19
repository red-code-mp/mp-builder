export default {
    props: ['columns', 'row'],
    inject: ['_actions'],
    data() {
        return {}
    },
    methods: {
        is_component(component) {
            return this.getActionComponents().includes(component)
        },
        chosenId(id) {
            this.$emit('chosen-id', id)
        },
        is_visible(item) {
            let result = true
            if (item.hasOwnProperty('is_visible')) {
                result = item.is_visible;
                if (item.is_visible instanceof Function)
                    result = item.is_visible.call(this, this.columns)
            }
            return result
        },
    },
    created() {
    }
}
