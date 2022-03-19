import constants from "../../../utils/constants";

export default {
    props: ['columns','row'],
    computed: {
        /**
         * @author khalid
         * @returns {{}}
         * @private
         * config cell
         */
        __config(){
            return this.columns.column.config ?? {}
        },
        /**
         * @author khalid
         * @returns {*}
         * @private
         */
        __attr(){
            return this.__config.attr
        },
        /**
         * @author khalid
         * @private
         */
        __constant(){
            return this.__config.constant
        },
        /**
         * @author khalid
         * @returns {*}
         * @private
         */
        __key(){
          return this.row[this.__attr]
        },
        /**
         * @author khalid
         * @returns {*}
         * @private
         */
        __value(){
            return constants[this.__constant][this.__key] ?? {}
        },
        /**
         * @author khalid
         * @returns {*}
         * @private
         */
        __label(){
            return this.__value.label
        },
        /**
         * @author khalid
         * @returns {*}
         * @private
         */
        __variant(){
            return this.__value.variant
        },
    },
}
