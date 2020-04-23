<script>
import Trigger from './Trigger';
import Behaviour from './Behaviour';
import { AjaxCaller, ErrorReporter } from '@ssdcode/cms-partials';
import MultiHandler from './../../mixins/MultiHandler';

export default {
  name: 'multi-checkbox-trigger',
  mixins: [Trigger, AjaxCaller, MultiHandler],
  props: {
    behaviour: {
      type: String,
      required: false,
    },
    listen: {
      type: String,
      required: false,
    },
  },
  computed: {
    requestData() {
      return { items: this.items };
    },
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
      window.EventBus.fire('disable-ended-' + this.group);
    },
    callSuccessful(response) {
      try {
        Behaviour[this.behaviour ? this.behaviour : response.data.behaviour](
          this,
          response
        );
      } catch (error) {
        ErrorReporter.report(
          "Invalid form behaviour '" + response.data.behaviour + "'.",
          this.group,
          null,
          this.stopProcessingAjaxCall
        );
      }
    },
    callFailed(error) {
      ErrorReporter.report(
        error,
        this.group,
        null,
        this.stopProcessingAjaxCall
      );
    },
  },
};
</script>
