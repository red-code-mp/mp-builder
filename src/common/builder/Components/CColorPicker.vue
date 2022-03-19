<template>
    <ValidationProvider :rules="__rules" :name="__rowKey" v-slot="{ errors }">
        <div class="input-group">
            <input type="text" class="form-control" v-model="__model" readonly @click="click" v-bind="__extra">
            <div class="input-group-append">
                <input :ref="__field" type="color" class="color-picker" v-model="__model">
            </div>
        </div>
        <v-error :errors="errors"/>
    </ValidationProvider>
</template>
<script>
    import Base from '../../../mixins/Builder/ColorPicker.js'

    export default {
        mixins: [Base]
    }
</script>
<style lang="scss">
    input[type="color"] {
        -webkit-appearance: none;
        border: none;
        padding: 0 !important;
        outline: none;
        background: transparent;
        cursor: pointer;
    }


    .color-picker {
        border-radius: 0;
        height: auto;
    }

    .color-picker::-webkit-color-swatch-wrapper {
        padding: 0;
        border: none !important;
    }

    .color-picker::-webkit-color-swatch {
        border: none;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }

</style>
