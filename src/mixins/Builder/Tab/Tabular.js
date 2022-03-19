import Repeater from "./Repeater";
import GroupFields from '../../../mixins/Builder/GroupFields'

export default {
    mixins: [Repeater, GroupFields],
    data() {
        return {
            tabularKey: 0,
            classes: ''
        }
    },
    computed: {
        /**
         * @author khalid
         * @returns {*}
         * @private
         * table header
         */
        __labels() {
            return this.__getLabels()
        },
        /**
         * @author khalid
         * @returns {string}
         * @private
         * cell width
         */
        __cols() {
            let cols = '16.66%'
            if (this.field.table && this.field.table.hasOwnProperty('cols')) {
                if (this.__colsPercentage.hasOwnProperty(this.field.table.cols))
                    cols = this.__colsPercentage[this.field.table.cols]
                else
                    cols = this.field.table.cols
            }
            return cols
        },
        /**
         * @author khalid
         * @returns {{"1": string, "2": string, "3": string}}
         * @private
         * general widths
         */
        __colsPercentage() {
            return {1: '16.66%', 2: '25%', 3: '50%'}
        },
        /**
         * @author khalid
         * @returns {*|string}
         * @private
         * table caption
         */
        __caption() {
            return this.field.table && this.field.table.caption ? this.field.table.caption : ''
        },
        /**
         * @author khalid
         * @returns {[number]|*[]}
         * @private
         * hidden cells
         */
        __hiddenCells(){
            return this.field.hiddenCells ?? []
        },
        /**
         * @author khalid
         * @returns {string}
         * @private
         */
        __actionCellCol(){
            if (this.field.table && this.field.table.hasOwnProperty('action_cell_col')) {
                return ` col-${this.field.table.action_cell_col}`
            }
            return 'col-1'
        },
        /**
         * @author khalid
         * @returns {string}
         * @private
         */
        __actionClasses(){
            let classes$ = ''
            classes$ += ` ${this.__actionCellCol}`
            return classes$
        }
    },
    methods: {
        /**
         * @author khalid
         * @returns {*}
         * @private
         */
        __getLabels() {
            return this.field.fields.map((value) => {
                return {label: value.label, cell_col: value.cell_col}
            })
        },
        /**
         * @author khalid
         * @param cell
         * @returns {boolean}
         * @private
         */
        __isHiddenCell(cell){
            return this.__hiddenCells.includes(cell) ? 'd-md-none' : ''
        },
        /**
         * @author khalid
         * @param col
         * @returns {string|string}
         * @private
         */
        __cellCol(col){
            return col ? `col-${col}` : 'col-2'
        },
        /**
         * @author khalid
         * @param index
         * @param node
         * @returns {string}
         * @private
         */
        __classes(index, node){
            let classes$ = ''
            classes$ += ` ${this.__isHiddenCell(index)}`
            classes$ += ` ${this.__cellCol(node.cell_col)}`
            return classes$
        },
    },
    created() {
        FormBuilder.$on('refresh-tabular', (field) => {
            if (this.__rootField != field)
                return;
            this.tabularKey = this.tabularKey + 1;
        })
    }
}
