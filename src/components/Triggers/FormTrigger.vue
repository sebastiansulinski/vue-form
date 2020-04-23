<script>
import Trigger from './Trigger';

export default {
  name: 'form-trigger',
  mixins: [Trigger],
  props: {
    fire: {
      type: String,
      required: true,
    },
  },
  created() {
    window.EventBus.listen(
      'submission-started-' + this.group,
      this.startProcessing
    );
    window.EventBus.listen(
      'submission-ended-' + this.group,
      this.stopProcessing
    );
  },
  methods: {
    trigger() {
      window.EventBus.fire(this.fire + '-' + this.group);
    },
  },
};
</script>
