<template>
    <component :is="__is" :form-data="formData"/>
</template>

<script>
    import Base from '../../../mixins/Builder/VDetail'

    export default {
        mixins: [Base],
        props: {
            indexField: {
                required: false,
                default: function () {
                    return ''
                }
            },
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>
