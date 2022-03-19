<template>
    <b-form-group :id="`input-${filter.slug}`" :label="title" :label-for="filter.slug">
        <treeselect
            :options="options"
            v-model="value"
            @change="onChange($event, filter.slug)"
            v-bind="attributes"
            :disable-branch-nodes="__disableBranchNodes"
        />
    </b-form-group>
</template>

<script>
    import Treeselect from "@riophae/vue-treeselect";
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    import FSelect from "../../../mixins/table/Filters/FSelect";

    export default {
        components: { Treeselect },
        mixins: [FSelect]
    }
</script>

<style scoped>

</style>
