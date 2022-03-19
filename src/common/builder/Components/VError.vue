<template>
    <span class="form-text text-muted text-danger">
          <ul class="validation-error">
              <li v-for="(error , index) in getErrors(errors)"
                  :key="`error-${index}`"
                  v-html="error"></li>
          </ul>
    </span>
</template>
<script>
    export default {
        props: {
            errors: {
                required: true,
                default: function () {
                    return [];
                }
            }
        },
        methods: {
            /**
             * return validation errors
             *
             * @param errors
             * @return {Array|*}
             * @author Amr
             */
            getErrors(errors) {
                if (!errors || !this.isArray(errors))
                    return [];
                return errors;
            },
        }
    }
</script>
<style lang="scss" scoped>
    ul.validation-error {
        padding-left: 17px !important;
        padding-right: 17px !important;

        li {
            color: #f6397b;
        }
    }
</style>