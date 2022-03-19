<template>
    <b-modal
        :id="__generateFormBuilderID"
        v-bind="__attributes"
    >
        <template v-slot:modal-header-close>
            <b-icon icon="x"></b-icon>
        </template>
        <component :is="__component" :key="count" ref="formBuilder"/>
        <template #modal-footer>
            <div>
                <b-button
                    variant="light"
                    size="sm"
                    class="float-right"
                    @click="hideModal()">
                    Close
                </b-button>

                <b-button
                    variant="primary"
                    size="sm"
                    class="float-right ml-2 mr-2"
                    @click="__save()"
                >
                    Save
                </b-button>
            </div>
        </template>
    </b-modal>
</template>

<script>
import FormModal from "../../../mixins/Builder/FormModal";
export default {
    mixins: [FormModal],
}
</script>

<style scoped>

</style>
