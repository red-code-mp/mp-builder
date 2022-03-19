<template>
    <div class="h5 mb-0">
        <b-row>
            <b-col v-if="is_visible(act)" v-for="(act, index) in actions" :key="index"
                   cols="auto">
                <component
                        v-if="is_component(act)"
                        :is="act.component"
                        :columns="columns"
                        :action="act"
                >
                </component>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import ReferenceActions from "../../../mixins/table/Actions/ReferenceActions";

    export default {
        mixins: [ReferenceActions]
    }
</script>

<style scoped>

</style>
