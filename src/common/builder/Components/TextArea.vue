<template>
    <ValidationProvider :rules="__rules" :name="__rowKey" v-slot="{ errors }">
        <div class="input-group">
            <b-textarea v-model="__model" class="form-control" v-bind="__extra"/>
        </div>
        <v-error :errors="errors"/>
    </ValidationProvider>
</template>

<script>
    import Base from '../../../mixins/Builder/BTextArea'
    export default {
        mixins: [Base],
        props:{
            indexField:{
                required: false,
                default : function () {
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
