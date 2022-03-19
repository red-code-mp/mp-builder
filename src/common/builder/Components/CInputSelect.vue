<template>
    <ValidationObserver v-slot="{errors}" class="input-group">
        <ValidationProvider :rules="__inputValidationRules" :name="__inputField"
        >
            <input aria-label="Text input with dropdown button" v-model="__input" class="form-control"
                   v-bind="__inputAttributes">
        </ValidationProvider>
        <div class="input-group-append">
            <ValidationProvider :rules="__dropDownValidationRules" :name="__dropDownField"
                                ref="dropDownInput"

            >
                <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false" v-html="__selectedOption">
                </button>

                <div class="dropdown-menu" x-placement="bottom-start"
                     style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(655px, 38px, 0px);">
                    <a class="dropdown-item" @click="resetOption">Chose {{__dropDownPlaceholder}} ...</a>
                    <div role="separator" class="dropdown-divider"></div>
                    <a class="dropdown-item" v-for="(option , index) in dropDownOptions$"
                       :key="`drop-down-key-${index}`"
                       @click="choseOption(option,index)"
                    >{{option[__labelAttribute]}}</a>
                </div>
            </ValidationProvider>
        </div>
        <v-error style="width: 100%;" :errors="customValidationErrors(errors)"/>

    </ValidationObserver>
</template>
<script>
    import Base from '../../../mixins/Builder/InputSelect'

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

<style lang="scss" scoped>
    .input-group {
        > span {
            flex: 1 1 auto;
            width: 1%;
        }

        input {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            border-right: 0;
        }

        button {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            height: 100%;
        }
    }


</style>
