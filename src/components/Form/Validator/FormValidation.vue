<template>
  <base-form-validation
    :label="label"
    :name="name"
    :show="show"
    :validation="validation"
    :error="error"
    v-slot:default="{ showLabel, showErrorFor, validation }"
  >
    <label :for="id" v-if="showLabel">
      <span v-if="label" v-text="label"></span>
      <span class="validation" v-show="show">
        <span
          :class="cssClass"
          v-for="(message, rule) in validation"
          :key="rule"
          v-show="showErrorFor(rule)"
          v-text="message"
        ></span>
      </span>
    </label>
  </base-form-validation>
</template>
<script>
import Error from './Error'
import BaseFormValidation from './BaseFormValidation'

export default {
  name: 'form-validation',
  components: { BaseFormValidation },
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      default: false
    },
    cssClass: {
      type: [Array, Object, String],
      required: false
    },
    validation: {
      type: Object,
      default: () => {
        return {}
      }
    },
    error: {
      type: Object,
      default: () => new Error()
    }
  }
}
</script>
