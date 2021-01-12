<template>
  <form @submit.prevent="submit" novalidate>
    <slot
      :group="group"
      :fields="fields"
      :storageData="storageData"
      :summary="summaryBag"
      :validation="validationBag"
      :error="error"
      :reset="reset"
      :clear="clear"
      :submit="submit"
      :combinedData="combinedData"
      :enable="enable"
      :disable="disable"
      :enableEvent="enableEvent"
      :disableEvent="disableEvent"
      :processing="processing"
      :isDisabled="isDisabled"
      :rule="rule"
      :message="message"
    ></slot>
  </form>
</template>
<script>
import Behaviour from './Behaviour';
import Rule from './Validator/Rule';
import Error from './Validator/Error';
import Validator from './Validator/Validator';
import {
  Helper,
  Disabler,
  AjaxCaller,
  ErrorReporter,
} from '@ssdcode/cms-partials';

export default {
  name: 'form-wrapper',
  mixins: [AjaxCaller, Disabler],
  props: {
    group: {
      type: String,
      required: false,
    },
    behaviour: {
      type: String,
      required: false,
    },
    mutators: {
      type: Object,
      default: () => {
        return {};
      },
    },
    eventSubmitOnly: {
      type: Boolean,
      default: false,
    },
    collections: {
      type: Object,
      default: () => {
        return {};
      },
    },
    summary: {
      type: Object,
      default: () => {
        return {};
      },
    },
    localStorageId: {
      type: String,
      default: null,
    },
    sessionStorageId: {
      type: String,
      default: null,
    },
    errorMessage: {
      type: String,
      default: 'Please complete all mandatory fields below',
    },
  },
  data() {
    return {
      fields: { ...this.collections },
      validationBag: {},
      error: new Error(),
      summaryBag: this.summary,
      rule: Rule,
      message: null,
      storageInstance: null,
      storageId: null,
      storageData: {},
    };
  },
  computed: {
    requestData() {
      return this.mutate({ ...this.fields });
    },
    combinedData() {
      return { ...this.storageData, ...this.fields };
    },
  },
  created() {
    window.EventBus.listen('submit-' + this.group, this.submitEvent);
    window.EventBus.listen('initialize-' + this.group, this.initialize);
    window.EventBus.listen('deinitialize-' + this.group, this.deinitialize);
    window.EventBus.listen('reset-' + this.group, this.reset);
    window.EventBus.listen('clear-' + this.group, this.clear);
    window.EventBus.listen('disable-started-' + this.group, this.disable);
    window.EventBus.listen('disable-ended-' + this.group, this.enable);
    window.EventBus.listen('remove-field-' + this.group, this.removeField);
    window.EventBus.listen('update-summary-' + this.group, this.updateSummary);

    this.setStorage();
    this.getStorageData();
  },
  mounted() {
    if (this.isDisabled) {
      window.EventBus.fire('disable-started-' + this.group);
    }
  },
  methods: {
    setStorage() {
      if (this.sessionStorageId) {
        this.storageInstance = window.sessionStorage;
        this.storageId = this.sessionStorageId;
        return;
      }

      if (this.localStorageId) {
        this.storageInstance = window.localStorage;
        this.storageId = this.localStorageId;
      }
    },
    getStorageData() {
      if (!this.storageInstance) {
        return;
      }

      this.storageData = JSON.parse(
        this.storageInstance.getItem(this.storageId)
      );
    },
    setStorageData(data) {
      if (!this.storageInstance) {
        return;
      }
      if (data.captcha) {
        delete data.captcha;
      }
      this.storageInstance.setItem(this.storageId, JSON.stringify(data));
    },
    startProcessingAjaxCallEvent() {
      window.EventBus.fire([
        'submission-started-' + this.group,
        'disable-started-' + this.group,
      ]);
    },
    stopProcessingAjaxCallEvent() {
      this.enable();
      window.EventBus.fire([
        'submission-ended-' + this.group,
        'disable-ended-' + this.group,
      ]);
    },
    initialize(data) {
      this.validationBag[data.field] = {
        rules: data.rules,
        validateIf: data.validateIf,
      };
    },
    deinitialize(field) {
      if (this.validationBag.hasOwnProperty(field)) {
        delete this.validationBag[field];
      }
      this.removeField(field);
      this.error.clear(field);
    },
    disable() {
      this.clearNotifications();
      Disabler.methods.disable.call(this);
    },
    mutate(fields) {
      if (Object.keys(this.mutators).length === 0) {
        return fields;
      }
      Object.keys(this.mutators).forEach((key) => {
        fields[key] = this.mutators[key](fields[key]);
      });
      return fields;
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
      this.error = new Error();

      return new Promise((resolve, reject) => {
        if (!this.requiresValidation()) {
          resolve();
          return;
        }

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
        this.setStorageData(this.combinedData);
        Behaviour[this.behaviour ? this.behaviour : response.data.behaviour](
          this,
          response
        );
        window.EventBus.fire('submission-successful-' + this.group);
      } catch (error) {
        ErrorReporter.report(
          'Invalid form behaviour: ' + this.behaviour,
          this.group,
          null,
          this.stopProcessingAjaxCall
        );
      }
    },
    callFailed(error) {
      if (((error.response || {}).data || {}).errors) {
        this.setServerErrors(error.response.data.errors);
      }
      window.EventBus.fire('submission-failed-' + this.group, this.error);
      if (
        (error.response || {}).status &&
        [301, 302].includes(error.response.status)
      ) {
        Behaviour['redirect'](this, error.response);
        return;
      }
      ErrorReporter.report(
        ErrorReporter.message(error, this.errorMessage),
        this.group,
        null,
        this.stopProcessingAjaxCall
      );
    },
    setServerErrors(errors) {
      Object.keys(errors).forEach((key) => {
        errors[key] = errors[key][0];
      });

      this.error.set(errors);
    },
  },
};
</script>
