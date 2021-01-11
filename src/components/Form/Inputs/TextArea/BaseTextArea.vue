<script>
import BaseInput from './../BaseInput';

export default {
  mixins: [BaseInput],
  data() {
    return {
      currentBody: '',
      body: '',
    };
  },
  computed: {
    inputListeners() {
      return Object.assign({}, this.$listeners, {
        input: () => {
          this.emit(this.body);
        },
      });
    },
  },
  mounted() {
    this.currentBody = this.$slots.body
      ? this.$slots.body[0].text
      : this.currentValue;
    this.reset();
    this.initialize();
    this.registerListeners();
  },
  methods: {
    reset() {
      this.emit((this.body = this.currentBody));
    },
    clear() {
      this.emit((this.body = null));
    },
  },
};
</script>
