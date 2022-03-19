export default {
    data(){
        return {}
    },
    methods: {
        /**
         * @author khalid
         * @param icon
         * @param title
         */
        popSwalToast(title,icon='success'){
            this.$swal({
                toast: true,
                icon: icon,
                title: title,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            })
        },

        /**
         * @author khalid
         * @param title
         * @param text
         * confirmation popup use sweet alert
         */
        popSwalConfirm(title, text){
            return new Promise((resolve, reject) => {
                const swalWithBTNS = this.$swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                })

                swalWithBTNS.fire({
                    title: title,
                    text: text,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: this.$t('Yes, do it!'),
                    cancelButtonText: this.$t('No, cancel!'),
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        resolve()
                    }
                    else {
                        reject()
                    }
                })
            })


        }
    }
}
