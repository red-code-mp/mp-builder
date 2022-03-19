<template>
    <b-form-group :id="`input-${filter.slug}`" :label="title" :label-for="filter.slug">
        <b-form-input
            :id="filter.slug"
            :placeholder="placeholder"
            v-model="value"
        ></b-form-input>
    </b-form-group>
</template>

<script>
import FInput from "../../../mixins/table/Filters/FInput";

export default {
    mixins: [FInput]
}
</script>

<style scoped>

</style>
