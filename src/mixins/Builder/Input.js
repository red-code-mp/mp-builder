import Base from './base'

export default {
    mixins: [Base],
    props: {
        field: {
            required: true,
            default: () => {
                return {}
            }
        }
    },
    computed: {
        component$() {
            return this.field;
        },
        /**
         * @author khalid
         * @private
         * input type
         */
        __type() {
            return this.component$.type ?? 'text'
        },
        has_formatter() {
            return this.__extra.hasOwnProperty('formatter');
        }
    },
    methods: {
        onCreated() {
            if (this.component$.hasOwnProperty('default')){
                if (typeof this.component$.default === 'function'){
                    this.__model = this.component$.default.call(this)
                }
                else {
                    this.__model = this.component$.default
                }

            }
        },
        formatter(value, event) {
            console.log('fotmatter', value, this.component$.formatter(value, event))
            if (this.has_formatter)
                return this.component$.formatter(value, event)
            return (value) => {
                return value;
            }
        }
    },
    watch: {}
}
