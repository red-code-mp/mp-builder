<template>
    <b-builder :fields="tab.fields" :values="values" :chunks="chunks" :formData="formData" :options="options" :validation-errors="validationErrors"/>
</template>
<script>
    export default {
        props:{
            tab: {
                required: true,
                default: function () {
                    return {}
                }
            },
            values:{
                required: true,
                default: function () {
                    return {}
                }
            },
            formData:{
                required: false,
                default: function () {
                    return {};
                }
            },
            options: {
                required: false,
                default : function () {
                    return {}
                }
            },
            validationErrors: {
                required: false
            },
        },
        data() {
            return {
            }
        },
        computed:{
            chunks(){
                return this.tab.chunks ?? 1
            }
        }
    }
</script>
