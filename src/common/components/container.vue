<template>
    <div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
        <div class="kt-portlet">
            <div class="kt-portlet__head">
                <div class="kt-portlet__head-label">
                    <h3 class="kt-portlet__head-title">
                        {{ __header }}
                    </h3>
                </div>
                <div v-if="__isCustom" class="mt-2">
                    <component :is="__customHeaderContainer"/>
                </div>
                <div class="kt-portlet__head-label" v-else>
                    <h3 class="kt-portlet__head-title">
                        <router-link v-if="__isDefaultActions" :to="action.route" v-for="(action, index) in actions" :key="index">
                            <b-button pill variant="outline-secondary" size="md" class="m-1">
                                <b-icon :icon="action.icon" aria-hidden="true"></b-icon>
                                {{ action.text }}
                            </b-button>
                        </router-link>
                        <container-header v-if="__isMoreActions" class="mt-2"/>
                    </h3>
                </div>
            </div>
            <div class="kt-portlet__body">
                <slot/>
            </div>
            <div class="kt-portlet__foot">
                <div class="kt-form__actions">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            actions: [],
            header__: null
        }
    },
    props: {
        header: {
            required: false,
            default: ''
        },
        endpoint: {
            required: false,
            default: function () {
                return this.header;
            }
        }
    },
    provide() {
        const injectHeader = this.injectHeader
        return {injectHeader}
    },
    computed: {
        /**
         * keyword used to predicated the header if component
         * @author Amr
         */
        splitedRouters() {
            return ['all', 'index', 'edit', 'create', 'list', 'info'];
        },
        /**
         * @author khalid
         * @returns {VueI18n.TranslateResult}
         * @private
         * prepare text by getting props name
         */
        __header() {
            if (this.header__)
                return `Edit * ${this.header__} * Inventory`
            if (this.__metaHeader)
                return this.$t(this.__metaHeader)
            if (this.__metaRoute)
                return this.$t(this.$route.name)
            let route = this.$route.name.split('.')

            let routeName = route[route.length - 1];
            if (this.splitedRouters.includes(routeName))
                return this.$t(`${this.header}.${route[route.length - 1]}`)
            return this.$t(`${this.header}`)
        },
        /**
         * @author khalid
         * return route params from meta
         **/
        __metaRouteParams() {
            return this.$route.meta.route.params ?? {}
        },
        /**
         * @author khalid
         * return meta route
         **/
        __metaRoute() {
            return this.$route.meta.route
        },
        __isCustom() {
            return this.$route.meta.hasOwnProperty('header_container')
        },
        __customHeaderContainer() {
            return this.$route.meta.header_container
        },
        __metaHeader() {
            return this.$route.meta.header
        },
        __isMoreActions() {
            return this.$route.meta.more_actions ?? false
        },
        __isDefaultActions(){
            return this.$route.meta.default_actions ?? true
        }
    },
    methods: {
        injectHeader(value) {
            this.header__ = value
        },
        /**
         * @author khalid
         * @returns {boolean}
         * @private
         * check if route name includes edit or create string
         */
        _checkRouterName() {
            return ['create', 'edit', 'info'].some(e => this.$route.name.split('.').includes(e))
        },
        /**
         * @author khalid
         * @returns {boolean}
         * @private
         * check if route name includes all or edit string
         */
        checkRouterName_() {
            return ['all', 'edit'].some(e => this.$route.name.split('.').includes(e))
        },
        /**
         * @author khalid
         * prepare route
         **/
        __prepareRoute(page) {
            if (this.__metaRoute) {
                let splitRoute = this.$route.name.split('.')
                splitRoute.splice(-1, 1)
                return {
                    name: `${splitRoute.join('.')}.${page}`,
                    params: this.__prepareParams(this.__metaRouteParams)
                }
            }
            return {name: `${this.endpoint}.${page}`}
        },
    },
    created() {
        /**
         * @author khalid
         * return create and list actions if the current route is edit, else return create or list action
         */
        if (this._checkRouterName()) {
            this.actions.push({icon: 'list-stars', text: 'list', route: this.__prepareRoute('all')})
        }
        if (this.checkRouterName_()) {
            this.actions.push({icon: 'plus', text: 'New', route: this.__prepareRoute('create')})
        }
    }
}
</script>

<style scoped>

</style>
