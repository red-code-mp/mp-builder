<template>
    <native
            ref="modal"
            :config="config">
        <template v-slot:content>
            <component :is="component" v-bind="payload"/>
        </template>
    </native>
</template>

<script>
    import Native from './native'

    export default {
        components: {Native},
        data() {
            return {
                config: {
                    id: 'default-modal'
                },
                component: '',
                payload: {}
            };
        },
        methods: {
            show() {
                this.$refs['native-modal'].show()
            },
            hide() {
                this.$refs['modal'].hide()
            }
        },
        created() {
            ModalBus.$on('default-modal', (component, payload = {}, config = {}) => {
                this.component = component
                this.payload = payload;
                if (!this.isEmptyObject(config))
                    this.config = config
                this.$refs.modal.show();

            })
            ModalBus.$on('default-modal-close', () => {
                this.$refs.modal.hide();
            });
        }
    }
</script>