<template>
    <div class="kt-header__topbar-item kt-header__topbar-item--langs">
        <div class="kt-header__topbar-wrapper" data-toggle="dropdown" data-offset="10px,0px">
              <span class="kt-header__topbar-icon">
                  <img class="" :src="__flag" :alt="__name"/>
               </span>
        </div>
        <div class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround">
            <ul class="kt-nav kt-margin-t-10 kt-margin-b-10">
                <!--                kt-nav__item&#45;&#45;active-->
                <li class="kt-nav__item " v-for="(language , index) in vuex_languages"
                    :key="`header-language-${index}`">
                    <a class="kt-nav__link" @click="changeLanguage(language,  index)">
                        <span class="kt-nav__link-icon">
                            <img :src="language.flag" :alt="language.name"/>
                        </span>
                        <span class="kt-nav__link-text">{{language.name}}</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import {mapActions} from 'vuex'

    export default {
        data() {
            return {
                chosenLanguage: {}
            }
        },
        computed: {
            __chosenLanguage() {
                if (this.isEmptyObject(this.chosenLanguage))
                    return this.vuex_defaultLanguage;
                return this.chosenLanguage;
            },
            __flag() {
                return this.__chosenLanguage.flag;
            },
            __name() {
                return this.__chosenLanguage.name;
            },
            __code() {
                return this.__chosenLanguage.code.toLowerCase();
            }
        },
        methods: {
            ...mapActions('Languages', ['changeDefaultLanguage']),
            changeLanguage(language, index) {
                this.chosenLanguage = language;
                this.changeDefaultLanguage(this.chosenLanguage)
                // this.$router.params.lang = this.__code;
                // this.$router.push({params: {lang: this.__code}})
                this.$router.replace({params: {lang: this.__code}})
                this.$router.go(this.$router);
                this.$i18n.locale = this.__code;
                // window.location.reload();


            }
        }
    }
</script>