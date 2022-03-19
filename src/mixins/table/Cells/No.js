export default {
    inject: ['paginate'],
    props: ['columns','row'],
    computed:{
        paginator(){
            return this.paginate.getAttributes
        }
    },
    mounted() {
    }
}
