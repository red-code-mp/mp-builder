import Base from './CheckBox'

/**
 * this mixin just for c-check-box component
 * @author Amr
 */
export default {
    name: 'check-box-mixin',
    mixins: [Base],
    computed: {},
    methods: {
        deleteEndpoint(params = {}) {
            return this.route(this.field.endpoints.delete.route, this.parseParams({...params, ...this.field.endpoints.delete.params}))
        },
        createEndpoint(params = {}) {
            return this.route(this.field.endpoints.store.route, this.parseParams({...params, ...this.field.endpoints.store.params}))
        },
        editEndpoint(params = {}) {
            return this.route(this.field.endpoints.edit.route, this.parseParams({...params, ...this.field.endpoints.edit.params}))
        },
        assignEndpoint(params = {}) {
            // console.log('assign-endpoint', this.field.endpoints.assign.route, this.field.endpoints.assign.params)
            return this.route(this.field.endpoints.assign.route, this.parseParams({...params, ...this.field.endpoints.assign.params}))
        },
        parseParams(params) {
            if (!params)
                return {};
            let paramsKey = Object.keys(params);
            let __params = {}
            paramsKey.forEach(key => {
                __params[key] = params[key];
                if (__params[key] instanceof Function)
                    __params[key] = params[key].call(this)
            })
            return __params;
        },
        edit$(option) {
            FormBuilder.$emit('checkbox-click-' + this.__rowKey, option)
        },
        assign$(id, name = '') {
            this.popSwalConfirm('Critical Operations !!', `Are you sure that you want to assign the permissions of the ${name} Role to the current user ?`)
                .then(() => {
                    let link = this.assignEndpoint();
                    this.request(link, {id}).then(payload => {
                        ListBuilder.$emit('refresh-' + this.field.field);
                        Toast.$emit('success-message', payload.message, 'Done!')
                    })
                }).catch(() => {
            })

        },
        delete$(id, name = '') {
            this.popSwalConfirm('Critical Operations !!', `Are you sure that you want to withdraw the assigned permissions of the ${name} Role from the current user ?`)
                .then(() => {
                    let link = this.deleteEndpoint({id});
                    this.request(link).then(payload => {
                        ListBuilder.$emit('refresh-' + this.field.field);
                        Toast.$emit('success-message', payload.message, 'Done!')

                    })

                }).catch(() => {
            })
        }
    }
}