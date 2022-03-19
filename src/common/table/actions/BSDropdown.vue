<template>
    <div class="dropdown dropleft" v-if="is_visible(action)">
        <a href="" type="text" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false"
           v-if="is_parent_visible">
            <b-icon v-bind="iconAttributes"></b-icon>
        </a>
        <div class="dropdown-menu dropdown-menu-left dropdown-menu-md-left" aria-labelledby="dropdownMenuButton">
            <a href="" v-for="(item, index) in action.items" class="dropdown-item" @click.prevent="doAction(item)"
               v-if="is_visible(item)">
                <b-icon v-if="item.icon" v-bind="item.icon.attributes"></b-icon> &nbsp;&nbsp;
                <span class="h6 mb-0">{{ item.title }}</span>
            </a>
        </div>
    </div>
</template>

<script>
    import BSDropdown from "../../../mixins/table/Actions/BSDropdown";

    export default {
        mixins: [BSDropdown]
    }
</script>

<style scoped>

</style>
