<template>
    <native
            ref="modal"
            :config="config">
        <template v-slot:content>
            <img :src="img" alt="">
        </template>
    </native>
</template>
<script>
    import Native from './native'

    export default {
        components: {
            Native
        },
        data() {
            return {
                img: '',
                config: {
                    id: 'modal-center',
                    'hide-header': true,
                    'hide-footer': true,
                    centered: true,
                    ref: 'image-magnifier-modal',
                    'content-class': 'only-content'
                }
            }
        },
        created() {
            ModalBus.$on('image-magnifier', ($value) => {
                this.img = $value;
                this.$refs.modal.show()
            })
        }
    }
</script>
<style lang="scss">
    .only-content {
        width: auto !important;
    }
</style>