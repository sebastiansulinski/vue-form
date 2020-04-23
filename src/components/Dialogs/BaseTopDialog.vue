<script>
import {
  AjaxCaller,
  EscapeHandler,
  ErrorReporter,
} from '@ssdcode/cms-partials';
import Behaviour from '../Form/Behaviour';
export default {
  name: 'base-top-dialog',
  mixins: [AjaxCaller, EscapeHandler],
  props: {
    sessionDialog: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      id: null,
      type: null,
      message: '',
      url: null,
      data: {},
      methodType: 'get',
      timeout: null,
    };
  },
  computed: {
    isVisible() {
      return this.message !== '';
    },
    overlay() {
      return this.isVisible && this.typeIs('confirm');
    },
  },
  created() {
    window.EventBus.listen('clear-top-dialog', this.clear);
    window.EventBus.listen('top-alert', this.alertEvent);
    window.EventBus.listen('top-warning', this.warningEvent);
    window.EventBus.listen('top-confirm', this.confirmEvent);
  },
  mounted() {
    if (Object.keys(this.sessionDialog).length) {
      setTimeout(() => {
        window.EventBus.fire(this.sessionDialog.type, {
          id: 'session-' + this.sessionDialog.type,
          message: this.sessionDialog.message,
        });
      }, 500);
    }
  },
  methods: {
    handleEscape() {
      this.clear();
    },
    typeIs(type) {
      return this.type === type;
    },
    visibleFor(type) {
      return this.isVisible && this.typeIs(type);
    },
    clear(data = null) {
      this.clearCountDown();
      this.type = null;
      this.message = '';
      this.url = null;
      this.data = {};
      this.methodType = 'get';
      this.stopProcessingAjaxCall();
      window.EventBus.fire(this.id + '-cleared', data || {});
    },
    clearCountDown() {
      if (this.timeout === null) {
        return;
      }
      clearTimeout(this.timeout);
      this.timeout = null;
    },
    alert(data, type) {
      this.clear();
      this.id = data.id;
      this.type = type;
      this.message = data.message;
      this.countDown();
    },
    alertEvent(data) {
      this.alert(data, 'alert');
    },
    warningEvent(data) {
      this.alert(data, 'warning');
    },
    confirmEvent(data) {
      this.clear();
      this.id = data.id;
      this.type = 'confirm';
      this.message = data.message;
      if (data.url) {
        this.url = data.url;
      }
      if (data.data) {
        this.data = data.data;
      }
      if (data.method) {
        this.methodType = data.method.toLowerCase();
      }
    },
    countDown() {
      this.timeout = setTimeout(() => {
        this.clear();
      }, 7000);
    },
    makeCall() {
      this.startProcessingAjaxCall();
      if (this.url) {
        this.makeAjaxRequest(
          this.success,
          this.failure,
          this.data,
          this.url,
          this.methodType
        );
      } else {
        this.success();
      }
    },
    success(response) {
      window.EventBus.fire(this.id + '-called', {
        response: response,
        dialog: this,
      });
    },
    failure(error) {
      if (
        (error.response || {}).status &&
        [301, 302].includes(error.response.status)
      ) {
        Behaviour.redirect(this, error.response);
        return;
      }
      ErrorReporter.report(error, null, null, this.stopProcessingAjaxCall);
    },
  },
  render() {
    return this.$scopedSlots.default({
      overlay: this.overlay,
      visibleFor: this.visibleFor,
      message: this.message,
      clear: this.clear,
      processing: this.processing,
      makeCall: this.makeCall,
    });
  },
};
</script>
