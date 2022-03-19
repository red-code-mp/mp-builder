import Vue from 'vue'
import Container from "./container";
import GTable from "../table/GTable";
import Actions from "../table/column/Actions";
import No from "../table/column/No"
import Icon from "../table/actions/Icon";
import Dropdown from "../table/actions/BSDropdown";
import BVDropdown from "../table/actions/BVDropdown";
import GStatus from '../table/column/Status'
import BReferenceActions from "../table/actions/BReferenceActions";
import tree from "./tree";
import AttachmentPreview from "../table/Cells/AttachmentPreview";
import GVariantCell from "../table/column/VariantCell";
import GFormModal from "../table/modals/GFormModal";
import TableDetails from "./table-details"
import ContainerHeader from "./ContainerHeader";

Vue.component('container', Container)
Vue.component('g-table', GTable)
Vue.component('g-actions', Actions)
Vue.component('g-no', No)
Vue.component('bv-icon', Icon)
Vue.component('bs-dropdown', Dropdown)
Vue.component('bv-dropdown', BVDropdown)
Vue.component('g-status', GStatus)
Vue.component('b-reference-actions', BReferenceActions)
Vue.component('attachment-preview', AttachmentPreview)
Vue.component('g-variant-cell', GVariantCell)
Vue.component('g-form-modal', GFormModal)
Vue.component('tree', tree)
Vue.component('table-details', TableDetails)
require('../../template/subs/menu')
Vue.component('container-header',ContainerHeader)
