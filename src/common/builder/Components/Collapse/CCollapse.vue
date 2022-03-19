<template>
    <div class="accordion" role="tablist">
        <b-row>
            <b-col cols="12">
                <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-button block v-b-toggle="__generateRandomKey" variant="light" class="text-left">{{__title}}</b-button>
                    </b-card-header>
                    <b-collapse :id="__generateRandomKey" :visible="true" accordion="my-accordion" role="tabpanel">
                        <b-card-body>
                            <b-card-text>
                                <b-builder :fields="__fields" :form-data="__formData" :preventActions="true"/>
                            </b-card-text>
                        </b-card-body>
                    </b-collapse>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import Collapse from '../../../../mixins/builder/Collapse'
export default {
    mixins: [Collapse],
    data() {
        return {}
    }
}
</script>
