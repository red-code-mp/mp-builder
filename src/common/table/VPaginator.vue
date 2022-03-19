<template>
    <b-col class="md-3">
        <b-pagination-nav
            :value="pagination.current_page"
            :number-of-pages="pagination.last_page"
            :link-gen="linkGen"
            use-router
            pills
            align="right"
        ></b-pagination-nav>
    </b-col>

</template>
<script>
import VPaginator from "../../mixins/table/VPaginator";

export default {
    mixins: [VPaginator]
}
</script>
<style>

</style>
