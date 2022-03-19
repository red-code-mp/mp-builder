import Base from './OptionsBase'

/**
 * this mixin just for c-check-box component
 * @author Amr
 */
export default {
    name: 'check-box-mixin',
    mixins: [Base],
    methods: {
        /**
         * this function returns the extra checkbox
         * data that should be pushed with another through Bus
         * @return {{}}
         */
        extra() {
            if (!this.__model)
                return undefined;
            return this.__options.filter((val) => {
                return this.__model.includes(val.id);
            });
        },
        __reAssignModel$() {
            if (!this.__model)
                return undefined;
            this.__model = this.__getModel$Ids();
            this.__model = !this.extra().length ? this.__model : this.extra()
        },
        __getModel$Ids() {
            return this.__model.map((el) => {
                return this.isObject(el) ? el.id : el;
            })

        },
        onCheckBoxClick(value) {
            this.$nextTick(() => {
                if (value.length > this.__model.length)
                    FormBuilder.$emit('checkbox-click-' + this.__rowKey, value)
            })
        }
    }
}
