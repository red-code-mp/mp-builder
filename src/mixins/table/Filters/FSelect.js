export default {
    props: {
        filter: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            value: null,
            options: []
        }
    },

    methods: {
        /**
         * @author khalid
         * @param endPoint
         * @returns {{}}
         */
        checkParams(endPoint) {
            return endPoint.params ?? {}
        },

        /**
         * @author khalid
         * @param endPoint
         * @returns {{}}
         * check if endpoint has query property then prepare query if it exists
         */
        checkQuery(endPoint) {
            if (endPoint.hasOwnProperty('query'))
                return this.prepareParams(endPoint.query)
            return {type: 'select'}
        },

        /**
         * @author khalid
         * prepare endpoint options
         */
        prepareEndPointOptions(endPoint = {}) {
            let self = this
            return new Promise(resolve => {
                resolve(
                    this.request(this.route(endPoint.route, self.checkParams(endPoint), self.checkQuery(endPoint)))
                        .then(
                            (response) => {
                                self.options = self.options.concat(response.payload)
                            }
                        ).catch(
                        (error) => {
                        }
                    )
                );

            });
        },

        /**
         * @author khalid
         * push nullable option
         */
        prepareNullableOption(nullable = false) {
            if (!nullable)
                return
            let _nullable = {id: null, label: ''}
            this.options = this.options.concat(_nullable)
        },

        prepareDefaultOptions(options = []) {
            this.options = this.options.concat(options)
        },

        /**
         * @author khalid
         * return filter type method
         */
        filterTypes() {
            return {
                endPoint: 'prepareEndPointOptions',
                nullable: 'prepareNullableOption',
                default: 'prepareDefaultOptions'
            }
        },

        /**
         * @author khalid
         * prepare options
         */
        async prepareOptions() {
            let options = this.filter.options
            let self = this
            for (var key in options) {
                await self[self.filterTypes()[key]](options[key])
            }
        }
    },

    computed: {
        __disableBranchNodes() {
            return this.attributes.hasOwnProperty('disableBranchNodes') ? this.attributes.disableBranchNodes : true
        },
        /**
         * @author khalid
         * @returns {{}}
         * check filter has attributes
         */
        attributes() {
            return this.filter.attributes ?? {}
        },
        /**
         * @author khalid
         * @returns {VueI18n.TranslateResult|string}
         */
        title() {
            return this.filter.hasOwnProperty('title') ? this.$t(this.filter.title) : ''
        }
    },

    watch: {
        /**
         * @author khalid
         * @param val
         * update or delete route query
         */
        value(val) {
            if (val === undefined || val === null || val === '') {
                this.dropQuery(this.filter.slug)
                return
            }
            this.pushQuery(this.filter.slug, val)
        },
    },

    created() {
        this.prepareOptions()
    }
}
