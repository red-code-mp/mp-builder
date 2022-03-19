<template>
    <div>
        <div class="form-group">
            <label style="font-weight: 500;">Search</label>
            <div class="input-group input-group-sm">
                <input type="text" class="form-control" placeholder="Search ..." aria-describedby="basic-addon2"
                       @input="search" v-model="searchedValue" name="tree-search">
                <div class="input-group-append">
																<span class="input-group-text">
                                                                    <b-icon icon="search"></b-icon>
																</span>
                </div>
            </div>
        </div>
        <v-jstree :data="data" size="large" collapse :key="key" v-bind="__attributes" klass="custom-tree-node">
            <template slot-scope="_">
                <b-row style="display: inherit; width: 200px" :title="_.model.text" class="custom-row-title">

                    <b-col :cols="9" @click.click="itemClick(_.model)" class="float-left"
                    >
                        <i :class="selected.id == _.model.id ? 'fa fa-check': __icon" role="presentation"
                           v-if="__icon" @click.click="itemClick(_.model)"></i>
                        {{_.model.text}}
                    </b-col>
                    <slot/>
                </b-row>
            </template>
        </v-jstree>
        <b-alert v-if="hasData" show variant="warning">There is no available category</b-alert>
    </div>
</template>
<script>
    import VJstree from 'vue-jstree'

    export default {
        components: {
            VJstree
        },
        props: {
            service: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            configs: {
                type: Object,
                default: function () {
                    return {}
                }
            }
        },
        data() {
            return {
                key: 0,
                searchedValue: '',
                data: [],
                data$: [],
                selected: {},
                hasData: false
            }
        },
        methods: {
            /**
             * back-end searching method
             * @author Amr
             */
            search: _.debounce(function (value) {
                let params = {
                    tree_search: true
                }
                if (!this.searchedValue || this.searchedValue.trim() == '') {
                    delete params.tree_search;
                }
                params[this.__searchingKey] = this.searchedValue;
                this.__fetchData(this.service, params)
            }, 500),
            /**
             * prepare the request's instance
             * @param link
             * @return {*|Promise<unknown>}
             * @private
             * @author Amr
             */
            __request(link, params = {}) {
                return this.request(link, params);
            },
            /**
             * prepare request's link
             *
             * @param service
             * @return {*}
             * @private
             * @author Amr
             */
            __prepareLink(service, params = {}) {
                let _params = {
                    ...params,
                    ...service.params
                }
                return this.route(service.route, service.query, _params)
            },
            /**
             * fetch the data of tree
             * @param service
             * @param params
             * @private
             * @author Amr
             */
            __fetchData(service, params = {}) {
                let link = this.__prepareLink(service, params);
                this.__request(link)
                    .then(({payload}) => {
                        this.data = payload;
                        this.hasData = payload.length == 0;
                        this.data$ = this.clone(payload, true);
                        this.key = this.key + 1;
                    })
                    .catch((response) => {
                    })
            },
            /**
             * select tree's item
             * @param item
             * @author Amr
             */
            itemClick(item) {
                this.$emit('chosen-item', item)
                this.selected = item;
            }
        },
        computed: {
            /**
             * tree's passed configs
             * @author Amr
             */
            __configs() {
                return this.configs;
            },
            /**
             * tree node's icon
             * @author Amr
             */
            __icon() {
                return this.__configs.icon;
            },
            /**
             * searched key
             * @author Amr
             */
            __searchingKey() {
                return this.__configs.searching_key;
            },
            /**
             * attributes binded with  the Jstree component
             * @author Amr
             */
            __attributes() {
                return this.__configs.binded_attributes ?? {};
            }
        },
        /**
         * vue created method
         * @author Amr
         */
        created() {
            this.__fetchData(this.service);
        },
    }
</script>

