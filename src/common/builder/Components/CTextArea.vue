<template>
    <ValidationProvider :rules="__rules" :name="__rowKey" v-slot="{ errors }">
        <editor
                :api-key="apiKey$"
                initial-value=""
                v-model="__model"
                :init="options$"
        />
        <v-error :errors="errors"/>
    </ValidationProvider>
</template>
<script>
    import Base from '../../../mixins/Builder/TextArea.js'

    export default {
        mixins: [Base]
    }
</script>
