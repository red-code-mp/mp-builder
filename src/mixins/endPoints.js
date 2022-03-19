import endPoints from "../structure/RegisterEndPoints";

export default {
    data() {
        return {}
    },

    methods: {
        /**
         * @author khalid
         * @param route
         * @param routeParams
         * @param params
         * prepare url route with parameters
         */
        route(route, routeParams = {}, params = {}) {
            let self = this
            let node = {...endPoints};

            let is_exists = true

            // split string to array of keys
            route.split('.').forEach(function ($url) {
                if (node[$url] !== undefined) {
                    node = node[$url]
                } else
                    is_exists = false
            })

            node = {...node};
            // check if endpoint is exists in module, get default endpoint fi not exists
            if (!is_exists)
                node = {...this.getDefaultEndPoint(route)}

            // check if endpoint url type of function, then pass {this} vue instance
            if (typeof node.url == 'function') {
                node.url = node.url(self)
            }


            // replace every variable preceded by a colon mark in url with the variable in the array, if exists
            for (const key in routeParams) {
                node.url = node.url.replace(`:${key}`, routeParams[key] instanceof Function ? routeParams[key].call(this) : routeParams[key]);
            }

            // append query params to url
            for (const key in params) {

                let value = params[key] instanceof Function ? params[key](self) : params[key];
                if (value === undefined || value === null || value === '')
                    continue;
                node.url = self.updateURLParameter(node.url, key, value)
            }

            return node;
        },

        /**
         * @author khalid
         * @param uri
         * @param key
         * @param value
         * @returns {string|*}
         * update a query string parameter
         */
        updateURLParameter(uri, key, value) {
            var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
            var separator = uri.indexOf('?') !== -1 ? "&" : "?";
            if (uri.match(re)) {
                return uri.replace(re, '$1' + key + "=" + value + '$2');
            } else {
                return uri + separator + key + "=" + value;
            }
        },

        /**
         * @author khalid
         * @param params
         * @returns {*}
         * prepare params
         */
        prepareParams(params) {
            let self = this
            let __params = this.clone(params)
            Object.keys(__params).forEach(function (key) {
                if (typeof __params[key] == 'function')
                    __params[key] = __params[key](self)
            });
            return __params;
        },

        /**
         * @author khalid
         * @param route
         */
        getDefaultEndPoint(route) {
            let routKeys = route.split('.');
            let endpoint = this.defaultEndPoints(routKeys[0])[routKeys[routKeys.length - 1]]
            return endpoint
        },

        /**
         * @author khalid
         * @param root
         * @returns {{
         * find: {method: string, url: string},
         * fetch: {method: string, url: string},
         * update: {method: string, url: string},
         * store: {method: string, url: string},
         * delete: {method: string, url: string},
         * status: {method: string, url: string}}}
         */
        defaultEndPoints(root) {
            return {
                store: {
                    method: 'post',
                    url: `api/${root}`
                },
                fetch: {
                    method: 'get',
                    url: `api/${root}`
                },
                find: {
                    method: 'get',
                    url: `api/${root}/:id`
                },
                update: {
                    method: 'put',
                    url: `api/${root}/:id`
                },
                delete: {
                    method: 'delete',
                    url: `api/${root}/:id`
                },
                change_active: {
                    method: 'post',
                    url: `api/${root}/:id/change_active`
                }
            }
        }

    },

    computed: {}
}
