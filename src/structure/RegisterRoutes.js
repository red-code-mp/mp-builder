import Bundle from './Bundle';

let routes = [];
/**
 * register modules
 *
 * @author Amr
 */
Bundle.forEach(module => {
    if (module.hasOwnProperty('Routes'))
        routes = routes.concat(module.Routes)
})
/**
 * publish modules' routes
 * @author Amr
 */

export default routes;
