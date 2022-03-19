<template>
    <div>
        <b-overlay
            :show="getOverlay.overlay"
            spinner-variant="primary"
            spinner-type="grow"
            spinner-larg
        >
            <b-tabs
                :vertical="isVertical"
                v-model="tabIndex"
                @click.prevent="tabClick"
                content-class="mt-3"
                active-nav-item-class="font-weight-bold text-uppercase text-secondary"
            >
                <b-tab v-for="(tab, index) in tabs" :key="index" lazy
                       :disabled="isDisabled(index) || !__is_visible_tab(tab)">
                    <template v-slot:title>
                        <b-icon v-show="hasIcon(tab)" :icon="tab.icon" class="mr-2 ml-2"></b-icon>
                        {{ tab.title }}
                    </template>
                    <tab-form :tab="tab" :values="values" :formData="formData" :options="options(tab)"
                              :validation-errors="validationErrors"/>
                </b-tab>
            </b-tabs>
        </b-overlay>
    </div>
</template>

<script>
import Settings from '../../../utils/builder'
import {mapGetters} from 'vuex'
import Permissions from '../../../mixins/Permissions/Builder/TabPermissions'

export default {
    name: "BTabBuilder",
    inject: ['currentTab', 'setCurrentTabIndex', 'isVertical', 'getOverlay'],
    mixins: [Permissions],
    props: {
        tabs: {
            type: Array,
            required: true
        },
        values: {
            required: true
        },
        formData: {
            required: false,
            default: function () {
                return {};
            }
        },
        validationErrors: {
            required: false
        },
        basicData: {
            required: false,
            default: function () {
                return {}
            }
        }
    },
    data() {
        return {}
    },
    computed: {
        /**
         * @author khalid
         * computed setter and getter for current tab index
         */
        tabIndex: {
            get() {
                return this.currentTab.index
            },
            set(index) {
                this.setCurrentTabIndex(index)
            }
        },
    },
    methods: {
        /**
         * @author khalid
         * @param tab
         * @returns {boolean}
         */
        hasIcon(tab) {
            return tab.hasOwnProperty('icon')
        },
        /**
         * @author khalid
         * @param index
         * @returns {boolean|boolean}
         * set disabled tab if route is edit type
         */
        isDisabled(index) {
            return index !== 0 && !this.$route.params.hasOwnProperty('id')
        },

        /**
         * @author khalid
         * @param tab
         */
        options(tab) {
            let showActions = true;
            if (tab.preventActions) {
                showActions = typeof tab.preventActions === "function" ? !tab.preventActions.call(this) : !tab.preventActions
            } else {
                tab.fields.some(function (item, key) {
                    if (Settings.advancedComponent$.includes(item.component)) {
                        showActions = false
                        return true; // break
                    }
                });
            }
            return {showActions: showActions}
        },
        /**
         * @author khalid
         * @param tab
         * @returns {boolean}
         * @private
         */
        __is_visible_tab(tab) {
            let result = tab.is_visible ?? true;
            if (typeof tab.is_visible === 'function') {
                result = tab.is_visible.call(this)
            }
            return result && this.isAuthorized(tab);
        },
    },
}
</script>

<style scoped>

</style>
