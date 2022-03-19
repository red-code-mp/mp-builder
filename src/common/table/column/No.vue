<template>
    <span>
        {{ (paginator.per_page * (paginator.current_page - 1)) + (columns.index + 1)}}
    </span>
</template>

<script>
import No from "../../../mixins/table/Cells/No";
    export default {
        mixins: [No]
    }
</script>

<style scoped>

</style>
