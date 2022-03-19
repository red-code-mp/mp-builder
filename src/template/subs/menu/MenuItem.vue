<template>
    <li class="kt-menu__item" :class="active" aria-haspopup="true" v-if="isAuthorized">
        <router-link exact
                     :to="{
                      name: section.route ,
                      params : {lang:$i18n.locale} ,
                       props : {slug : transactionSlug}
        }"
                     class="kt-menu__link ">
            <i class="kt-menu__link-icon">
                <b-icon :icon="icon" scale="0.8"></b-icon>
            </i>
            <span class="kt-menu__link-text">{{ section.title }}</span>
        </router-link>
    </li>
</template>

<script>
import Permissions from '@/mixins/Permissions/DocumentTransactionPermissions'

export default {
    props: ['section', 'parent'],
    mixins:[Permissions],
    computed: {
        icon() {
            return this.section.icon ?? 'stop'
        },
        active() {
            return (this.$route.name ?? '') === this.section.route ? 'kt-menu__item--active' : ''
        },
    }
}
</script>

<style scoped>

</style>
