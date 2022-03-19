<template>
    <div>
        <ValidationProvider :rules="__rules" :name="__rowKey" v-slot="{ errors }">
            <b-form-group label="" v-slot="{ ariaDescribedby }">
                <b-form-checkbox-group v-model="__model" :aria-describedby="ariaDescribedby">
                    <table class="vgt-table table-hover table-bordered mb-3 ">
                        <thead>
                        <tr>
                            <th class="vgt-left-align sortable" style="min-width: auto; width: auto;">id</th>
                            <th class="vgt-left-align sortable" style="min-width: auto; width: auto;">Role</th>
                            <th class="vgt-left-align sortable" style="min-width: auto; width: auto;">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(option , index) in __options" :value="option">
                            <td class="vgt-left-align">
                                <b-form-checkbox :value="option"
                                                 :key="`form-group-checkbox-${__field}-${index}`"
                                                 v-bind="__extra"
                                                 @change="onCheckBoxClick"
                                                 disabled="disabled"></b-form-checkbox>
                            </td>
                            <td class="vgt-left-align">
                                {{option.name}}
                            </td>
                            <td>
                                <span @click="edit$(option)">
                                    <b-icon icon="pencil-square" variant="info" class="m-1"></b-icon>
                                </span>
                                <span @click="assign$(option.id , option.name)"
                                      title="Assign all permissions of the role to current user">
                                    <b-icon icon="journal-plus" variant="success" class="m-1"></b-icon>
                                </span>
                                <span @click="delete$(option.id, option.name)" title="Remove all permissions of role">

                                    <b-icon icon="x-square" variant="danger" class="m-1"></b-icon>
                                </span>
                            </td>
                        </tr>
                        </tbody>

                    </table>
                </b-form-checkbox-group>
            </b-form-group>
            <v-error :errors="errors"/>
        </ValidationProvider>
    </div>
</template>
<script>
    import Base from '../../../mixins/Builder/CheckBoxTable.js'

    export default {
        mixins: [Base],

    }
</script>
