<template>
    <div>
        <component v-if="is_component" :is="column.field" :columns="columns" :row="row"
                   @chosen-id="chosenId"></component>
        <span v-else-if="row[column.field]">
           {{ row[column.field] }}
        </span>
        <span v-else>---</span>
    </div>
</template>


<script>
import VTableRow from "../../mixins/table/VTableRow";

export default {
    mixins: [VTableRow]
}
</script>

<style scoped>

</style>
