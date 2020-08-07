<script>
import MultiSelectInput from './../../MultiSelectInput';

export default {
  mixins: [MultiSelectInput],
  mounted() {
    if (this.selected) {
      this.emit(this.selected);
    }
    this.initialize();
    this.registerListeners();
  },
  methods: {
    update(event) {
      const value = event.target.value;
      if (this.isSelected(value)) {
        this.selected = this.selected.filter((element) => element !== value);
      } else {
        this.selected.push(value);
      }
      this.emit(this.selected);
    },
  },
};
</script>
