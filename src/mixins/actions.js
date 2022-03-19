export default {
    data() {
        return {}
    },
    methods: {
        /**
         *  check the Visibility of action
         * @param columns
         * @param is_visible
         * @return {boolean|*}
         * @private
         * @author Amr
         */
        __checkActionVisibility(columns, is_visible) {
            if (!is_visible)
                return true;
            return is_visible.call(this, columns)
        },
        /**
         *  check the Authorization of action
         * @param columns
         * @param is_visible
         * @return {boolean|*}
         * @private
         * @author Amr
         */
        __checkAuthorization(permissions, is_authorized) {
            if (!is_authorized)
                return null;
            return is_authorized.call(this, permissions)
        },
        /**
         * @author khalid
         * @param act
         * @param refs
         * @param is_visible
         * @returns {{component: string, is_visible(*=): (*|boolean), refs, callback: (function(*=): Promise<unknown>), attributes: {icon: string, variant: string, title: string, "font-scale": string}}|{component: string, is_visible(*=): (*|boolean), refs, callback: callback, attributes: {icon: string, variant: string, title: string, "font-scale": string}}|{component: string, refs, callback: callback, attributes: {icon: string, variant: string, title: string, "font-scale": string, animation: string}}|boolean|*}
         * get global actions by reference component
         */
        getGlobalActions(act, refs, is_visible, is_authorized) {
            let isAuthorization = this.__checkAuthorization;
            switch (act.slug) {
                /**
                 * @author khalid
                 * general edit action, redirect to edit route by pass route name and params from package actions
                 */
                case 'edit':

                    return {
                        component: 'bv-icon',
                        refs: refs,
                        attributes: {
                            title: 'edit',
                            icon: "pencil-square",
                            'font-scale': "1",
                            variant: "success"
                        },
                        callback: (event) => {
                            let params = refs(event).params ?? {}
                            let __params = {}
                            Object.keys(params).forEach(key => {
                                let value = params[key]
                                if (params[key] instanceof Function)
                                    value = params[key]()
                                this.set(__params, key, value);

                            })
                            let __route = typeof refs(event).route === 'function' ? refs(event).route.call(this) : refs(event).route
                            if (refs)
                                event.$router.push({
                                    name: __route,
                                    params: {id: event.columns.formattedRow.id, ...__params}
                                })
                            if (refs(event).hasOwnProperty('callback') && typeof refs(event).callback === 'function')
                                refs(event).callback()
                        },
                        /**
                         * check the visibility of current action
                         * @param columns
                         * @return {*|boolean}
                         * @author Amr
                         */
                        is_visible(columns) {
                            return this.__checkActionVisibility(columns, is_visible);
                        },
                        /**
                         * check the authorization of current action
                         * @param columns
                         * @return {*|boolean}
                         * @author Amr
                         */
                        is_authorized(permissions) {
                            return isAuthorization(permissions, is_authorized);
                        }

                    }
                /**
                 * @author khalid
                 * general delete action, delete record by passing endpoint and params from package actions
                 */
                case 'delete':
                    return {
                        component: 'bv-icon',
                        refs: refs,
                        attributes: {
                            title: 'delete',
                            icon: "x-square",
                            'font-scale': "0.9",
                            variant: "danger"
                        },
                        /**
                         * check the authorization of current action
                         * @param permissions
                         * @return {*|boolean}
                         * @author Amr
                         */
                        is_authorized(permissions) {
                            return isAuthorization(permissions, is_authorized);
                        },
                        /**
                         * check the visibility of current action
                         * @param columns
                         * @return {*|boolean}
                         * @author Amr
                         */
                        is_visible(columns) {
                            return this.__checkActionVisibility(columns, is_visible);
                        },
                        callback: (event) => {
                            let self = this
                            return new Promise((resolve, reject) => {
                                this.popSwalConfirm('Are you sure ?', 'are you sure to delete ?')
                                    .then(() => {
                                        let params = {
                                            id: event.columns.formattedRow.id
                                        }
                                            if (refs(event).hasOwnProperty('params')) {
                                                params = {
                                                    ...params,
                                                    ...self.__prepareParams(refs(event).params)
                                                }
                                            }
                                        self.request(self.route(refs(event).route, params))
                                            .then(
                                                (response) => {
                                                    Toast.$emit('success-message', response.message, 'Done!')
                                                    ListBuilder.$emit('reload-table')
                                                    if (refs(event).hasOwnProperty('callback') && typeof refs(event).callback === 'function')
                                                        refs(event).callback()
                                                }
                                            ).catch(
                                            (error) => {
                                                reject(error)
                                            }
                                        )
                                    }).catch(() => {
                                })

                            });

                        }
                    }
                /**
                 * @author khalid
                 * general info action
                 */
                case 'info':
                    return {
                        component: 'bv-icon',
                        refs: refs,
                        attributes: {
                            title: 'info',
                            icon: "arrow-clockwise",
                            'font-scale': "1.4",
                            variant: "secondary",
                            animation: "spin"
                        },
                        callback: (event) => {
                        }
                    }
                case 'redirect':
                    return {
                        component: 'bv-icon',
                        refs: refs,
                        attributes: {
                            ...{
                                title: 'Redirect',
                                icon: "reply-all",
                                'font-scale': "1.4",
                                variant: "info",
                            }, ...act.attributes
                        },
                        callback: (event) => {
                            let result = refs.call(event)
                            let route = result.route;
                            let params = result.params ?? {};
                            let query = result.query ?? {};
                            event.$router.push({name: route, params, query})
                        },
                        /**
                         * check the visibility of current action
                         * @param columns
                         * @return {*|boolean}
                         * @author Amr
                         */
                        is_visible(columns) {
                            return this.__checkActionVisibility(columns, is_visible);
                        },
                        /**
                         * check the authorization of current action
                         * @param columns
                         * @return {*|boolean}
                         * @author Amr
                         */
                        is_authorized(columns) {
                            return isAuthorization(columns, is_authorized);
                        }
                    }
                case 'sync':
                    return {
                        component: 'bv-icon',
                        refs: refs,
                        attributes: {
                            title: 'Redirect',
                            icon: "arrow-repeat",
                            'font-scale': "1.4",
                            variant: "info",
                            // animation: "spin"
                        },
                        callback: (event) => {},
                        /**
                         * check the visibility of current action
                         * @param columns
                         * @return {*|boolean}
                         * @author Amr
                         */
                        is_visible(columns) {
                            return this.__checkActionVisibility(columns, is_visible);
                        },
                        /**
                         * check the authorization of current action
                         * @param columns
                         * @return {*|boolean}
                         * @author Amr
                         */
                        is_authorized(columns) {
                            return isAuthorization(columns, is_authorized);
                        }
                    }
                case 'modal':
                    return {
                        component: 'bv-icon',
                        refs: refs,
                        attributes: {
                            ...{
                                icon: "info-square",
                                'font-scale': "1",
                                variant: "info",
                                title: 'modal',
                            }, ...act.attributes
                        },
                        callback: (event) => {
                            event.$root.$emit('show-form-modal', {
                                columns: event.columns,
                                ...refs.call(event)
                            })
                        },
                        is_visible(columns) {
                            return this.__checkActionVisibility(columns, is_visible);
                        },
                        is_authorized(columns) {
                            return isAuthorization(columns, is_authorized);
                        }
                    }
            }
        },
        /**
         * @author khalid
         * general status action, change status by passing endpoint and params from package actions
         */
        getStatusCallback(event) {
            let self = this
            return new Promise((resolve, reject) => {
                this.popSwalConfirm('Are you sure ?', 'are you sure to change status ?')
                    .then(() => {
                        let params = {}
                        event.column.endpoint.params.map((val) => {
                            params[val] = event.row[val]
                        })
                        self.request(self.route(event.column.endpoint.route, params), event.val)
                            .then(
                                (response) => {
                                    ListBuilder.$emit('reload-table')
                                    Toast.$emit('success-message', response.message, 'Done!')
                                    resolve(response)
                                }
                            ).catch(
                            (error) => {

                                reject(error)
                            }
                        )
                    }).catch(() => {
                })

            });

        }
    },
    computed: {},
    watch: {}
}
