export default {
    props: {
        filter: {
            type: Object,
            required: true
        },
    },
    data(){
        return {
            date_from: null,
            date_to: null
        }
    },
    watch:{
        /**
         * @author khalid
         * @param val
         * update route query
         */
        date_from(val){
            if (!val || !this.date_to) {
                this.dropQuery(this.filter.slug)
                return
            }
            this.pushQuery(this.filter.slug, this.joinValues)
        },
        /**
         * @author khalid
         * @param val
         * update route query
         */
        date_to(val){
            if (!val || !this.date_from) {
                this.dropQuery(this.filter.slug)
                return
            }
            this.pushQuery(this.filter.slug, this.joinValues)
        },
    },
    methods:{
        resetDate(){
            this.date_from = null
            this.date_to = null
        }
    },
    computed:{
        title_1(){
            return this.filter.hasOwnProperty('title_1') ? this.$t(this.filter.title_1) : 'From'
        },
        title_2(){
            return this.filter.hasOwnProperty('title_2') ? this.$t(this.filter.title_2) : 'To'
        },
        joinValues(){
            return this.date_from + ',' + this.date_to
        }
    }
}
