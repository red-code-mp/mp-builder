<template>
    <div class="h1 mb-0" v-if="isAuthorized">
        <span class="kt-switch kt-switch--outline kt-switch--icon kt-switch--info">
		    <label>
		        <input type="checkbox" :checked="status" @click="onClick" :ref="__generateRandomRef">
		            <span></span>
		    </label>
		</span>
    </div>
</template>

<script>
import Status from "../../../mixins/table/Cells/Status";
export default {
    mixins: [Status]
}
</script>

<style scoped>

</style>
