export default {
    methods: {
        /**
         * capitalize every single word
         * in the given sentence
         *
         * @param string
         * @return {*}
         * @author Amr
         */
        capitalize(string, removedChar = '') {
            let capitalizedWord = _.startCase(_.toLower(string))
            if (removedChar === '')
                return capitalizedWord;
            return capitalizedWord.split(removedChar).join('')
        }
    }
}