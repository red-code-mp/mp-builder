<template>
  <ValidationObserver v-slot="data" ref="validationObserver" :key="key">
    <form @submit.prevent="submit">
      <!-- START FORM GROUP -->
      <div v-if="!__hasChunk" v-for="(field , index) in fields$">
        <component :is="field.component" v-if="__hasNestedBuilder(field)" :component="field"
                   :key="`form-group-${index}-${key}`"/>
        <component :is="field.component" v-else-if="__isAdvancedComponent(field)"
                   :formData="formData" :component="field" :key="`component-${index}`"/>
        <form-group v-else-if="!__hasGroupFields(field)" :component="field"
                    :key="`form-group-${index}-${key}`"
                    :values="values" class="form-group" :formData="formData"/>
        <group-fields v-else :component="field" :key="`group-fields-${index}-${key}`"
                      :values="values" class="form-group" :formData="formData"/>
      </div>
      <!-- END FORM GROUP -->
      <form-action v-if="__showActions && showActions && !preventActions"
                   @cancel="cancel"
                   :config="actionsConfig"
                   @add-more="__addMore"
                   :validationObserver="data">
        <template v-slot:actions>
          <slot name="actions"></slot>
        </template>
      </form-action>
    </form>
  </ValidationObserver>
</template>
<script>
import FormAction from './Components/FormActions'
import ChunksFields from './Components/ChunksFields'
import Settings from '../../utils/builder'

export default {
  components: {FormAction, ChunksFields},
  name: 'BBuilder',
  inject: ['submit', 'cancel', 'addMore', 'resetValidation', '__setValidationObserver'],
  props: {
    /**
     * form actions' config
     * @author Amr
     */
    actionsConfig: {
      required: false,
      default: function () {
        return {}
      }
    },
    /**
     * form's fields
     * @author Amr
     */
    fields: {
      required: true,
      default: function () {
        return []
      }
    },
    /**
     * form fields' values
     * @author Amr
     */
    values: {
      required: false,
      default: function () {
        return {}
      }
    },
    options: {
      required: false,
      default: function () {
        return {}
      }
    },
    chunks: {
      required: false,
      default: 1
    },
    formData: {
      required: false,
      default: function () {
        return {};
      }
    },
    validationErrors: {
      required: false
    },
    showActions: {
      required: false,
      default: true
    },
    preventActions: {
      required: false,
      default: false
    },
  },
  data() {
    return {
      key: 0
    };
  },
  computed: {
    /**
     * return the given fields, to avoid any arbitrary changes on it
     * in addition to making fields easy to maintain
     *
     * @return {default.props.fields|{default, required}}
     * @author Amr
     */
    fields$() {
      return this.fields;
    },
    __hasChunk() {
      return this.chunks && this.chunks > 1;
    },
    __chunks() {
      return this.chunks;
    },
    __showActions() {
      return this.options.hasOwnProperty('showActions') ? this.options.showActions : true;
    },
    __chunkClass() {
      return 'col-' + (12 / this.__chunks);
    },
    chunkedField() {
      return _.chunk(this.fields, this.__chunks);
    },
  },
  methods: {
    __addMore() {
      this.addMore();
      // this.key = this.key + 1;
    },
    __hasGroupFields(field) {
      return field.component === 'group-fields'
    },
    __hasFormTable(field) {
      return field.component.toLowerCase() === 'form-table';
    },
    __isAdvancedComponent(field) {
      return Settings.advancedComponent$.includes(field.component)
    },
    __hasNestedBuilder(field) {
      return Settings.advancedComponent.includes(field.component)
    }
  },
  watch: {
    validationErrors: {
      deep: true,
      handler: function (newVal) {
        this.$refs.validationObserver.setErrors(newVal);
      }
    },
    formData: {
      deep: true,
      immediate: true,
      handler: function (value) {
      }
    }
  },
  created() {
    this.$nextTick(function () {
      this.__setValidationObserver(this.$refs.validationObserver)
    })
  }
}
</script>
<style lang="scss" scoped>
.col- * {
  float: left;
}
</style>
