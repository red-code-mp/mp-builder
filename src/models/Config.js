import Environment from './Environment'

export default class Config {
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
        this.addConfigAttribute('lang', Environment.getDefaultLanguage());
    }

    get(key) {
        return this.__getConfig()[key];
    }
}