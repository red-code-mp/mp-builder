import firebase from '../plugins/firebase-fcm'
import firebaseConfig from '../utils/firebase'
import {mapGetters, mapActions} from 'vuex'

export default {
    // computed: {
    //     ...mapGetters('Auth', ['getRoles']),
    // },

    methods: {
        ...mapActions('Company', ['registerConfigurations']),
        /**
         * base request for mixin
         * @param link
         * @param params
         * @return {*|Promise<unknown>}
         * @private
         * @author Amr
         */
        __configRequest(link, params) {
            return this.request(link, params);
        },
        /**
         * handle the new generated token
         * @author Amr
         */
        __fetchConfigurations() {
            let link = this.route('company.config.find', {}, {resource: 'serializeForFrontConfig'});
            this.__configRequest(link).then(({payload}) => {
                this.registerConfigurations(payload);
            })

        },
        /**
         * init firebase configs
         * @author Amr
         */
        initConfigurations() {
            this.__fetchConfigurations();
        }
    }

}