<script>
    import Trigger from './Trigger';
    import Behaviour from './Behaviour';
    import { AjaxCaller } from "@ssdcode/cms-partials";
    import MultiHandler from './../../mixins/MultiHandler';
    export default {
        name: 'multi-checkbox-trigger',
        mixins: [Trigger, AjaxCaller, MultiHandler],
        props: {
            behaviour: {
                type: String,
                required: false
            },
            listen: {
                type: String,
                required: false
            }
        },
        computed: {
            requestData() {
                return { items: this.items };
            }
        },
        methods: {
            evaluate() {
                this.isDisabled = this.items.length === 0;
            },
            trigger() {
                if (Behaviour.isNonAjax(this.behaviour)) {
                    Behaviour[this.behaviour](this, this.items);
                    return;
                }
                this.makeAjaxCall(this.callSuccessful, this.callFailed);
            },
            startProcessingAjaxCallEvent() {
                window.EventBus.fire('disable-started-' + this.group);
            },
            stopProcessingAjaxCallEvent() {
                window.EventBus.fire('disable-ended-' +  this.group);
            },
            callSuccessful(response) {
                try {
                    Behaviour[this.behaviour ? this.behaviour : response.data.behaviour](this, response);
                } catch (error) {
                    window.ErrorHandler.showError({
                        message: "Invalid form behaviour '" + response.data.behaviour + "'."
                    });
                    this.stopProcessingAjaxCall();
                }
            },
            callFailed(error) {
                window.ErrorHandler.showError(error, this.stopProcessingAjaxCall);
            }
        }
    }
</script>