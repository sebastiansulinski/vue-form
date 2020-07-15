<script>
import * as behaviours from '@ssdcode/js-behaviours';
import { ref, computed, h } from '@vue/composition-api';
export default {
  name: 'FormWrapper',
  props: {
    group: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    fields: {
      type: Object,
      default: () => {
        return {};
      },
    },
    action: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      default: 'post',
    },
    behaviour: {
      type: String,
      default: 'reload',
    },
    helpers: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props, { root: { $store } }) {
    const clone = data => {
      return JSON.parse(JSON.stringify(data));
    };

    const initial = clone(props.fields);
    let processing = ref(false);
    let disabledRef = ref(props.disabled);
    let fieldsRef = ref(props.fields);
    let helpersRef = ref(props.helpers);

    const addNotification = payload =>
      $store.dispatch('notification/add', payload);

    const toggleDisable = () => (disabledRef.value = !disabledRef.value);

    const response = computed(() => {
      return $store.state.form.response[props.group] || {};
    });

    const errors = computed(() => {
      return $store.state.errors.errors[props.group] || {};
    });

    const submit = () => {
      if (processing.value || disabledRef.value) {
        return;
      }
      processing = true;
      $store
        .dispatch('form/submit', {
          group: props.group,
          action: props.action,
          method: props.method,
          fields: fieldsRef,
        })
        .then(response => {
          behaviours?.[props.behaviour](response, {
            fields: fieldsRef,
            initial,
            helpers: helpersRef,
            processing,
            response,
            errors,
            clone,
            addNotification,
          });
        })
        .catch(error => {
          if (
            error?.response?.status &&
            [301, 302].includes(error.response.status)
          ) {
            behaviours?.redirect(error.response);
            return;
          }
          processing = false;
          addNotification({
            type: 'error',
            message:
              error?.response?.data?.message ||
              error?.message ||
              'Request failed',
          });
        });
    };

    return {
      fieldsRef,
      initial,
      helpersRef,
      processing,
      disabledRef,
      toggleDisable,
      response,
      errors,
      clone,
      submit,
      addNotification,
    };
  },
  render() {
    return h(
      'form',
      {
        attrs: {
          novalidate: true,
        },
        on: {
          submit: event => {
            event.preventDefault();
            this.submit();
          },
        },
      },
      // todo
      // when upgraded to v3 - update to this.$slots.default
      this.$scopedSlots.default({
        fields: this.fieldsRef,
        helpers: this.helpersRef,
        response: this.response,
        errors: this.errors,
        processing: this.processing,
        disabled: this.disabledRef,
        toggleDisable: this.toggleDisable,
      })
    );
  },
};
</script>
