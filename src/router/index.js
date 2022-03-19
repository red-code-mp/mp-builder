import vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import i18n from '../lang/i18n'
import Store from '../vuex/index'

/**
 * register router into vue instance
 * @author Amr
 */
vue.use(Router);
/**
 * init vue router
 * @type {VueRouter}
 * @author Amr
 */
const router = new Router({
    mode: 'history',
    routes,
    scrollBehavior: (to, from, savedPosition) => {
        if (to.hash) {
            return {selector: to.hash}
        } else {
            return {x: 0, y: 0}
        }
    }
});

router.beforeEach((to, from, next) => {
    let isAuthenticated = Store.getters['Auth/getAutheniticatedResponse'].expires_in > new Date().getTime();
    if (to.name != 'auth.login' && !isAuthenticated)
        next({name: 'auth.login'});
    else
        next();
})

/**
 * public router instance
 * @author Amr
 */
export default router;
