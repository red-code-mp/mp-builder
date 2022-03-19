import {mapGetters} from 'vuex'
import Permissions from '../../mixins/Permissions/Tables/GTablePermissions'

export default {
    mixins:[Permissions],
    props: {
        config: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            paginator: {},
            rows: [],
            param: {},
            per_page_options: [{id: 10, label: 10},
                {id: 50, label: 50},{id: 100, label: 100},{id: 200, label: 200},{id: 300, label: 300},{id: 1000000, label: 'All'}],
            selected_per_page: null
        }
    },
    /**
     * @author khalid
     *
     */
    provide() {
        const paginate = {}
        Object.defineProperty(paginate, 'getAttributes', {
            enumerable: true,
            get: () => this.paginator,
        })

        const _actions = {}
        Object.defineProperty(_actions, 'getActions', {
            enumerable: true,
            get: () => this.config.actions,
        })

        return {paginate, _actions}
    },
    computed: {
        ...mapGetters('Auth', ['getPermissions', 'getPermissionRoutes', 'getPermissionTransactions']),
        columns() {
            if (this.isAuthorized)
                return this.config.columns ?? null
            return this.config.columns.filter(column => column.label.toLowerCase() != 'status' || (column.hasOwnProperty('is_authorized') && column.is_authorized))
        },
        actions() {
            return this.config.actions ?? null
        },
        filters() {
            return this.config.filters ?? null
        },
        direction() {
            return false
        },
    },
    methods: {
        chosenId(id) {
            this.$emit('chosen-id', id)
        },
        /**
         * @author khalid
         * get rows
         */
        fetch() {
            let endPoint = this.config.endpoint;
            let quires = this._prepareQuires(endPoint)
            this.request(this.route(endPoint.route, this._prepareParams(endPoint), {...quires, ...this.param}))
                .then(
                    (response) => {
                        this.rows = response.payload.data
                        this.paginator = response.payload.paginator
                    }
                ).catch(
                (error) => {
                }
            )

        },

        async getQueries() {
            return this.$route.query
        },

        /**
         * @author khalid
         * @param endPoint
         * @returns {*}
         * prepare route params
         */
        _prepareParams(endPoint) {
            if (endPoint.hasOwnProperty('params'))
                return this.prepareParams(endPoint.params)
            return {}
        },

        _prepareQuires(endPoint) {
            if (endPoint.hasOwnProperty('query'))
                return this.prepareParams(endPoint.query)
            return {}
        },
        __emitFormModal(event) {
            this.$refs.formModalRef.showModal(event)
        },
        __selectedPerPageWatcher(newVal){
            if (!newVal) {
                this.dropQuery('per_page')
                return
            }
            this.pushQuery('per_page', newVal)
            this.fetch()
        }
    },
    created() {

        /**
         * @author khalid
         * prepare url query then get rows
         */
        this.getQueries().then(result => {
            if (!result.page) {
                this.param = Object.assign({}, {...result, page: 1})
                this.$router.push({query: {...result, page: 1}})
            } else {
                this.param = Object.assign({}, {...result})
                this.fetch()
            }
        })
    },
    mounted() {
        ListBuilder.$on('reload-table', () => {
            this.fetch();
        })
        this.$root.$on('show-form-modal', this.__emitFormModal)
    },
    watch: {
        /**
         * @author khalid
         * @param page
         * make request when $route query change
         */
        '$route.query': function (page) {
            this.getQueries().then(result => {
                if (!result.page) {
                    this.$router.push({query: {...result, page: 1}})
                }
                this.param = Object.assign({}, {...result})
                this.fetch()
            })
        },
        selected_per_page: {
            handler: '__selectedPerPageWatcher'
        }
    },
    beforeDestroy() {
        ListBuilder.$off('reload-table')
        this.$root.$off('show-form-modal')
    }
}
