<template>
    <li class="kt-menu__item  kt-menu__item--submenu" :class="openMenu" aria-haspopup="true"
        data-ktmenu-submenu-toggle="hover" v-if="isAuthorized">
        <!--     -->
        <a href="javascript:;" class="kt-menu__link kt-menu__toggle">
            <i class="kt-menu__link-icon">
                <b-icon :icon="icon" scale="0.8"></b-icon>
            </i>
            <span class="kt-menu__link-text">{{section.title}}</span>
            <i class="kt-menu__ver-arrow la la-angle-right"></i>
        </a>
        <div class="kt-menu__submenu "><span class="kt-menu__arrow"></span>
            <ul class="kt-menu__subnav">
                <component v-for="(item, key) in section.items" :is="item.component" :section="item" :key="key"
                           :parent="section"/>
            </ul>
        </div>
    </li>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Permissions from '@/mixins/Permissions/DocumentPermissions'

    export default {
        props: ['section'],
        mixins:[Permissions],
        computed: {
            // ...mapGetters('Auth', ['getPermissions' , 'getPermissionDocs']),
            icon() {
                return this.section.icon ?? 'list-check'
            },
            moduleTitle(){
                return this.section.title;
            },
            /**
             * @author khalid
             * @returns {string}
             * set open menu class to object that contains activate route in nested objects
             */
            openMenu() {
                let self = this
                let is_exists = false
                if (!self.$route.name)
                    return
                this.section.items.some(function search(item, key) {
                    if (item.route === self.$route.name) {
                        is_exists = true
                        return true; // break
                    }
                    if (Array.isArray(item.items)) {
                        item.items.some(search)
                    }
                });
                return is_exists ? 'kt-menu__item--open kt-menu__item--expanded' : ''
            },


            // isAuthorized() {
            //     if (this.section.hasOwnProperty('is_authorized'))
            //         return this.section.is_authorized instanceof Function ?
            //             this.section.is_authorized.call(this, this.getPermissions.docs , this.section)
            //             : this.section.is_authorized;
            //
            //     return Boolean(this.getPermissionDocs.find(doc => {
            //         return doc.toLowerCase() == this.section.slug.toLowerCase();
            //     }));
            // },
            //


        },
    }
</script>

<style scoped>

</style>
