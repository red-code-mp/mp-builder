<template>
    <ValidationProvider :rules="__rules" :name="__rowKey" v-slot="{ errors }">
        <json-viewer :value="__model" v-bind="__extra"></json-viewer>
    </ValidationProvider>
</template>
<script>
    import Base from '../../../mixins/Builder/JsonViewer'
    import 'vue-json-viewer/style.css'

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
<style lang="scss">
    .jv-code {
        height: 425px;
        overflow-y: auto !important;
        background: rgb(34, 34, 34);
        border-radius: 4px;

        .jv-key, .jv-item.jv-object {
            color: #ffffff !important;
        }
    }
</style>