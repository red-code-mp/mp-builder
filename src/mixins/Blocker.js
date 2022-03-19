export default {
    methods: {
        /**
         * block page ( Loading )
         * @author Amr
         */
        blockPage() {
            KTApp.blockPage({
                overlayColor: '#000000',
                state: 'danger',
                message: 'Please wait...'
            });
        },
        /**
         * unblock page
         * @author Amr
         */
        unBlockPage() {
            KTApp.unblockPage();
        }
    }

}