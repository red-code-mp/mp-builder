import Bundle from './Bundle'

let ar = {}
let en = {}

/**
 * @author khalid
 * publish module languages
 */

Bundle.forEach(module => {
    ar = {...ar, ...module.ArLang}
    en = {...en, ...module.EnLang}
})


export {ar, en}
