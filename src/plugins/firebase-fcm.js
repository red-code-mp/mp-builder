import firebase from 'firebase'
import firebaseSettings from '../utils/firebase'

firebase.initializeApp(firebaseSettings.config)

window.onfocus = function () {
    NotificationBus.$emit('fetch-notification')
}
export default firebase;
