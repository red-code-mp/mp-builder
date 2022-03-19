import ModulesRoutes from '../structure/RegisterRoutes'
import index from '../template/index'
import notFound from '../template/notFound'
import i18n from '@/lang/i18n'

let routes = [
    {
        path: '/admin',
        component: index,
        children: [
            {
                path: ':lang',
                component: index,
                children: []
            },
            {
                path: 'en/home',
                component: index,
                name: 'home',
                children: []
            },
        ]
    },
    {
        path: '*',
        component: notFound,
        children: []
    },
];

/**
 * merge base with modules' routes
 *
 * @type {*[]}
 * @author Amr
 */
routes[0].children[0].children = routes[0].children[0].children.concat(ModulesRoutes)
/**
 * publish routes
 * @author Amr
 */
export default routes;
