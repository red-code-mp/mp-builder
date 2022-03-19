export default {
    data() {
        return {}
    },
    methods: {
        /**
         * @author khalid
         * @param param
         * drop query param from url
         */
        dropQuery(param) {
            let query = Object.assign({}, this.$route.query);
            if (!query.hasOwnProperty(param))
                return
            delete query[param];
            this.$router.replace({query});
        },

        /**
         * @author khalid
         * @param param
         * @param val
         * push query param to url
         */
        pushQuery(param, val) {
            this.$router
                .push({
                    query: {
                        ...this.$route.query,
                        [param]: encodeURIComponent(val)
                    }
                }).catch(() => {
            })
        },

        /**
         * @author khalid
         * @param text
         * @param limit
         * @returns {string|*}
         * parse test with set dots
         */
        parseText(text, limit) {
            if (text.length > limit) {
                for (let i = limit; i > 0; i--) {
                    if (text.charAt(i) === ' ' && (text.charAt(i - 1) != ',' || text.charAt(i - 1) != '.' || text.charAt(i - 1) != ';')) {
                        return text.substring(0, i) + '...';
                    }
                }
                return text.substring(0, limit) + '...';
            } else
                return text;
        },

        /**
         * @author khalid
         * @param params
         * @returns {*}
         * prepare params
         */
        __prepareParams(params) {
            let __params = this.clone(params)
            Object.keys(__params).forEach((key) => {
                if (typeof __params[key] == 'function')
                    __params[key] = __params[key].call(this)
            });
            return __params;
        },
    }
}
