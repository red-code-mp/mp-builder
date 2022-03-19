<template>
    <div>
        <b-col cols="12" class="ft-builder pb-3">
            <b-builder :fields="fields$"
                       :values="values"
                       :chunks="1"
                       :formData="form$"
                       :key="`form-builder-key${updateBuilder}`"
                       :show-actions="show_actions"
                       :actionsConfig="{add_more: false}"
            />
        </b-col>
        <b-col cols="12" class="ft-table pt-3">
            <g-table :config="tableConfig$" @chosen-id="chosenId" :key="`updateTable-${updateTable}`"></g-table>
        </b-col>
    </div>
</template>
<script>
    import FormTable from '../../../../mixins/Builder/FormTable/index.js'

    export default {
        mixins: [FormTable]
    }
</script>
<style lang="scss">
    .ft-builder {
        border-bottom: 0.07rem dashed #ebedf2;
    }

    .ft-table {
        .col-md-12.mb-30 {
            padding: 0;
        }
    }
</style>
