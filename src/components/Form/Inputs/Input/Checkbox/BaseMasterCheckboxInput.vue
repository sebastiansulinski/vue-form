<script>
import BaseInput from './../../BaseInput';
import MultiHandler from './../../../../../mixins/MultiHandler';

export default {
  mixins: [BaseInput, MultiHandler],
  props: {
    total: {
      type: Number,
      required: true,
    },
    fire: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      checked: false,
      indeterminate: false,
    };
  },
  methods: {
    evaluate() {
      const length = this.items.length;
      this.checked = length === this.total;
      this.indeterminate = length > 0 && length < this.total;
    },
    update() {
      window.EventBus.fire(this.fire, this.checked);
    },
  },
};
</script>
