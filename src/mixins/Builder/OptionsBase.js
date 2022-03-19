import Base from './base'

export default {

    name: 'Options-Name',
    /**
     * the used mixins
     * @author Amr
     */
    mixins: [Base],
    /**
     * field's component
     * @author Amr
     */
    props: {
        field: {
            required: true,
            default: () => {
                return {}
            }
        },
    },
    data() {
        return {
            defaultParsable: {
                id: 'id',
                label: 'name'
            },
            options$$: [],
            serviceOptions$$: [],
            staticOptions$$: [],
            hasRelationChanged: false,
            extraParams: {},
            relatedField: null
        };
    },
    computed: {
        /**
         * bind formData's keys with the rowKey
         * @private
         * @author Amr
         */
        __rowedKeyData() {
            let __copyFormData = {}
            Object.keys(this.clone(this.formData)).map((el) => {
                let key = this.rowKey ? `${el}--${this.rowKey}` : el;
                __copyFormData[key] = this.formData[el];
            })
            return __copyFormData;
        },
        /**
         * get the passed component
         *
         * @return {default.props.component|{require}}
         * @author Amr
         */
        component$() {
            return this.clone(this.field);
        },
        /**
         * check if the select is multiple
         * @return {*}
         * @author Amr
         */
        isMultiple() {
            return this.component$.multiple;
        },
        /**
         * returns the parsable object
         * @return {defaultParsable|{id, label}|*}
         * @private
         * @author Amr
         */
        __parsable() {
            let hasParsable = this.component$.hasOwnProperty('parsable')
            if (hasParsable)
                return this.component$.parsable
            return this.defaultParsable;

        },
        /**
         * component's options
         * @author Amr
         */
        __options: {
            get() {
                return this.parse([].concat(this.__serviceOptions, this.__staticOptions))
            },
            set(options) {
                this.options$$ = options;
            }
        },
        /**
         * component's options
         * @author Amr
         */
        __serviceOptions: {
            get() {
                return this.serviceOptions$$;
            },
            set(options) {
                this.serviceOptions$$ = options;
            }
        },
        /**
         * component's options
         * @author Amr
         */
        __staticOptions: {
            get() {
                return this.staticOptions$$;
            },
            set(options) {
                this.staticOptions$$ = options;
            }
        },
        filter() {
            let filter = this.component$.filter;
            if (filter && filter instanceof Function)
                return filter;
            throw new Error('Not filter passed')
        },
        __hasRelations() {
            return this.component$.hasOwnProperty('relations');
        },
        __relations() {
            if (!this.__hasRelations)
                throw new Error('Has no relation');
            let relations = [];
            let isObject = this.isObject(this.component$.relations);
            if (isObject) {
                relations.push(this.component$.relations);
            } else
                relations = relations.concat(this.component$.relations)
            return this.__updateRelationsFields(this.clone(relations));
        },
        /**
         * @author khalid
         * bind element attributes
         */
        __attributes() {
            return this.component$.attributes ?? {}
        }
    },
    methods: {
        /**
         * remove the row key from came string value
         * @param value
         * @return {*}
         * @private
         * @author Amr
         */
        __removeRowKey(value) {
            return value.replace(/--(\w)+$/, '')
        },
        /**
         * update the field of component
         * if component came from repeater and out_side attribute is true
         * them attach the rowKey with the name of field
         * otherwise take the name
         * @param relations
         * @return {*}
         * @private
         * @author Amr
         */
        __updateRelationsFields(relations) {
            return this.clone(relations).map((component) => {
                let __component = this.clone(component);
                if (!__component.out_side && this.rowKey) {
                    __component.field = this.__removeRowKey(__component.field)
                    __component.field = `${__component.field}--${this.rowKey}`
                }
                return __component;
            })
        },
        prepareRelationParams(relation, value) {
            let bindedAttributes = relation.bind;
            let field = relation.field;
            field = this.__removeRowKey(field)
            if (!value)
                return;
            let attr = {}
            if (this.isArray(value)) {
                attr[`${field}${this.ucfirst(bindedAttributes)}`] = JSON.stringify(value);
            } else if (typeof value == 'number') {
                attr[`${field}${this.ucfirst(bindedAttributes)}`] = value
            } else {
                bindedAttributes.forEach((key) => {
                    let keyValue = value[key];
                    if (keyValue)
                        attr[`${field}${this.ucfirst(key)}`] = keyValue
                })
            }
            return attr;

        },
        __pushRelationChanges(values) {
            this.extraParams = {
                ...values
            }
            this.__serviceWatcher(this.component$.service)
            FormRelations.$emit(this.__rowKey, values)
        },
        /**
         * call the service of component to update
         * the options of select
         * @param relation
         * @param value
         * @private
         *@author Amr
         */
        __updateRelationListener(relation, value) {
            this.hasRelationChanged = true;
            let queries = this.prepareRelationParams(relation, value)
            this.__pushRelationChanges(queries)

        },
        __getDataOfRepeater(field) {
            let __field = this.__removeRowKey(field)
            if (this.formData && this.formData[__field]) {
                return this.formData[__field];
            }
            return this.allFormData[field];
        },
        listenToRelations() {
            try {
                let relations = this.__relations;
                relations.forEach((relation) => {
                    let field = this.clone(relation).field
                    this.relatedField = field
                    if (this.allFormData[field] || this.__rowedKeyData[field]) {
                        this.__updateRelationListener(this.clone(relation), this.__getDataOfRepeater(field));
                    } else {
                        FormBuilder.$on(field, (value) => {
                            if (!value)
                                return;
                            this.__updateRelationListener(this.clone(relation), value);

                        })
                    }

                })
            } catch (e) {
                return;
            }

        },
        /**
         * walk through the objects
         *
         * @param object
         * @return {{id: *, label: *}}
         * @author Amr
         */
        mapParsing(object) {
            return {
                id: object[this.__parsable.id],
                label: object[this.__parsable.label],
                ...object
            }
        },
        /**
         * parse object accordin' to the given
         * parsable object
         *
         * @param options
         * @return {*}
         * @author Amr
         */
        parse(options) {
            return options.map(this.mapParsing)
        },
        /**
         * prepare request's params
         *
         * @param params
         * @return {{select: boolean}|any}
         * @private
         * @author Amr
         */
        __getParams(params = {}) {
            let $params = {
                type: 'select',
                ...this.extraParams
            }
            if (params == undefined || params == null)
                return $params;
            let _params = this.prepareParams(params)
            return Object.assign($params, _params)
        },
        /**
         * returns request's queries
         *
         * @param query
         * @return {*|{}}
         * @private
         * @author ¬Amr
         */
        __getQueries(query = {}) {
            let __query = {}
            if (!query)
                return __query;
            Object.keys(query).forEach(key => {
                let value = query[key];
                if (value instanceof Function)
                    value = value.call(this)
                this.set(__query, key, value);
            })
            return __query ?? {};
        },
        /**
         * prepare the request's instance
         * @param link
         * @return {*|Promise<unknown>}
         * @private
         * @author Amr
         */
        __optionRequest(link) {
            return this.request(link);
        },
        /**
         * prepare request's link
         *
         * @param service
         * @return {*}
         * @private
         * @author Amr
         */
        __prepareLink(service) {
            let params = this.__getParams(service.params)
            let queries = this.__getQueries(service.query)
            // console.log('queries', queries, params)
            return this.route(service.route, queries, params)
        },
        /**
         * fetch data from the backend
         * @param service
         * @return {*|*|Promise<unknown>}
         * @author Amr
         */
        fetchOptions(service) {
            let link = this.__prepareLink(service);
            return this.__optionRequest(link);
        },
        /**
         * append new options to the options$$
         * global var
         * @param options
         * @private
         * @author Amr
         */
        __concatWithNewOptions(options) {
            try {
                options = options.filter(this.filter)
            } catch (e) {
            } finally {
                let $options = this.parse(options)
                this.__options = this.__options.concat($options)
            }
        },
        /**
         * track options attribute' changes
         * @param newVal
         * @param oldVal
         * @return {*}
         * @private
         * @author Amr
         */
        __optionsWatcher(newVal, oldVal) {
            this.__fetchOptions(newVal, (payload) => {
                this.__reAssignModel$();
            })


        },
        __reAssignModel$() {
        },
        __fetchService(newVal, handel = () => {
        }) {
            this.fetchOptions(newVal).then((result) => {
                this.__serviceOptions = result.payload
                console.log('service-options', this.__serviceOptions)
                handel(result);
            });
        },
        __fetchOptions(options, handler = () => {
        }) {
            if (!Array.isArray(options))
                return options;
            this.__staticOptions = options;
            handler(options);
        },
        /**
         * watch endpoint changes
         * @param newVal
         * @param oldVal
         * @private
         * @author Amr
         */
        __serviceWatcher(newVal, oldVal) {
            if (!newVal)
                return;
            if (this.__hasRelations && !this.hasRelationChanged)
                return;

            this.__fetchService(newVal, (payload) => {
                this.__reAssignModel$();
            })
        },
        __hasReAssigned(val) {
            return parseInt(val, 10) || !this.isArrayOfObject(val);
        },
        /**
         * publish model's value via FormBuilder Bus
         * @param newVal
         * @param oldVal
         * @author Amr
         */
        model$Watcher(newVal, oldVal) {
            if (newVal && this.__hasReAssigned(newVal) && this.__options.length)
                this.__reAssignModel$();
            this.publish(this.__model);
            if (newVal !== oldVal) {
                let event = {
                    field: this.__field, newValue: newVal, oldValue: oldVal,
                    index: this.indexRow, rowKey: this.rowKey, rootField: this.rootField
                }
                this.$parent.$emit('updateValue', event)
                FormBuilder.$emit('repeater-fields', event)
            }
        },
    },

    watch: {
        'component$.service': {
            deep: true,
            immediate: true,
            handler: '__serviceWatcher'
        },
        'component$.options': {
            deep: true,
            immediate: true,
            handler: '__optionsWatcher'
        },
        __options: {
            deep: true,
            immediate: true,
            handler(options) {
                FormBuilder.$emit('options-all', this.__rowKey, options)
            }
        }
    },
    created() {
        this.listenToRelations();
    },

    beforeDestroy() {
        // FormRelations.$off(this.__rowKey)
        // FormBuilder.$off(this.relatedField)
    }
}
