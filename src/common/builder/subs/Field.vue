<template>
    <!-- START CALLING THE MEANT FIELD -->
    <component :is="__name"
               :field="component$"
               :rowKey="rowKey"
               :formData="formData"
               :indexRow="indexRow"
               :all-form-data="allFormData"
               :root-field="rootField"/>
    <!-- END CALLING THE MEANT FIELD -->
</template>
<script>

    export default {
        props: {
            indexField: {
                required: false,
                default: function () {
                    return ''
                }
            },
            component: {
                require: true,
                default: function () {
                    return {};
                }
            },
            formData: {
                required: true
            },
            rowKey: {
                required: false,
                type: String
            },
            indexRow: {
                required: false,
            },
            allFormData: {
                require: false,
                default: function () {
                    return {};
                }
            },
            rootField: {
                required: false
            }
        },
        computed: {
            component$() {
                return this.component;
            },
            __predicatedName() {
                return `c-${this.component$.component}`
            },
            __name() {
                let name = this.capitalize(this.__predicatedName, ' ')
                return this.isValidComponent(name) ? this.__predicatedName : this.component$.component;
            },
        }
    }
</script>
