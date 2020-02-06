<script>
import Error from '../Validator/Error'
import FormValidation from '../Validator/FormValidation'
import { Helper, Disabler } from '@ssdcode/cms-partials'

export default {
  mixins: [Disabler],
  components: { FormValidation },
  props: {
    group: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: false
    },
    value: {
      default: ''
    },
    currentValue: {
      default: ''
    },
    options: {
      type: [Array, Object, String],
      default: () => []
    },
    placeholder: {
      type: String,
      required: false
    },
    focus: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: String,
      required: false
    },
    autocomplete: {
      type: String,
      required: false
    },
    validation: {
      type: [Array, Object],
      default: () => []
    },
    error: {
      type: Object,
      default: () => new Error()
    },
    visible: {
      type: Boolean,
      default: true
    },
    inputCssClass: {
      type: String,
      required: false
    },
    validationCssClass: {
      type: String,
      required: false
    },
    wrapperErrorCssClass: {
      type: String,
      default: 'invalid'
    },
    wrapperErrorCssStyle: {
      type: String,
      required: false
    },
    listen: {
      type: String,
      required: false
    },
    fire: {
      type: String,
      required: false
    },
    inputBindings: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      identity: this.id ? this.id : this.name,
      displayValidation: false,
      show: this.visible
    }
  },
  computed: {
    isInvalid() {
      return this.error.has(this.name)
    },
    showValidation() {
      return this.isInvalid && this.displayValidation
    },
    computedValidation() {
      return this.displayValidation ? this.validation : {}
    },
    computedValidationCssClass() {
      return { [this.validationCssClass]: this.isInvalid }
    },
    computedWrapperCssClass() {
      return { [this.wrapperErrorCssClass]: this.isInvalid }
    },
    computedWrapperCssStyle() {
      return { [this.wrapperErrorCssStyle]: this.isInvalid }
    },
    attributeBindings() {
      return this.inputBindings
    }
  },
  beforeDestroy() {
    this.deinitialize()
  },
  methods: {
    emit(value, event = 'input') {
      value = this.mutate(value)
      this.emitFireEvent(value)
      this.$emit(event, value)
    },
    mutate(value) {
      return value
    },
    emitFireEvent(value) {
      if (this.fire) {
        window.EventBus.fire(this.fire, value)
      }
    },
    initialize() {
      if (Helper.isEmpty(this.validation)) {
        return
      }

      let rules = this.validation

      if (!Array.isArray(this.validation)) {
        this.displayValidation = true
        rules = Object.keys(this.validation)
      }

      window.EventBus.fire('initialize-' + this.group, {
        field: this.name,
        rules: rules
      })
    },
    deinitialize() {
      window.EventBus.fire('deinitialize-' + this.group, this.name)
    },
    registerListeners() {
      window.EventBus.listen('reset-form-' + this.group, this.reset)
      window.EventBus.listen('clear-form-' + this.group, this.clear)
    },
    reset() {
      console.log('Please provide reset method implementation for ' + this.name)
    },
    clear() {
      console.log('Please provide clear method implementation for ' + this.name)
    },
    optionId(option) {
      if (option.id) {
        return option.id
      }
      return this.name + '-' + option.value
    }
  },
  watch: {
    disabled(isDisabled) {
      if (isDisabled) {
        this.disable()
      } else {
        this.enable()
      }
    }
  }
}
</script>
