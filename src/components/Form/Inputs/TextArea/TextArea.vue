<template>
  <div
    v-show="show"
    :class="computedWrapperCssClass"
    :style="computedWrapperCssStyle"
  >
    <slot name="validation">
      <form-validation
        :label="label"
        :id="identity"
        :name="name"
        :show="showValidation"
        :css-class="computedValidationCssClass"
        :validation="computedValidation"
        :error="error"
      ></form-validation>
    </slot>
    <textarea
      :id="identity"
      :name="name"
      :disabled="isDisabled"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :class="inputCssClass"
      :style="inputCssStyle"
      v-focus="focus"
      v-on="inputListeners"
      v-model="body"
    ></textarea>
  </div>
</template>
<script>
import BaseTextArea from './BaseTextArea';

export default {
  mixins: [BaseTextArea],
};
</script>
