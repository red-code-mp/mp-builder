import Vue from 'vue'
import {ValidationProvider, ValidationObserver, extend} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import {messages} from 'vee-validate/dist/locale/en.json';

/**
 * register Validation Provider
 * @author Amr
 */
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

/**
 * @author khalid
 * prepare field name before get message, remove repeater random key from field name
 */
Object.keys(rules).forEach(rule => {
    extend(rule, {
        ...rules[rule], // copies rule configuration
        message: (fieldName, placeholders) => {
            let str = messages[rule];
            let re = /{_field_}|{min}|{max}|{length}|{height}|{size}/gi;

            let output = str.replace(re, (match) => {
                return String(placeholders[match.replace(/[\{\}]/g, '')]).replace(/--.*/, '');
            });
            return output
        }
    });
});
