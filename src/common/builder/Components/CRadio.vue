<template>
    <ValidationProvider :rules="__rules" :name="__rowKey" v-slot="{ errors }">
        <b-form-group>
            <b-form-radio-group
                v-model="__model"
                v-bind="__extra"
            >
                <b-form-radio v-for="(option , index) in __options" :value="option"
                              :key="`form-group-radio-${index}`" :name="`form-radio-${component$.field}`">
                    {{option.label}}
                </b-form-radio>
            </b-form-radio-group>
        </b-form-group>
        <v-error :errors="errors"/>
    </ValidationProvider>
</template>
<script>
    import Base from '../../../mixins/Builder/Radio.js'

    export default {
        mixins: [Base]
    }
</script>
