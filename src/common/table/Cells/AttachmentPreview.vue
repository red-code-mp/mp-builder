<template>
    <div>
        <a v-if="__value" :href="__value" target="_blank"><b-icon scale="1.5" icon="cloud-download" aria-hidden="true"></b-icon></a>
        <b-icon v-else scale="1.5" icon="cloud-download" variant="secondary" aria-hidden="true"></b-icon>
    </div>
</template>
<script>
import AttachmentPreview from "../../../mixins/table/Cells/AttachmentPreview";
export default {
    mixins: [AttachmentPreview]
}
</script>
