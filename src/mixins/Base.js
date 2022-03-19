import DateConfig from '../utils/date.js'

export default {
    methods: {
        /**
         * set the attribute of object with keeping the reactivity
         * of that object
         *
         * this function serves both types Array and Object
         * @param object
         * @param name or index
         * @param value
         * @author Amr
         */
        set(object, name, value) {
            this.$set(object, name, value)
        },
        /**
         * delete attribute from object
         *
         * this function serves both types Array and Object
         *
         * @param object
         * @param name
         * @author Amr
         */
        delete(object, name) {
            this.$delete(object, name)
        },
        /**
         * check if arg is array
         * @param arg
         * @return {((arg: any) => arg is Array<any>) | arg is Array<any>}
         * @author Amr
         */
        isArray(arg) {
            return Array.isArray && Array.isArray(arg);
        },
        /**
         * check if arg is object
         * @param arg
         * @return {boolean|*}
         * @author Amr
         */
        isObject(arg) {
            return typeof arg === 'object' && !this.isArray(arg)
        },
        /**
         * check if arg's elements are object
         * @param arg
         * @return {boolean|*}
         * @author Amr
         */
        isArrayOfObject(arg) {
            return arg.every(el => this.isObject(el))
        },
        /**
         * check if arg var has int value
         * @param arg
         * @return {boolean|*}
         * @author Amr
         */
        isInt(arg) {
            return parseInt(arg, 10)
        },

        /**
         * upper case first letter
         * @param word
         * @return {string|*}
         * @author Amr
         */
        ucfirst(word) {
            return word.charAt(0).toUpperCase() + word.substring(1);
        },

        /**
         * check if the passed value
         * is an empty object
         * @param word
         * @return {string|*}
         * @author Amr
         */
        isEmptyObject(arg) {
            return !arg || Object.keys(arg) == 0
        },
        /**
         * clone
         * @param object
         * @return {any}
         * @author Amr
         */
        clone(object, hard = false) {
            if (hard) {
                return JSON.parse(JSON.stringify(object))
            }
            return Object.assign(object instanceof Array ? [] : {}, object)
        },
        /**
         * redirect to the passed route
         * @param route
         * @author Amr
         */
        pushToRoute(route) {
            this.$router.push(route);
        },
        /**
         * replace the current route with the new one
         * @param route
         * @author Amr
         */
        replaceRoute(route) {
            this.$router.replace(route);
        },
        /**
         *  check if the text has the given sub strings
         * @param text
         * @author Amr
         */
        __hasString(text, subStr) {
            return text.search(subStr) != -1
        },
        /**
         * copy data to clipboard
         * @param string
         * @author Amr
         */
        copyToClipboard(string) {
            let el = document.createElement('textarea');
            // Set value (string to be copied)
            el.value = string;
            // Set non-editable to avoid focus and move outside of view
            el.setAttribute('readonly', '');
            el.style = {position: 'absolute', left: '-9999px'};
            document.body.appendChild(el);
            // Select text inside element
            el.select();
            // Copy text to clipboard
            document.execCommand('copy');
            // Remove temporary element
            document.body.removeChild(el);
        },
        /**
         * convert php's date format to javascript's format
         * @param str
         * @return {*}
         * @author Amr
         */
        phpToMoment(str) {
            let replacements = DateConfig.php_to_moment;
            return str.split('').map(chr => chr in replacements ? replacements[chr] : chr).join('');
        },

        isDate(data) {
            return !isNaN(Date.parse(data))
        }

    }
}