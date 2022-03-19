<template>
    <div>
        <b-form-file v-model="__model" ref="file-input" class="mb-2" v-bind="__extra"></b-form-file>
        <p class="mt-2" v-if="__model || __attachment "
           v-html="`File: <b> ${__model ? __model.name: __attachment}</b>`">
        </p>
    </div>
</template>
<script>
    import Base from '../../../mixins/Builder/Attachment'

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