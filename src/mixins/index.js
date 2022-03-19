import Vue from 'vue'
import Base from './Base'
import EndPoints from './endPoints'
import request from "./request";
import helpers from "./helpers";
import string from "./string";
import component from "./component";
import table from "./table";
import actions from "./actions";
import toast from "./toast";
import swal from "./swal";
import Blocker from "./Blocker";
import vuex from "./vuex";

let mixins = [
    Base,
    EndPoints,
    request,
    helpers,
    string,
    component,
    table,
    actions,
    toast,
    swal,
    Blocker,
    vuex
]
/**
 * publish these mixins globally in vue instance
 * @author Amr
 */
mixins.forEach(mixin => Vue.mixin(mixin))
