export default {
    props: {
        field: {
            required: true,
            type: Object
        },
        formData: {
            required: false,
            default: function () {
                return {}
            }
        }
    },
    data() {
        return {}
    },

    computed: {
        attributes() {
            return Object.keys(this.formData)
        }
    },

    methods: {
        getData(key) {
            return this.formData[key] !== null ? this.formData[key] : 'Unknown'
        },
        getAttribute(attribute) {
            return this.ucfirst(attribute.replace(/(_)/g, ' '))
        }
    },
    created() {}
}
