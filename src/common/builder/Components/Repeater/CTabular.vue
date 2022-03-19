<template>
    <div class="table-responsive">
        <table class="table table-bordered table-sm" :key="`tabular-key-${tabularKey}`">
            <caption style="caption-side: top;">{{__caption}}</caption>
            <thead>
            <tr class="d-flex table-secondary">
                <th :class="__classes(index, node)" v-for="(node, index) in __labels" :key="index">
                    <label v-html="__label(node.label, index)"></label>
                </th>
                <th v-if="__show_remove_button && __show_plus_button" class="table-secondary" :class="__actionClasses"
                    @click.prevent="addNewRecord()">
                    <b-input-group size="sm" v-if="__show_plus_button">
                        <b-button variant="light" size="sm"s>
                            <b-icon icon="plus-circle" variant="success"></b-icon>
                        </b-button>
                    </b-input-group>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="formData[__rootField].length"
                v-for="(data, index) in formData[__rootField]" :key="index" class="d-flex">
                <td :class="__classes(i, field)" v-for="(field, i) in __fields" :key="i">
                    <field :component="field" :formData="data" :key="`${field.field}-${rowKey}`"
                           :rowKey="`${rowKey}${index}`" :all-form-data="formData" :indexRow="index"
                           :root-field="__rootField"/>
                </td>
                <td v-if="__show_remove_button && __show_plus_button" :class="__actionClasses">
                    <b-input-group size="sm" v-if="__show_remove_button">
                        <b-button size="sm" v-show="__remove_for_all(index)" @click.prevent="dropRecord(index)">
                            <b-icon icon="trash-fill" variant="danger"></b-icon>
                        </b-button>
                    </b-input-group>
                </td>
            </tr>
            <tr v-if="!formData[__rootField].length ">
                <td colspan="3" class="text-center">
                    No Data For Repeater ..
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import Tabular from "../../../../mixins/Builder/Tab/Tabular";

    export default {
        mixins: [Tabular]
    }
</script>

<style scoped lang="scss">
    .table-responsive {
        position: static !important;
    }

    @import url(https://fonts.googleapis.com/css?family=Patua+One|Open+Sans);
    table {
        background: #f5f5f5;
        border-collapse: separate;
        box-shadow: inset 0 1px 0 #fff;
        font-size: 12px;
        line-height: 24px;
        //margin: 30px auto;
        text-align: left;
        //width: 800px;
    }

    th {
        background: url(https://jackrugile.com/images/misc/noise-diagonal.png), linear-gradient(#5d6573, #a0abbd);
        border-left: 1px solid #5d6573;
        border-right: 1px solid #777;
        border-top: 1px solid #555;
        border-bottom: 1px solid #333;
        box-shadow: inset 0 1px 0 #999;
        color: #fff;
        font-weight: bold;
        padding: 10px 15px;
        position: relative;
        text-shadow: 0 1px 0 #000;
    }

    th:after {
        background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, .08));
        content: '';
        display: block;
        height: 25%;
        left: 0;
        margin: 1px 0 0 0;
        position: absolute;
        top: 25%;
        width: 100%;
    }

    th:first-child {
        border-left: 1px solid #777;
        box-shadow: inset 1px 1px 0 #999;
    }

    th:last-child {
        box-shadow: inset -1px 1px 0 #999;
    }

    td {
        border-right: 1px solid #fff;
        border-left: 1px solid #e8e8e8;
        border-top: 1px solid #fff;
        border-bottom: 1px solid #e8e8e8;
        padding: 10px 15px;
        position: relative;
        transition: all 300ms;
    }

    td:first-child {
        box-shadow: inset 1px 0 0 #fff;
    }

    td:last-child {
        border-right: 1px solid #e8e8e8;
        box-shadow: inset -1px 0 0 #fff;
    }

    tr {
        background: url(https://jackrugile.com/images/misc/noise-diagonal.png);
    }

    tr:nth-child(odd) td {
        background: #f1f1f1 url(https://jackrugile.com/images/misc/noise-diagonal.png);
    }

    tr:last-of-type td {
        box-shadow: inset 0 -1px 0 #fff;
    }

    tr:last-of-type td:first-child {
        box-shadow: inset 1px -1px 0 #fff;
    }

    tr:last-of-type td:last-child {
        box-shadow: inset -1px -1px 0 #fff;
    }

    tbody:hover td {
        color: transparent;
        text-shadow: 0 0 3px #aaa;
    }

    tbody:hover tr:hover td {
        color: #444;
        text-shadow: 0 1px 0 #fff;
    }

    .table-responsive {
        //display:block;
        max-height: 400px;
        table-layout: fixed;
        //overflow-y:auto;
    }

</style>
