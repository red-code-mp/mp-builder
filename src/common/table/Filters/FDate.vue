<template>
    <b-form-group :id="`input-${filter.slug}`" :label="title" :label-for="filter.slug">
        <b-row>
            <b-col md="10">
                <b-form-input
                    type="date"
                    :id="`datepicker-${filter.slug}`"
                    placeholder="please_select"
                    v-model="date"
                ></b-form-input>
            </b-col>
            <b-col md="2">
                <a href="" @click.prevent="resetDate">
                    <b-icon icon="arrow-repeat" font-scale="1.5"></b-icon>
                </a>
            </b-col>
        </b-row>
    </b-form-group>
</template>

<script>
import FDate from "../../../mixins/table/Filters/FDate";

export default {
    mixins: [FDate]
}
</script>

<style scoped>

</style>
