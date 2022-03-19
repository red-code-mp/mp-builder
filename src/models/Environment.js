/**
 * register the config of template
 * @type {any}
 * @author Amr
 */
window.Env = require('@/../../env.json')

export default class Environment {
    /**
     *  return the name of app
     * @return {*}
     * @author Amr
     */
    static getApp() {
        return Env.App;
    }

    /**
     *  return the default of Language
     * @return {Language}
     * @author Amr
     */
    static getLanguage() {
        return Env.Language;
    }

    static getDefaultLanguage() {
        return Environment.getLanguage().default;
    }


    static env(key, value = null) {
        try {
            return eval(`Env.${key}`)
        } catch (e) {
            return value;
        }

    }
}