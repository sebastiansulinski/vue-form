<script>
import BaseInput from './../BaseInput';

export default {
  mixins: [BaseInput],
  data() {
    return {
      checked: this.currentValue,
    };
  },
  mounted() {
    if (this.checked) {
      this.emit(this.checked);
    }
    this.initialize();
    this.registerListeners();
  },
  methods: {
    reset() {
      if (this.currentValue) {
        this.emit((this.checked = this.currentValue));
        return;
      }
      this.clear();
    },
    clear() {
      this.checked = false;
      window.EventBus.fire('remove-field-' + this.group, this.name);
    },
    update(event) {
      this.emit((this.checked = event.target.value));
    },
  },
};
</script>
