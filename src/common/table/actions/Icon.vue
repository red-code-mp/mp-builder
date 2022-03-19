<template>
    <a href="" @click.prevent="doAction" v-if="is_visible && isAuthorized">
        <b-icon v-bind="attributes"></b-icon>
    </a>
</template>

<script>
import Icon from "../../../mixins/table/Actions/Icon";

export default {
    mixins: [Icon],
}
</script>

<style scoped>

</style>
