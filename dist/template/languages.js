/**
 * register the config of template
 * @type {any}
 * @author Amr
 */
window.Env = require('@/../../env.json')

class Environment {
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

    static get() {
        return Env;
    }
}

class Config {
    constructor() {
        this.configName = Environment.getApp() + '-config';
        this.__initConfig();
    }

    static getLocalStorage() {
        return localStorage;
    }

    __getConfig() {
        try {
            return JSON.parse(Config.getLocalStorage().getItem(this.configName));
        } catch (e) {
            return undefined;
        }
    }

    __setConfig(value = {}) {
        return Config.getLocalStorage().setItem(this.configName, JSON.stringify(value));
    }

    __hasConfig() {
        return this.__getConfig() !== undefined && this.__getConfig() !== null;
    }

    addConfigAttribute(key, value) {
        let config = this.__getConfig();
        config[key] = value;
        this.__setConfig(config);
    }

    __initConfig() {
        if (this.__hasConfig())
            return;
        this.__setConfig();
        this.addConfigAttribute('lang', 'ar')
    }

    get(key) {
        return this.__getConfig()[key];
    }

    insertStyle() {
        var newNode = document.createElement('link');
        newNode.setAttr('id', 'style');
        newNode.setAttr('href', 'style.rtl.css')
    }
}

window.Config = new Config();
window.Environment = Environment;
