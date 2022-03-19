<template>
    <label v-html="label$"></label>
</template>
<script>
    export default {
        props: {
            value: {
                required: true,
                default: null
            },
            rules: {
                required: false,
                default: function () {
                    return {}
                }
            }
        },
        computed: {
            /**
             * check if there is label's content
             *
             * @return {boolean}
             * @author Amr
             */
            hasContent() {
                return this.value !== null
            },
            /**
             * returns label's content
             * @return {string}
             * @author Amr
             */
            label$() {
                return this.$t(this.value) + (this.isRequired ? ' <span class="text-danger">*</span>' : '');
            },
            /**
             * show the red star if field is required
             * @return {boolean}
             * @author Amr
             */
            isRequired() {
                return this.rules.hasOwnProperty('required') && this.rules.required === true;
            }
        }
    }
</script>