import Builder from '../../../mixins/Builder'
import * as _ from 'lodash'
import Settings from '../../../utils/builder'

export default {
    mixins: [Builder],
    provide() {
        /**
         * @author khalid
         * @type {{}}
         * provide observed object to make it reactive
         * provide current tab index, default 0 when current_tab key does not exists in url query
         */
        const currentTab = {}
        Object.defineProperty(currentTab, 'index', {
            enumerable: true,
            get: () => this.currentTabIndex,
        })

        /**
         * @author khalid
         * @type {default.methods.setCurrentTabIndex}
         * set current tab index
         */
        const setCurrentTabIndex = this.setCurrentTabIndex

        /**
         * @author khalid
         * @type {boolean}
         */
        const isVertical = this.isVertical
        /**
         * @author khalid
         * provide getter and setter for current tab index
         */
        return {currentTab, setCurrentTabIndex, isVertical}
    },
    data() {
        return {
            currentTabName: null,
            tabsFields: [],
            tabsKeys: [],
            currentTabIndex: 0,
            isVertical: false,
            tabForm: true
        }
    },
    computed: {
        /**
         * @author khalid
         * @returns {string}
         * @private
         */
        __generateRandomKey() {
            return `tab-builder-${Math.random().toString(36).substring(2, 8)}`
        }
    },
    methods: {
        /**
         * @author khalid
         * @returns {*}
         * return tabs fields
         */
        getTabsFields() {
            return this.tabs[this.currentTabIndex].fields.map((field) => {
                if (field.component === 'group-fields')
                    return field.fields.map((f) => {
                        return f.field
                    })
                else
                    return field.field
            })
        },

        /**
         * @author khalid
         * @returns {*}
         * return tabs keys
         */
        getTabsKeys() {
            return this.tabs.map((tab) => {
                return tab.key
            })
        },

        /**
         * @author khalid
         * check url query if contains current_tab key
         */
        checkCurrentTab() {
            if (this.$route.query.hasOwnProperty('current_tab'))
                this.currentTabIndex = this.tabsKeys.indexOf(this.$route.query.current_tab)
            else
                this.pushQuery('current_tab', this.tabsKeys[0])
        },

        /**
         * @author khalid
         * @param index
         */
        setCurrentTabIndex(index) {
            this.currentTabIndex = index
        },

        /**
         * @author khalid
         * @param newVal
         * @param oldVal
         * push current tab key to url
         */
        tabIndexWatcher(newVal, oldVal) {
            if (newVal === -1)
                return
            this.currentTabName = this.tabsKeys[newVal]
            this.pushQuery('current_tab', this.currentTabName)
            this.__preventFetch()
            this.clearData()
            // this.checkService()
            this.checkExternalEndPoint()
        },

        /**
         * @author khalid
         * keep form data alive
         */
        $afterSuccessSubmit(payload) {
            this.form$ = {...payload.payload}
            if (!this.__id)
                this.$router.push({
                    name: this.getEditRouteName(),
                    params: {id: payload.payload.id},
                    query: this.getQuires()
                })
        },
        /**
         * @author khalid
         * prepare values to current tab form
         */
        $beforeSubmit() {
            this.form$ = {
                ..._.pick(this.form$, _.flatten(this.getTabsFields())),
                tab_key: this.$route.query.current_tab
            }
        },
        /**
         * @author khalid
         * @returns {string}
         * return edit router name
         */
        getEditRouteName() {
            return `${this.__baseName}.edit`
        },

        /**
         * @author khalid
         * @returns {*}
         * get route quires
         */
        getQuires() {
            return this.$route.query
        },

        /**
         * @author khalid
         * check if the current tab has own endpoint property
         */
        checkExternalEndPoint() {
            if (!this.tabs[this.currentTabIndex].hasOwnProperty('endpoint') && !this.tabs[this.currentTabIndex].hasOwnProperty('service')) {
                this.clearEndpoints()
            } else if (this.tabs[this.currentTabIndex].hasOwnProperty('endpoint')) {
                this.prepareExternalEndPoint()
            } else if (this.tabs[this.currentTabIndex].hasOwnProperty('service')) {
                this.prepareService()
            }
            this.fetchObject()
        },

        /**
         * @author khalid
         * check if the current tab has own endpoint property
         */
        checkService() {
            if (!this.tabs[this.currentTabIndex].hasOwnProperty('service')) {
                this.clearService()
            } else {
                this.prepareService()
            }
            this.fetchObject()
        },

        /**
         * @author khalid
         * clear form data and values
         */
        clearData() {
            this.form$ = {}
            this.values = {}
        },

        /**
         * @author khalid
         * @param newVal
         * @param oldVal
         * @private
         * prevent duplicate {fetchObject} request from {__idWatcher} and {tabIndexWatcher}
         */
        __idWatcher(newVal, oldVal) {
            if (!newVal)
                return;
            if (this.currentTabIndex === 0)
                this.fetchObject();
        },

        /**
         * @author khalid
         * clear endpoint objects
         */
        clearEndpoints() {
            this.editEndpoint = {}
            this.findEndpoint = {}
        },
        clearService() {
            this.editEndpoint = {}
            this.findEndpoint = {}
            // this.storeEndpoint = {}
        },

        /**
         * @author khalid
         * prepare external tab endpoints
         */
        prepareExternalEndPoint() {
            this.editEndpoint = this.route(this.getExternalEndpoint() + '.update', {id: this.__id})
            this.findEndpoint = this.route(this.getExternalEndpoint() + '.find', {id: this.__id})
        },
        prepareService() {
            this.editEndpoint = this.route(this.getServiceName() + '.update', this.getServiceParams(), this.getServiceQueries())
            this.findEndpoint = this.route(this.getServiceName() + '.find', this.getServiceParams(), this.getServiceQueries())
            // this.storeEndpoint = this.route(this.getServiceName() + '.store', this.getServiceParams())
        },
        /**
         * @author khalid
         * @returns {{route: string}|{route: string, params: [string]}|string|string}
         * get name of current tab endpoint
         */
        getExternalEndpoint() {
            return this.tabs[this.currentTabIndex].endpoint
        },

        getService() {
            return this.tabs[this.currentTabIndex].service
        },

        getServiceName() {
            return this.getService().name
        },
        getServiceParams() {
            let params = {}
            if (this.getService().hasOwnProperty('params'))
                params = this.getService().params
            let __params = {}
            Object.keys(params).forEach((key) => {
                let value = params[key] instanceof Function ? params[key].call(this) : params[key]
                __params[key] = value
            })
            return __params
        },
        getServiceQueries() {
            let queries = {}
            if (this.getService().hasOwnProperty('query'))
                queries = this.getService().query
            let __queries = {}
            Object.keys(queries).forEach((key) => {
                let value = queries[key] instanceof Function ? queries[key].call(this) : queries[key]
                __queries[key] = value
            })
            return __queries
        },
        __preventFetch() {
            this.preventFetch = this.tabs[this.currentTabIndex].preventFetch ?? false
        }
    },
    mounted() {
    },
    created() {
        /**
         * @author khalid
         * initialize tabs keys
         */
        this.tabsKeys = this.getTabsKeys()
        this.checkCurrentTab()
    },
    watch: {
        immediate: true,
        /**
         * @author khalid
         * watch tabIndex change's
         */
        currentTabIndex: 'tabIndexWatcher',
    }
}
