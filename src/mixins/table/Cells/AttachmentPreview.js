export default {
    props: ['columns', 'rows'],
    computed: {
        /**
         * table's columns
         * @return {*}
         * @private
         * @author Amr
         */
        __column() {
            return this.columns.column;
        },
        /**
         * current row
         * @return {*}
         * @private
         * @author
         */
        __row() {
            return this.columns.row;
        },
        /**
         * the label of field
         * @return {string}
         * @private
         * @author Amr
         */
        __label() {
            return this.__column.label;
        },
        /**
         * the name of value's field in the  row
         * @return {string}
         * @private
         * @author Amr
         */
        __back_field() {
            return this.__column.back_field;
        },
        /**
         * native value
         * @return {*}
         * @private
         * @author
         */
        __value() {
            return this.__row[this.__back_field];
        },
        /**
         * custom template
         * @return {null|*}
         * @private
         * @author Amr
         */
        __template() {
            let template = this.__column.template
            if (!template)
                return null;
            if (!(template instanceof Function))
                throw new Error('[Component error] the passed template should be function');
            return template.call(this, this.__value)
        },
        /**
         * link of attachment
         * @return {string}
         * @private
         * @author Amr
         */
        __attachment() {
            return this.__value ? `<a href="${this.__value}" target="_blank">${this.__predicatedLabel}</a>` : null
        },
        /**
         * chosen whether value should be rendered
         * @return {default.computed.__template|default.computed.__attachment|(function(): string)}
         * @private
         * @author Amr
         */
        __predicatedValue() {
            // return this.__template ?? this.__attachment;
        },
        /**
         * custom label u
         * @return {string}
         * @private
         */
        __custom_label() {
            return this.__column.custom_label;
        },
        /**
         * chosen whether label should be rendered
         * @return {default.computed.__template|default.computed.__attachment|(function(): string)}
         * @private
         * @author Amr
         */
        __predicatedLabel() {
            return this.__custom_label ?? this.__label;
        },
    }
}
