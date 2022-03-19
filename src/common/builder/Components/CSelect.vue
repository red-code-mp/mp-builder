<template>
    <div>
        <ValidationProvider :rules="__rules" :name="__rowKey" v-slot="{ errors }">
            <div id="app">
                <b-row>
                    <b-col>
                        <tree-select v-model="__model" :name="__rowKey" :multiple="isMultiple"
                                     :options="__options" v-bind="__attributes" :disabled="is_disabled"
                                     :disable-branch-nodes="__disableBranchNodes"
                                     open-direction="bottom"
                                     @select="onChange"/>
                    </b-col>
                    <b-col cols="1" v-show="__quickCreate">
                        <b-input-group size="sm">
                            <b-button variant="light" size="sm" @click.prevent="quickCreate()">
                                <b-icon icon="plus-circle" variant="success"></b-icon>
                            </b-button>
                        </b-input-group>
                    </b-col>
                </b-row>
            </div>
            <v-error :errors="errors"/>
        </ValidationProvider>
        <c-form-modal :ref="__generateRandomRef" @refreshSelect="refreshSelect"/>
    </div>
</template>
<script>
    import TreeSelect from '@riophae/vue-treeselect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    import Base from '../../../mixins/Builder/Select.js'

    export default {
        components: {TreeSelect},
        mixins: [Base],
    }
</script>
<style scoped>

</style>
