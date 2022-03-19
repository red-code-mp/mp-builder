import Base from './OptionsBase'

/**
 * this mixin just for c-select component
 * @author Amr
 */
export default {
    name: 'select-mixin',
    mixins: [Base],
    computed: {
        is_disabled() {
            if (!this.__attributes.hasOwnProperty('disabled'))
                return false;
            if (this.__attributes.disabled instanceof Function)
                return this.__attributes.disabled.call(this, this.__model)
            return this.__attributes.disabled
        },
        __quickCreate() {
            if (this.component$.hasOwnProperty('quick_create') && this.component$.quick_create.show)
                return true
            return false
        },
        __generateRandomRef() {
            return `formModal-${Math.random().toString(36).substring(2, 8)}`
        },
        __disableBranchNodes() {
            return this.__attributes.hasOwnProperty('disableBranchNodes') ? this.__attributes.disableBranchNodes : true
        }
    },
    methods: {
        /**
         * this function returns the extra
         * data that should be pushed with another through Bus
         * @return {{}}
         */
        extra() {
            if (!this.model$)
                return undefined;
            try {
                let method = this.getExtraMethod();
                return this.__options[method]((val) => {
                    return this.checkExtra(val);
                });
            } catch (e) {
                throw new Error('[select exception] : check your select data')
            }
        },
        checkExtra(val) {
            let checkedOptions = this.model$;
            try {
                if (!this.isMultiple)
                    return checkedOptions.id == val.id
                checkedOptions = checkedOptions.map(({id}) => id)
                return checkedOptions.includes(val.id)
            } catch (e) {
                console.error('[select exception] : invalid data')
            }
        },
        getExtraMethod() {
            return this.isMultiple ? 'filter' : 'find'
        },
        __reAssignModel$() {
            if ((this.isMultiple && this.isArray(this.model$)) ||
                (!this.isMultiple && this.isObject(this.model$)))
                this.model$ = this.extra()
        },
        __hasReAssigned(val) {
            return parseInt(val, 10) || this.isObject(val) || !this.isArrayOfObject(val)
        },
        quickCreate() {
            this.$refs[this.__generateRandomRef].showModal(this.component$.quick_create)
        },
        refreshSelect(payload) {
            this.__fetchService(this.component$.service, (result) => {
                if (this.component$.attributes['value-format'] === 'object')
                    this.__model = payload.payload
                else
                    this.__model = payload.payload.id
            })
        },
        onChange(node, instanceId) {
            this.onChangeEvent({
                field: this.component$.field, node: node,
                index: this.indexRow, rowKey: this.rowKey, rootField: this.rootField
            })
        },
        onChangeEvent(event) {
            FormBuilder.$emit('on-change-select', event)
        }
    },
    watch: {}

}
