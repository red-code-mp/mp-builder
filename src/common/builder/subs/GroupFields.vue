<template>
    <b-row>
        <!-- START FIELD LABEL -->
        <template v-for="(field, index) in __fields">
            <!-- START FIELD LABEL -->
            <b-col v-if="__hasLabel(field)" :sm="__labelCols(field)">
                <b-label :value="field.label" :rules="__rules(field)" :key="`label-${index}`"/>
            </b-col>
            <!-- END FIELD LABEL -->
            <!-- START FIELD -->
            <b-col :sm="__fieldCols(field)">
                <field :component="field" :formData="formData" :key="`field-${index}`"/>
            </b-col>
            <!-- END FIELD -->
        </template>

    </b-row>
</template>
<script>
import GroupFields from '../../../mixins/Builder/GroupFields'
export default {
    mixins: [GroupFields],
    props: {
        indexField: {
            required: false,
            default: function () {
                return ''
            }
        },
        /**
         * component's object
         *
         * @author Amr
         */
        component: {
            required: true
        },
        /**
         * form fields' values
         *
         * @author Amr
         */
        values: {
            required: false,
            default: function () {
                return {};
            }
        },

            formData: {
                required: false,
                default: function () {
                    return {};
                }
            }
        },
        computed: {
            /**
             * return the passed component
             * @return {default.props.component|{required}}
             * @author Amr
             */
            component$() {
                return this.component;
            },

        __fields() {
            return this.component$.fields
        }
    },

}
</script>
