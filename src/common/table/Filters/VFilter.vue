<template>
    <b-row>
        <b-col v-if="filters.length">
            <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-1 variant="secondary" class="text-left font-weight-bold">Filters</b-button>
                </b-card-header>
                <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                        <b-row>
                            <b-col md="3" v-for="(filter,index) in filters" :key="index">
                                <component :is="filter.type" :filter="filter"></component>
                            </b-col>
                        </b-row>
                    </b-card-body>
                </b-collapse>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
import FDate from "./FDate";
import FInput from "./FInput";
import FSelect from "./FSelect";
import FDateBetween from "./FDateBetween";

export default {
    props: {
        filters: {
            type: Array,
            required: true
        },
    },
    components: {
        FDate,
        FSelect,
        FInput,
        FDateBetween
    },
    methods: {
        resetFilters() {
        }
    },
    created() {
    }
}
</script>

<style scoped>

</style>
