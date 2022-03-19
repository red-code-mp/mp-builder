<template>
    <div class="h5 mb-0">
        <b-row>
            <b-col v-for="(action, index) in _actions.getActions" :key="index"
                   cols="auto" v-if="is_visible(action)">
                <component
                        v-if="is_component(action.component)"
                        :is="action.component"
                        :columns="columns"
                        :action="action"
                        @chosen-id="chosenId">
                </component>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import Actions from "../../../mixins/table/Cells/Actions";
    export default {
        mixins: [Actions]
    }
</script>

<style scoped>

</style>
