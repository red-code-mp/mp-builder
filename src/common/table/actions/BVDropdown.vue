<template>
    <b-dropdown v-bind="caretAttributes">
        <template v-slot:button-content>
            <b-icon v-bind="iconAttributes"></b-icon>
            <span>{{title}}</span>
        </template>
        <b-dropdown-item-button v-for="(item, index) in action.items"
                                :key="index" v-bind="itemAttributes(item)"
                                @click="doAction(item)">
            <b-icon v-if="item.icon" v-bind="item.icon.attributes"></b-icon>
            <span>{{item.title}}</span>
        </b-dropdown-item-button>
    </b-dropdown>
</template>

<script>
    import BVDropdown from "../../../mixins/table/Actions/BVDropdown";

    export default {
        mixins: [BVDropdown]
    }
</script>

<style scoped>

</style>
