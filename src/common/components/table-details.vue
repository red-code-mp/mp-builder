<template>
    <b-container fluid>
        <div class="mb-5">
            <b-card no-body class="overflow-hidden" style="max-height: 14rem">
                <b-row no-gutters>
                    <b-col v-if="__image" md="3">
                        <b-card-img :src="__image" alt="Image" class="rounded-0"
                                    ></b-card-img>
                    </b-col>
                    <b-col :md="!__image ? '12' : '9'">
                        <div style="max-height: 14rem;overflow-y: scroll;">
                            <b-card-body title="">
                                <b-card-text>
                                    <b-row>
                                        <ul>
                                            <li v-for="(detail, index) in __details" :key="index" class="mb-2">
                                                <strong class="mr-3">{{detail.label}}:</strong>
                                                <b-badge v-if="__valueType(detail.value)" pill variant="secondary">
                                                    {{detail.value}}
                                                </b-badge>
                                                <label v-else>{{detail.value}}</label>
                                            </li>
                                        </ul>
                                    </b-row>
                                </b-card-text>
                            </b-card-body>
                        </div>
                    </b-col>
                </b-row>
            </b-card>
        </div>
        <!-- User Interface controls -->
        <b-row>
            <b-col sm="5" md="6" class="my-1">
                <b-form-group
                    label="Per page"
                    label-for="per-page-select"
                    label-cols-sm="6"
                    label-cols-md="4"
                    label-cols-lg="3"
                    label-align-sm="left"
                    label-size="sm"
                    class="mb-0"
                >
                    <b-form-select
                        id="per-page-select"
                        v-model="perPage"
                        :options="pageOptions"
                        size="sm"
                    ></b-form-select>
                </b-form-group>
            </b-col>

            <b-col sm="7" md="6" class="my-1">
                <b-pagination
                    v-model="currentPage"
                    :total-rows="__totalRows"
                    :per-page="perPage"
                    align="fill"
                    size="sm"
                    class="my-0"
                ></b-pagination>
            </b-col>
        </b-row>

        <!-- Main table element -->
        <b-table
            :items="__items"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :filter-included-fields="filterOn"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            stacked="md"
            show-empty
            small
            @filtered="onFiltered"
        >
        </b-table>

    </b-container>
</template>

<script>
import Label from "../builder/subs/label";
export default {
    components: {Label},
    props:{
        fields: {
            required: true,
            default: function () {
                return []
            }
        },
        payload: {
            required: false,
            default: function () {
                return {}
            }
        }
    },
    data() {
        return {
            currentPage: 1,
            perPage: 5,
            pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
        }
    },
    computed: {
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return { text: f.label, value: f.key }
                })
        },
        __items(){
            return this.payload.properties ?? []
        },
        __details(){
            return this.payload.details ?? []
        },
        __image(){
            return this.payload.image
        },
        __totalRows(){
            // Set the initial number of items
            return this.__items.length ?? 1
        }
    },
    mounted() {

    },
    methods: {
        onFiltered(filteredItems) {
            // Trigger pagination to update the number of buttons/pages due to filtering
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        __valueType(value){
            return typeof value == 'number' ? true : false
        }
    }
}
</script>

<style scoped>

</style>
