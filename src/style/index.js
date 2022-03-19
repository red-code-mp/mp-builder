let fileDirection = Environment.env('Language.rtl.languages').includes(Config.get('lang'))
let direction = 'ltr'
if (fileDirection) {
    direction = 'rtl'
}
require(`../../dist/assets/template/css/style.${direction}.css`)

