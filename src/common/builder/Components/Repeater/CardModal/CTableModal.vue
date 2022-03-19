<template>
    <b-container fluid>
        <b-row class="mb-3">
            <b-col cols="auto">
                <c-modal :formData="form$"/>
            </b-col>
        </b-row>
        <hr>
        <!-- Main table element -->
        <b-table
            responsive="sm"
            show-empty
            small
            stacked="md"
            :items="__items"
            :fields="__fields"
            :current-page="currentPage"
            :per-page="perPage"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            :empty-text="emptyText"
        >

            <template v-slot:cell(actions)="row">
                <b-button v-show="__infoModalVisible" pill variant="outline-dark" size="sm"
                          @click="info(row.item)" class="mr-1">
                    Info modal
                </b-button>
                <b-button v-show="__detailsModalVisible" pill variant="outline-dark" size="sm"
                          @click="row.toggleDetails">
                    {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
                </b-button>
                <b-button v-show="__editActionVisible" pill variant="outline-primary" size="sm">
                    Edit
                </b-button>
                <b-button v-show="__deleteActionVisible" pill variant="outline-danger" size="sm">
                    Delete
                </b-button>
            </template>

            <template v-slot:row-details="row">
                <b-card>
                    <ul>
                        <li class="mt-1" v-for="(item, index) in __infoDetailsAttr" :key="index">
                            <b class="text-info">{{ item.label }}</b> : <span>{{ row.item[item.key] }}</span>
                        </li>
                    </ul>
                </b-card>
            </template>
        </b-table>
        <!-- User Interface controls -->
        <b-row align-h="end">
            <b-col cols="3">
                <b-pagination pills
                              v-model="currentPage"
                              :total-rows="__totalRows"
                              :per-page="perPage"
                              align="fill"
                              size="sm"
                              class="my-0"
                ></b-pagination>
            </b-col>
        </b-row>
        <!-- Info modal -->
        <b-modal ref="info-modal" :title="infoModal.title" ok-only @hide="resetInfoModal">
            <template v-slot:modal-header-close>
              <span>x</span>
            </template>
            <ul>
                <li v-for="(item, index) in __infoModalAttrs" :key="index">
                    <b class="text-info">{{ item.label }}</b> : <span>{{ infoModal.content[item.key] }}</span>
                    <hr>
                </li>
            </ul>
        </b-modal>
    </b-container>
</template>

<script>
    import CModal from "./CModal";

    export default {
        components: {
            CModal
        },
        props: {
            field: {
                require: true,
                default: function () {
                    return {};
                }
            },
            formData: {
                required: false,
                default: function () {
                    return {};
                }
            },
        },
        data() {
            return {
                currentPage: 1,
                perPage: 5,
                pageOptions: [5, 10, 'all'],
                sortBy: '',
                sortDesc: false,
                sortDirection: 'asc',
                emptyText: 'There are no records to show',
                infoModal: {
                    title: '',
                    content: ''
                },
                form$: {}
            }
        },
        computed: {
            __rootField() {
                return this.field.field
            },
            __fields() {
                return this.field.table.fields
            },
            __items() {
                return this.formData[this.__rootField] ?? []
            },
            __infoModalVisible() {
                return this.field.table.actions.hasOwnProperty('infoModal') ? this.field.table.actions.infoModal.visible : false
            },
            __detailsModalVisible() {
                return this.field.table.actions.hasOwnProperty('infoDetails') ? this.field.table.actions.infoDetails.visible : false
            },
            __totalRows() {
                return this.formData[this.__rootField] ? this.formData[this.__rootField].length : 1
            },
            __infoDetailsAttr(){
                return this.field.table.actions.infoDetails.attrs ?? []
            },
            __infoModalTitle(){
                return this.field.table.actions.infoModal.title ?? '---'
            },
            __infoModalAttrs(){
                return this.field.table.actions.infoModal.attrs ?? []
            },
            __editActionVisible(){
                return this.field.table.actions.edit ?? false
            },
            __deleteActionVisible(){
                return this.field.table.actions.delete ?? false
            }
        },
        methods: {
            info(item, index, button) {
                this.infoModal.title = this.__infoModalTitle
                this.infoModal.content = item
                this.$refs['info-modal'].show()
            },
            resetInfoModal() {
                this.infoModal.title = ''
                this.infoModal.content = ''
            },
        }
    }
</script>

<style scoped>
    hr{
        margin-top: 1rem;
        margin-bottom: 1rem;
        border: 0;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
</style>
