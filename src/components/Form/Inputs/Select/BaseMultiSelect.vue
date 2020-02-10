<script>
import MultiSelectInput from './../MultiSelectInput';

export default {
  mixins: [MultiSelectInput],
  mounted() {
    this.update();
    this.initialize();
    this.registerListeners();
  },
  methods: {
    update() {
      this.emit(this.selected);
    }
  }
};
</script>
