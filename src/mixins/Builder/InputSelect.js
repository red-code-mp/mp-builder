import Base from './base'
import InputPartial from './InputSelect/input'
import SelectPartial from './InputSelect/select'

export default {
    mixins: [Base, InputPartial, SelectPartial],
    /**
     * field's component
     * @author Amr
     */
    props: {
        field: {
            required: true,
            default: () => {
                return {}
            }
        }
    },
}
