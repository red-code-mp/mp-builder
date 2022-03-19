import BBuilder from './BBuilder'
import BLabel from './subs/label'
import FormGroup from './subs/FormGroup'
import Field from './subs/Field'
import Components from './Components'
import BTabBuilder from "./tabs/BTabBuilder";
import TabForm from "./tabs/TabForm";
import GroupFields from "./subs/GroupFields";
import FormTable from "./Components/FormTable";
import CFormModal from './Components/CFormModal'

/**
 * publish builder's components
 * @author Amr
 */
export default {
    BBuilder,
    BLabel,
    FormGroup,
    Field,
    BTabBuilder,
    TabForm,
    GroupFields,
    FormTable,
    CFormModal,
    ...Components
}
