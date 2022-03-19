<template>
    <div>
        <b-row class="mb-5">
            <b-col>
                <c-modal :component="component" :header="header" :endpoint="endpoint"
                         @fetchData="prepareFetchService()"/>
            </b-col>
        </b-row>
        <hr class="hrStyle">
            <b-row class="mb-5">
                <b-col cols="3" v-for="(item, index) in data$" :key="`item-${index}`">
                    <b-card title="">
                            <b-row v-for="(attr, index) in __modalAttrs" :key="`attr-${index}`" class="mt-3">
                                <label v-if="attr.label" v-bind="__checkAttributes(attr.label)">{{ __checkValue(attr.label) }}</label>
                                <component :is="attr.component" :value="__value(attr,item)" v-bind="__checkAttributes(attr.field)"
                                           :disabled="true"/>
                            </b-row>
                        <template #footer>
                            <b-row>
                                <b-col cols="6">
                                    <a href="" @click.prevent="prepareEndpoint('update',item.id)">
                                        <b-icon font-scale="1.5" icon="pencil" variant="primary"></b-icon>
                                    </a>
                                </b-col>
                                <b-col cols="6">
                                    <a href="" @click.prevent="__delete('delete',item.id)">
                                        <b-icon font-scale="1.5" icon="x-circle" variant="primary"></b-icon>
                                    </a>
                                </b-col>
                            </b-row>
                        </template>
                    </b-card>
                </b-col>
            </b-row>
    </div>
</template>

<script>
import Builder from '../../../../../mixins/Builder/CardModal'

export default {
    mixins: [Builder],
}
</script>

<style scoped>
hr.hrStyle {
    height: 30px;
    /*border-style: solid;*/
    border-color: #f0f2f0;
    border-width: 1px 0 0 0;
    border-radius: 20px;
}

hr.hrStyle:before {
    display: block;
    content: "";
    /*height: 30px;*/
    /*border-style: solid;*/
    border-color: #8c8b8b;
    border-width: 0 0 1px 0;
    border-radius: 20px;
}
</style>
