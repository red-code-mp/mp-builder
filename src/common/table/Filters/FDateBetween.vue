<template>
    <div>
        <b-row>
            <b-col md="10">
                <b-form-group :label="title_1">
                    <b-form-input type="date" :id="`datepicker-${filter.slug}-1`"
                                  v-model="date_from"
                                  placeholder="please_select" locale="ar"></b-form-input>
                </b-form-group>
                <b-form-group :label="title_2">
                    <b-form-input type="date" :id="`datepicker-${filter.slug}-2`"
                                  v-model="date_to"
                                  placeholder="please_select" locale="ar"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col md="2" class="pt-5">
                <a href="" @click.prevent="resetDate">
                    <b-icon icon="arrow-repeat" font-scale="1.5"></b-icon>
                </a>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import FDate from "../../../mixins/table/Filters/FDateBetween";

export default {
    mixins: [FDate]
}
</script>

<style scoped>

</style>
