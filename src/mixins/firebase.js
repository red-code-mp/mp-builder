import firebase from '../plugins/firebase-fcm'
import firebaseConfig from '../utils/firebase'
import {mapGetters} from 'vuex'

export default {
    computed: {
        ...mapGetters('Auth', ['getRoles']),
        /**
         * init firebase messaging
         * @return {*|firebase.messaging.Messaging|never}
         * @author Amr
         */
        messaging() {
            return firebase.messaging()
        },
        /**
         * get firebase token method
         * @return {Promise<string> | *}
         * @private
         * @author Amr
         */
        __getToken() {
            return this.messaging.getToken();
        },
        /**
         * get firebase notification permission
         * @return {(() => Promise<void>) | default.methods.requestPermission | ((deprecatedCallback?: NotificationPermissionCallback) => Promise<NotificationPermission>)}
         * @private
         * @author Amr
         */
        __requestPermission() {
            return this.messaging.requestPermission;
        }
    },

    methods: {
        /**
         * base request for mixin
         * @param link
         * @param params
         * @return {*|Promise<unknown>}
         * @private
         * @author Amr
         */
        __request(link, params) {
            return this.request(link, params);
        },
        /**
         * save user's token in database
         * @param token
         * @author Amr
         */
        registerUserToken(token) {
            let link = this.route('users.tokens.store')
            let device = this.$browserDetect.meta.name
            let params = {
                token,
                device
            }
            this.request(link, params)
        },
        registerUserRolesAsTopics(token) {
            // let roles = this.getRoles;
            // console.log('roles', roles);
            // roles.forEach(role => {
            //     this.subscribeTokenToTopic(token, role);
            // })
        },
        /**
         * subscribe topic ( for user roles )
         * @param token
         * @param topic
         * @return {boolean}
         * @author Amr
         */
        subscribeTokenToTopic(token, topic) {
            fetch(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`, {
                method: 'POST',
                headers: new Headers({
                    Authorization: `key=${firebaseConfig.server_key}`
                })
            })
                .then((response) => {
                    if (response.status < 200 || response.status >= 400) {
                        console.log(response.status, response);
                    }
                    console.log(`"${topic}" is subscribed`);
                })
                .catch((error) => {
                    console.error(error.result);
                });
            return true;
        },
        /**
         * handle the new generated token
         * @author Amr
         */
        onTokenRefresh() {
            this.__getToken.then((newToken) => {
                this.registerUserRolesAsTopics(newToken);
                this.registerUserToken(newToken)
                console.log('Token refreshed: ', newToken)
                // this.saveNotificationToken(newToken)
            }).catch(function (err) {
                console.log('Unable to retrieve refreshed token ', err)
            })
        },
        /**
         * gain the notification permission
         * @author Amr
         */
        requestPermission() {
            this.__requestPermission().then(() => {
                console.log('Notification permission granted.')
                this.__getToken.then((token) => {
                    this.registerUserRolesAsTopics(token);
                    this.registerUserToken(token)
                    console.log('New token created: ', token)
                    // this.saveNotificationToken(token)
                })


            }).catch((err) => {
                console.log('Unable to get permission to notify.', err)
            })
        },
        /**
         * listen to message receiving in for-ground
         * @param notification
         * @author Amr
         */
        onMessageReceived({notification}) {
            Toast.$emit('info-message', notification.body, notification.title)
            NotificationBus.$emit('fetch-notification')
        },
        /**
         * init firebase configs
         * @author Amr
         */
        initFirebase() {
            this.messaging.usePublicVapidKey(`${firebaseConfig.usePublicVapidKey}`)
            if (Notification.permission !== "granted") {
                this.requestPermission();
            } else {
                this.onTokenRefresh();
            }
            this.messaging.onMessage(this.onMessageReceived)


        }
    }

}