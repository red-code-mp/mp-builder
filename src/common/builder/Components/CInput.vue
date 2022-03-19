<template>
    <ValidationProvider :rules="__rules" :name="__rowKey" v-slot="{ errors }">
        <div class="input-group">
            <input v-if="__type === 'hidden'" type="hidden" name="hidden" :v-model="__model">
            <b-form-input v-else :type="__type" v-model="__model" :name="__rowKey" class="form-control" v-bind="__extra"
                          separator=" ,;"/>
        </div>
        <v-error :errors="errors"/>
    </ValidationProvider>
</template>

<script>
    import Base from '../../../mixins/Builder/Input'

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
