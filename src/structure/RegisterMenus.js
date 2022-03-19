import Bundle from './Bundle';

let menu = [];
/**
 * @author Khalid
 * publish Module Menu
 */
Bundle.forEach(module => {
    if (module.Menu)
        menu = menu.concat(module.Menu)
})

/**
 * slug auto-generation
 * @author Amr
 */
let module = ''
menu = menu.map(menu => {
    if (menu.component == 'v-menu-section')
        module = menu.title;
    else {
        menu.slug = menu.hasOwnProperty('slug') ? menu.slug : (module + '/' + menu.title).replace(/ /g,'_')
    }
    return menu;
})
export default menu;
