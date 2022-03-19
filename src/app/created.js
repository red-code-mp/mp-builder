/**
 * created method for app.js
 */
export default function () {
    this.loadVuex();
    this.$i18n.locale = Config.get('lang') // set locale lang @author Amr
    this.initFirebase();
    this.initConfigurations();
}