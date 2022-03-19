<template>
    <div>
        <hr>
        <b-button type="submit" variant="info" :disabled="validationObserver.invalid"
                  @click="submit" v-if="hasSubmit">{{$t('save')}}
        </b-button>
        <slot name="actions"/>
        <b-button variant="info" :disabled="validationObserver.invalid" @click="addMore" v-if="hasAddMore">
            {{$t('Add more')}}
        </b-button>
        <b-button type="reset" variant="light" @click="cancel" v-if="hasCancel">{{$t('Cancel')}}</b-button>
    </div>
</template>
<script>
    export default {
        props: {
            validationObserver: {
                type: Object,
                required: true,
                default: function () {
                    return {}
                }
            },
            config: {
                type: Object,
                required: true,
                default: function () {
                    return {}
                }
            }
        },
        methods: {
            submit() {
                this.$emit('submit')
            },
            cancel() {
                this.$emit('cancel')
            },
            addMore() {
                this.$emit('add-more')
            }
        },
        computed: {
            linkPurpose() {
                if (!this.$route.name)
                    return new Error(false);
                let linkParts = this.$route.name.split('.')
                return linkParts.pop();
            },
            hasAddMore() {
                return !(['update', 'edit'].includes(this.linkPurpose)) && (this.config.add_more == undefined || this.config.add_more === true)
            },
            hasSubmit() {
                return this.config.submit == undefined || this.config.submit === true;
            },
            hasCancel() {
                return this.config.cancel == undefined || this.config.cancel === true;
            }
        }
    }
</script>
<style scoped>
hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
