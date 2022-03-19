<template>
    <div>
        <b-builder :fields="fields$"
                   :values="values"
                   :chunks="1"
                   :formData="form$"
                   :key="`form-builder-key${updateBuilder}`"

        />
        <g-table :config="tableConfig$" @chosen-id="chosenId" :key="`updateTable-${updateTable}`"></g-table>
    </div>
</template>
<script>
import FormTable from '../../../mixins/Builder/FormTable'

export default {
    mixins: [FormTable]
}
</script>
