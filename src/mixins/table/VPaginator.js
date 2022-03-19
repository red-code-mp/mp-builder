export default {
    props: {
        pagination: {
            type: Object,
            required: true
        }
    },
    watch: {
        'pagination.last_page': {
            handler: function (newPage, oldPage) {
                if(this.pagination.current_page > newPage)
                {
                    this.$router
                        .push({
                            query: {
                                ...this.$route.query,
                                page: 1
                            }
                        })
                        .catch(() => {
                        });
                }
            },
            deep: true,
            immediate: false
        }
    },
    methods: {
        /**
         * @author khalid
         * @param pageNum
         * update route query with new page
         */
        linkGen(pageNum) {
            return {
                query: {...this.$route.query, page: pageNum }
            }
        }
    }
}
