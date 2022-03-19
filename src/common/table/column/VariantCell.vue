<template>
    <b-badge :variant="__variant">{{__label}}</b-badge>
</template>

<script>
import VariantCell from "../../../mixins/table/Cells/VariantCell";

export default {
    mixins: [VariantCell]
}
</script>

<style scoped lang="scss">
@import "../../../assets/_variables.scss";
</style>
