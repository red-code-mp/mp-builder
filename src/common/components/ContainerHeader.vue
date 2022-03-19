<template>
    <span class="">
        <router-link :to="action.route" v-for="(action, index) in __actions" :key="index">
            <b-button v-bind="action.button.attributes" pill variant="outline-secondary" size="md" class="m-1">
                <b-icon v-bind="action.icon.attributes"></b-icon>
                {{ action.button.text }}
            </b-button>
        </router-link>
    </span>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {},
    computed: {
        __actions() {
            let actions = []
            actions = this.$route.meta.more_actions.map((action, index) => {
                let route = {
                    name: action.route.to, params: this.__prepareParams(action.route.params ?? {}),
                    query: this.__prepareParams(action.route.query) ?? {}
                }
                return {...action, route: route}
            });
            return actions
        }
    },
    created() {
    }
}
</script>

<style scoped>

</style>
