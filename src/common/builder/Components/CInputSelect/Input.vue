<template>
    <input aria-label="Text input with dropdown button" v-model="__model" class="form-control" v-bind="__extra">
</template>
<script>
    import Base from '../../../../mixins/Builder/Input'

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
