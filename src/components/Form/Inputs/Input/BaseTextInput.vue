<script>
import BaseInput from './../BaseInput';

export default {
  mixins: [BaseInput],
  data() {
    return {
      inputType: 'text',
    };
  },
  computed: {
    inputListeners() {
      return Object.assign({}, this.$listeners, {
        input: event => {
          this.markAsInteracted();
          this.emit(event.target.value);
        },
      });
    },
  },
  mounted() {
    this.emit(this.currentValue);
    this.initialize();
    this.registerListeners();
  },
  methods: {
    reset() {
      this.emit(this.currentValue);
    },
    clear() {
      this.emit('');
    },
  },
};
</script>
