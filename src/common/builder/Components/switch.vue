<template>
    <ValidationProvider :rules="__rules" :name="__rowKey" v-slot="{ errors }">
        <div>
            <div class="kt-switch">
                <label>
                    <input type="checkbox" v-model="__model" v-bind="__extra">
                    <span></span>
                </label>
            </div>
        </div>
    </ValidationProvider>
</template>
<script>
    import Base from '../../../mixins/Builder/switch'

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
        },
    }
</script>
