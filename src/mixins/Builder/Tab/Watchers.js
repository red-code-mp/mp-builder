export default {
    data(){
        return{}
    },
    methods:{
        tabIndexWatcher(newVal, oldVal){
            FormBuilder.$emit('IndexTabWatch',newVal)
        }
    },
    watch:{
        immediate: true,
        /**
         * @author khalid
         * watch tabIndex change's
         */
        tabIndex: 'tabIndexWatcher',
    }
}
