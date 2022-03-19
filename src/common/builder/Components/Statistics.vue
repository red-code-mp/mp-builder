<template>
    <div>
        <table class="table table-bordered">
            <thead>
            <tr>
                <td>Attribute</td>
                <td>Data</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(attribute , index) in attributes" :key="`attributes-${index}`">
                <td>{{getAttribute(attribute)}}</td>
                <td>{{getData(attribute)}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import Statistics from "../../../mixins/Builder/Statistics";
export default {
    mixins: [Statistics]
}
</script>
