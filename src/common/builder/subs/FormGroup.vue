<template>
    <div>
        <b-row>
            <!-- START FIELD LABEL -->
            <b-col :sm="__labelCols" v-if="__hasLabel">
                <b-label :value="component$.label" :rules="__rules"/>
            </b-col>
            <!-- END FIELD LABEL -->
            <!-- START FIELD -->
            <b-col :sm="__fieldCols">
                <field :component="component$" :values="values" :formData="formData"/>
            </b-col>
            <!-- END FIELD -->
        </b-row>
    </div>
</template>
<script>
    import Base from '../../../mixins/Builder/Field'

    export default {
        mixins: [Base],
        props: {
            indexField:{
              required: false,
              default : function () {
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
            /**
             * check if the passed component has label
             *
             * @return {boolean}
             * @private
             * @author Amr
             */
            __hasLabel() {
                return this.component$.hasOwnProperty('label');
            },

            __labelCols(){
              return this.component$.hasOwnProperty('cols') && this.component$.cols.label ? this.component$.cols.label : 2
            },

            __fieldCols(){
                return this.component$.hasOwnProperty('cols') && this.component$.cols.field ? this.component$.cols.field : 6
            }
        }
    }
</script>
