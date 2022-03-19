<template>
    <ValidationProvider :rules="__rules" :name="__rowKey" v-slot="{ errors }">
        <b-form-group label="" v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group v-model="__model" :aria-describedby="ariaDescribedby">

                <b-form-checkbox v-for="(option , index) in __options" :value="option"
                                 :key="`form-group-checkbox-${__field}-${index}`"
                                 v-bind="__extra"
                                 @change="onCheckBoxClick"

                >{{option.label}}
                </b-form-checkbox>
            </b-form-checkbox-group>
        </b-form-group>
        <v-error :errors="errors"/>
    </ValidationProvider>
</template>
<script>
    import Base from '../../../mixins/Builder/CheckBox.js'

    export default {
        mixins: [Base]
    }
</script>
