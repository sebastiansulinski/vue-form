<script>
import BaseInput from './../BaseInput';
import { Helper, AjaxCaller, ErrorReporter } from '@ssdcode/cms-partials';

export default {
  mixins: [BaseInput, AjaxCaller],
  props: {
    dependsOn: {
      type: [Number, String],
      required: false,
    },
    fields: {
      type: Object,
      default: () => {
        return {};
      },
    },
    isLast: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selected: this.currentValue,
      records: [],
    };
  },
  computed: {
    endPoint() {
      return this.options;
    },
    requestData() {
      return {
        id: this.name,
        items: Object.assign(this.fields, {
          [this.name]: this.selected,
        }),
      };
    },
  },
  mounted() {
    this.fetch();
    this.emit(this.selected);
    this.initialize();
    this.registerListeners();
  },
  methods: {
    fetch() {
      if (Helper.isObject(this.options)) {
        this.records = this.options[this.dependsOn];
        return;
      }
      if (typeof this.options === 'string') {
        this.fetchAjax();
        return;
      }
      this.records = this.options;
    },
    fetchAjax() {
      if (this.isDisabled) {
        return;
      }
      this.makeAjaxCall(this.callSuccessful, this.callFailed);
    },
    callSuccessful(response) {
      this.stopProcessingAjaxCall();
      this.records = response.data.records;
      if (response.data.summary) {
        window.EventBus.fire(
          'update-summary-' + this.group,
          response.data.summary
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
    reset() {
      if (this.currentValue) {
        this.emit((this.selected = this.currentValue));
        return;
      }
      this.clear();
    },
    clear() {
      this.emit((this.selected = ''));
    },
    update() {
      this.emit(this.selected);
      if (this.isLast) {
        this.fetch();
      }
    },
  },
  watch: {
    dependsOn(value) {
      this.selected = '';
      if (!value) {
        this.disable();
      } else {
        this.enable();
        this.fetch();
      }
      this.emit(this.selected);
    },
  },
};
</script>
