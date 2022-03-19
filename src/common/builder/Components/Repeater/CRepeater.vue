<template>
    <div>
        <b-row v-for="(data, index) in formData[__rootField]" :key="index">
            <!-- START FIELD LABEL -->
            <template v-for="(field, i) in __fields">
                <!-- START FIELD LABEL -->
                <b-col v-if="__hasLabel(field)" :sm="__labelCols(field)">
                    <b-label :value="field.label" :rules="__rules(field)" :key="`r-label-${i}`"/>
                </b-col>
                <!-- END FIELD LABEL -->
                <!-- START FIELD -->
                <b-col :sm="__fieldCols(field)">
                    <field :component="field" :formData="data" :key="`${field.field}-${rowKey}`"
                           :rowKey="`${rowKey}${index}`"/>
                </b-col>
                <!-- END FIELD -->
            </template>
            <b-col>
                <b-input-group size="sm">
                    <b-button size="sm" v-show="index === 0" @click.prevent="addNewRecord(index)">
                        <b-icon icon="plus-circle" variant="success"></b-icon>
                    </b-button>
                    <b-button size="sm" v-show="index !== 0" @click.prevent="dropRecord(index)">
                        <b-icon icon="trash-fill" variant="danger"></b-icon>
                    </b-button>
                </b-input-group>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import Repeater from "../../../../mixins/Builder/Tab/Repeater";
import GroupFields from '../../../../mixins/Builder/GroupFields'

export default {
    mixins: [Repeater, GroupFields]
}
</script>

<style scoped>

</style>
