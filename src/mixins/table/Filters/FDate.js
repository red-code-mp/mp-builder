export default {
    props: {
        filter: {
            type: Object,
            required: true
        },
    },
    data(){
        return {
            date: null
        }
    },
    watch:{
        /**
         * @author khalid
         * @param val
         * update route query
         */
        date(val){
            if (!val) {
                this.dropQuery(this.filter.slug)
                return
            }
            this.pushQuery(this.filter.slug, val)
        }
    },
    methods:{
        resetDate(){
            this.date = null
        }
    },
    computed:{
        title(){
            return this.filter.hasOwnProperty('title') ? this.$t(this.filter.title) : ''
        }
    }
}
