<template>
  <div>
    <b-row align-h="end" class="mt-3 mb-3">
      <b-col cols="1" class="pt-2">
        <strong>Per Page </strong>
      </b-col>
      <b-col cols="2">
        <tree-select placeholder="Choose ..." v-model="selected_per_page" :options="per_page_options"/>
      </b-col>
    </b-row>
    <v-filter v-if="filters" :filters="filters"></v-filter>
    <b-row class="mb-4">
      <b-col>
        <vue-good-table
            :rtl="direction"
            :columns="columns"
            :rows="rows"
            styleClass="vgt-table table-hover condensed striped"
            theme="polar-bear">
          <!--                table table-hover table-bordered-->
          <v-table-row slot="table-row" slot-scope="props" :columns="props"
                       :actions="actions" @chosen-id="chosenId">
          </v-table-row>
        </vue-good-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <v-paginator :pagination="paginator">
        </v-paginator>
      </b-col>
    </b-row>
    <g-form-modal ref="formModalRef"/>
  </div>
</template>

<script>
import VPaginator from "../../common/table/VPaginator";
import VFilter from "../../common/table/Filters/VFilter";
import VTableRow from "../../common/table/VTableRow";
import GTable from "../../mixins/table/GTable";
import TreeSelect from '@riophae/vue-treeselect'

export default {
  name: 'BTable',
  components: {
    VPaginator,
    VFilter,
    VTableRow,
    TreeSelect
  },
  mixins: [GTable]
}
</script>

<style scoped>
</style>
