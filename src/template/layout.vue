<template>
    <div>
        <!-- begin:: Page -->
        <!-- begin:: Header Mobile -->
        <mobile-header/>
        <!-- end:: Header Mobile -->
        <div class="kt-grid kt-grid--hor kt-grid--root">
            <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page">
                <!-- begin:: Aside -->
                <v-nav/>
                <!-- end:: Aside -->
                <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper" id="kt_wrapper">
                    <!-- begin:: Header -->
                    <v-header/>
                    <!-- end:: Header -->
                    <div class="kt-content kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor" id="kt_content">

                        <!-- begin:: Subheader -->
<!--                        <bread-crumb/>-->
                        <!-- end:: Subheader -->

                        <!-- begin:: Content -->
                        <div class="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
                            <router-view :key="$route.path"/>
                        </div>
                        <!-- end:: Content -->
                    </div>

                    <!-- begin:: Footer -->
                    <v-footer/>
                    <!-- end:: Footer -->
                </div>
            </div>
        </div>
        <!-- end:: Page -->
        <!-- begin::Quick Panel -->
        <quick-panels/>
        <!-- end::Quick Panel -->
        <!-- begin::Scrolltop -->
        <scroll/>
        <!-- end::Scrolltop -->
        <!--Begin:: Chat-->
        <chat/>
        <!--ENd:: Chat-->
        <modals/>
    </div>
</template>
<script>
    import components from './subs'

    export default {
        components
    }
</script>

<style scoped>
.kt-content {
    padding: 0;
}
</style>
