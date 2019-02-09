<template>
    <form @submit.prevent="submit" novalidate>
        <slot
            :group="group"
            :fields="fields"
            :summary="summaryBag"
            :validation="validationBag"
            :error="error"
            :reset="reset"
            :clear="clear"
            :submit="submit"
            :enable="enable"
            :disable="disable"
            :enableEvent="enableEvent"
            :disableEvent="disableEvent"
            :processing="processing"
            :isDisabled="isDisabled"
        ></slot>
    </form>
</template>
<script>
    import Behaviour from './Behaviour';
    import Error from './Validator/Error';
    import Validator from './Validator/Validator';
    import { Helper, Disabler, AjaxCaller } from "@ssdcode/cms-partials";
    export default {
        name: 'form-wrapper',
        mixins: [AjaxCaller, Disabler],
        props: {
            group: {
                type: String,
                required: false
            },
            behaviour: {
                type: String,
                required: false
            },
            eventSubmitOnly: {
                type: Boolean,
                default: false
            },
            collections: {
                type: Object,
                default: () => { return {} }
            },
            summary: {
                type: Object,
                default: () => { return {} }
            }
        },
        data() {
            return {
                fields: {...this.collections},
                validationBag: {},
                error: new Error,
                summaryBag: this.summary
            }
        },
        computed: {
            requestData() {
                return this.fields;
            },
        },
        created() {
            window.EventBus.listen('submit-' + this.group, this.submitEvent);
            window.EventBus.listen('initialize-' + this.group, this.initialize);
            window.EventBus.listen('reset-' + this.group, this.reset);
            window.EventBus.listen('clear-' + this.group, this.clear);
            window.EventBus.listen('disable-started-' + this.group, this.disable);
            window.EventBus.listen('disable-ended-' + this.group, this.enable);
            window.EventBus.listen('remove-field-' + this.group, this.removeField);
            window.EventBus.listen('update-summary-' + this.group, this.updateSummary);
        },
        mounted() {
            if (this.isDisabled) {
                window.EventBus.fire('disable-started-' + this.group);
            }
        },
        methods: {
            startProcessingAjaxCallEvent() {
                window.EventBus.fire([
                    'submission-started-' + this.group,
                    'disable-started-' + this.group
                ]);
            },
            stopProcessingAjaxCallEvent() {
                window.EventBus.fire([
                    'submission-ended-' + this.group,
                    'disable-ended-' + this.group
                ]);
            },
            initialize(data) {
                if (!this.validationBag.hasOwnProperty(data.field)) {
                    this.validationBag[data.field] = data.rules;
                }
            },
            disable() {
                this.clearNotifications();
                Disabler.methods.disable.call(this);
            },
            enableEvent() {
                window.EventBus.fire('disable-ended-' + this.group);
            },
            disableEvent() {
                window.EventBus.fire('disable-started-' + this.group);
            },
            reset() {
                if (this.isDisabled) {
                    return;
                }
                this.cleanse('reset-form');
            },
            clear() {
                if (this.isDisabled) {
                    return;
                }
                this.cleanse('clear-form');
            },
            cleanse(event) {
                this.clearNotifications();
                this.summaryBag = this.summary;
                window.EventBus.fire(event + '-' + this.group);
            },
            clearNotifications() {
                this.error.clear();
                window.EventBus.fire('clear-top-dialog');
            },
            removeField(field) {
                Helper.removeObjectProperties(this, [field], this.fields);
            },
            updateSummary(data) {
                this.summaryBag = Object.assign({}, this.summaryBag, data);
            },
            submit() {
                if (this.eventSubmitOnly) {
                    return;
                }
                this.submitEvent();
            },
            submitEvent() {
                if (this.isDisabled) {
                    return;
                }
                this.validate().then(this.makeCall).catch(this.callFailed);
            },
            validate() {
                return new Promise((resolve, reject) => {

                    if (!this.requiresValidation()) {
                        resolve();
                        return;
                    }

                    this.error = new Error;

                    new Validator(this, resolve, reject);
                });
            },
            requiresValidation() {
                return Object.keys(this.validationBag).length > 0;
            },
            makeCall() {
                window.EventBus.fire('clear-top-dialog');
                this.makeAjaxCall(this.callSuccessful, this.callFailed);
            },
            callSuccessful(response) {
                try {

                    Behaviour[this.behaviour ? this.behaviour : response.data.behaviour](this, response);

                } catch (error) {
                    window.ErrorHandler.showError({
                        message: 'Invalid form behaviour'
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