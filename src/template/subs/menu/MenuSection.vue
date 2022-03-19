<template>
    <li class="kt-menu__section " v-if="isAuthorized">
        <!--       -->
        <h4 class="kt-menu__section-text">{{ section.title }}</h4>
        <i class="kt-menu__section-icon flaticon-more-v2"></i>
    </li>
</template>

<script>
import Permissions from '@/mixins/Permissions/ModulePermissions'

export default {
    props: ['section'],
    mixins:[Permissions],
}
</script>

<style scoped>

</style>
