export default {
    props: {
        filter: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            timeout: null,
            value: null
        }
    },
    watch: {
        /**
         * @author khalid
         * @param val
         * update or delete route query
         */
        value(val) {

            clearTimeout(this.timeout);

            this.timeout = setTimeout(() => {
                if (!val) {
                    this.dropQuery(this.filter.slug)
                    return
                }
                this.pushQuery(this.filter.slug, val)
            }, 1000);
        }
    },
    methods: {},
    created() {
    },
    mounted() {
    },
    computed: {
        placeholder() {
            return this.filter.placeholder ?? null
        },
        title(){
            return this.filter.hasOwnProperty('title') ? this.$t(this.filter.title) : ''
        }
    }
}
