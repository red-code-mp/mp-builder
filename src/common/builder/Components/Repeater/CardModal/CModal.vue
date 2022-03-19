<template>
    <div>
        <b-button
            v-b-modal.modal-prevent-closing
            pill
            variant="outline-info"
            size="md"
            class="pr-5 pl-5"
            @click="prepareCreteEndpoint()">
            new ..
        </b-button>

        <b-modal
            id="modal-prevent-closing"
            :title="__title"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
            :noCloseOnBackdrop="true"
            :noCloseOnEsc="true"
        >
            <template v-slot:modal-header-close>
                <span>x</span>
            </template>
            <b-builder :fields="__fields" :formData="form$"
                       ref="modalBuilder" :show-actions="false" :validationErrors="validationErrors"/>
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
    </div>
</template>

<script>
import Builder from '../../../../../mixins/Builder/CardModal/Modal'

export default {
    mixins: [Builder],
    methods: {

        resetModal() {

        },
        handleOk(bvModalEvt) {

        },
        handleSubmit() {
            // this.$nextTick(() => {
            //     this.$bvModal.hide('modal-prevent-closing')
            // })
        },
    }
}
</script>

<style scoped>

</style>
