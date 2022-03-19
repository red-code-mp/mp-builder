<template>
    <b-modal ref="native-modal" v-bind="config">
        <slot name="content"></slot>
    </b-modal>
</template>
<script>
    export default {
        props: {
            config: {
                required: false,
                default: function () {
                    return {}
                }
            }

        },
        methods: {
            show() {
                this.$refs['native-modal'].show()
            },
            hide() {
                this.$refs['native-modal'].hide()
            }
        }
    }
</script>
<style lang="scss">
    .modal-dialog {
        .close:before {
            content: '' !important;
        }
    }
</style>