<template>
    <div>
        <translation-field v-for="(field , index) in fields"
                           :rules="__rules"
                           :builder-field="__field"
                           :key="`translation-fields-${index}`"
                           @add-input="addInput"
                           :default-language="field"
                           :field-index="index"
                           @remove="removeInput"
                           @field-value="fieldValue"
                           :value="__model && __model.hasOwnProperty(field.code.toLowerCase()) ? __model[field.code.toLowerCase()] : undefined "
        />

    </div>
</template>
<script>
    import TranslationField from './CTranslation/fields'
    import Base from '../../../mixins/Builder/Translation'


    export default {
        mixins: [Base],
        components: {TranslationField},
    }
</script>