<template>
    <h1>Here we are</h1>
</template>
<script>
    export default {
        created() {
            console.log('lang', this.$route.path.split('/'), this.vuex_languages)
            // this.$router.push({
            //     path: 'ar/' + this.$route.path,
            //     params: {
            //         lang: 'ar'
            //     }
            // })
            this.$router.replace({
                params: {
                    lang: 'ar'
                }
            })
        }
    }

</script>