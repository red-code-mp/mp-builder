export default {
    methods: {
        __hasRules(field) {
            return field.hasOwnProperty('rules')
        },
        __rules(field) {
            if (!this.__hasRules(field))
                return {};
            return field.rules;
        },
        __hasLabel(field) {
            return field.hasOwnProperty('label');
        },
        __labelCols(field) {
            return field.hasOwnProperty('cols') && field.cols.label ? field.cols.label : 2
        },

        __fieldCols(field) {
            return field.hasOwnProperty('cols') && field.cols.field ? field.cols.field : 3
        },
    }
}
