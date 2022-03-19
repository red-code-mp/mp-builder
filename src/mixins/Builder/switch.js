import Base from './Input'

export default {
    mixins: [Base],
    methods: {
        onCreated() {
            if(!this.formData.hasOwnProperty(this.component$.field))
                this.__model = false;
        }
    }
}
