<template>
    <div class="kt-avatar kt-avatar--outline" id="kt_user_add_avatar">
        <div class="kt-avatar__holder"
             :style="`background-image: url(${__fillImage});background-size: contain;`"
             @click="showImage(__fillImage)"></div>
        <label class="kt-avatar__upload" data-toggle="kt-tooltip" title="" data-original-title="Change avatar">
            <i class="fa fa-pen"></i>
            <input type="file" name="kt_user_add_user_avatar" @change="uploadImage($event)" accept="image/*">
        </label>
        <span class="kt-avatar__cancel" data-toggle="kt-tooltip" title="" data-original-title="Cancel avatar">
				<i class="fa fa-times"></i>
		</span>
    </div>
</template>
<script>
    import Base from '../../../mixins/Builder/Image'

    export default {
        mixins: [Base],
        props: {
            indexField: {
                required: false,
                default: function () {
                    return ''
                }
            },
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>
