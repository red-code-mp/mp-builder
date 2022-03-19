import instance from "../common/axios";

export default {
    methods: {
        /**
         * @author khalid
         * @param route
         * @param params
         * @returns {Promise<unknown>}
         *
         */
        request(route, params = {}, hasProgress = true) {
            let self = this
            let request = this.fullRequest(route, params, {});
            if (hasProgress)
                this.blockPage();
            return new Promise((resolve, reject) => {
                instance(request).then(
                    (response) => {
                        if (response.data)
                            resolve(response.data)
                        else
                            reject(response.statusText + ' ' + response.status)
                    },
                    (error) => {
                        reject(error)
                    }).catch(
                    error => {
                        reject(error)
                    }
                ).finally(
                    response => {
                        if (hasProgress)
                            this.unBlockPage();
                        resolve(response)
                    }
                );
            })
        },

        /**
         * @author khalid
         * @param route
         * @param params
         * @returns {{method: string, url: *}}
         * prepare body request
         */
        fullRequest(route, params) {
            let requestBody = {
                method: route.method.toLowerCase(),
                url: route.url
            }
            if (route.hasOwnProperty('header'))
                requestBody.header = route.header
            if (route.method.toLowerCase() !== 'get') {
                requestBody = {
                    ...requestBody,
                    data: params
                }
            }
            return requestBody;
        }
    }
}
