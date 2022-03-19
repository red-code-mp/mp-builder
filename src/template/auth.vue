<template>
    <div class="kt-grid kt-grid--ver kt-grid--root">
        <div class="kt-grid kt-grid--hor kt-grid--root  kt-login kt-login--v3 kt-login--signin" id="kt_login">
            <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor background-login"
                 style="background-image : url(/Modules/Base/assets/media/bg/bg-3.jpg)">
                <div class="kt-grid__item kt-grid__item--fluid kt-login__wrapper">
                    <div class="kt-login__container">
                        <b-alert variant="success"
                                 :show="dismissCountDown"
                                 dismissible
                                 @dismissed="dismissCountDown=0"
                                 @dismiss-count-down="countDownChanged"
                        >{{message}}
                        </b-alert>
                        <div class="kt-login__logo">
                            <a href="#">
                                <img src="@/assets/media/logos/bashasaray-logo.png" alt="Logo">
                            </a>
                        </div>
                        <div class="kt-login__signin">
                            <div class="kt-login__head">
                            </div>
                            <router-view/>
                            <div class="row kt-login__form-sub">
                                <div class="col kt--align-right">
                                    <a href="javascript:;" id="kt_login_forgot" class="">Forget Password ?</a>
                                </div>
                            </div>
                        </div>
                        <div class="kt-login__forgot">
                            <div class="kt-login__head">
                                <h3 class="kt-login__title">Forgotten Password ?</h3>
                                <div class="kt-login__desc">Enter your email to reset your password:</div>
                            </div>
                            <ValidationObserver v-slot="data" ref="validationObserver">
                                <form class="kt-form" @submit.prevent="resetPassword">
                                    <ValidationProvider :rules="{required:true,email : true}" name="email"
                                                        v-slot="{ errors }">
                                        <div class="input-group">
                                            <input class="form-control" type="text" placeholder="Email" name="email"
                                                   autocomplete="off" v-model="form.email">
                                        </div>

                                        <v-error :errors="[].concat(requestErrors ,errors )"/>
                                    </ValidationProvider>
                                    <div class="kt-login__actions">
                                        <button class="btn btn-brand btn-elevate kt-login__btn-primary">Request
                                        </button>&nbsp;&nbsp;
                                        <button id="kt_login_forgot_cancel"
                                                class="btn btn-light btn-elevate kt-login__btn-secondary">Cancel
                                        </button>
                                    </div>
                                </form>
                            </ValidationObserver>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                form: {
                    email: null,
                },
                dismissSecs: 5,
                dismissCountDown: 0,
                message: '',
                requestErrors: [],
                // background: background
            }
        },
        methods: {
            resetPassword() {
                this.request(this.route('auth.reset_password', {}), {...this.form})
                    .then(
                        (response) => {
                            this.message = response.message
                            document.getElementById("kt_login_forgot_cancel").click();
                            this.showAlert()
                        }
                    ).catch(
                    (error) => {
                        this.set(this.requestErrors, 0, error.statusText)
                    })
            },
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },
            showAlert() {
                this.dismissCountDown = this.dismissSecs
            }
        }
    }
</script>
<style>

</style>
