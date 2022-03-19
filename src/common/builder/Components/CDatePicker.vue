<template>
    <ValidationProvider :rules="__rules" :name="__rowKey" v-slot="{ errors }">
        <datepicker v-model="__model" input-class="form-control" :format="customFormatter" v-bind="__extra"/>
        <v-error :errors="errors"/>
    </ValidationProvider>
</template>
<script>
    import Datepicker from 'vuejs-datepicker';
    import Base from '../../../mixins/Builder/DatePicker.js'

    export default {
        components: {Datepicker},
        mixins: [Base]
    }
</script>
