<template>
  <div
    v-show="show"
    class="checkbox-group-item"
    :class="computedWrapperCssClass"
    :style="computedWrapperCssStyle"
  >
    <input
      type="checkbox"
      :id="identity"
      :name="name"
      :disabled="isDisabled"
      :autocomplete="autocomplete"
      :indeterminate.prop="indeterminate"
      :class="inputCssClass"
      v-model="checked"
      @change="update"
    />
    <slot>
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
  </div>
</template>
<script>
import BaseMasterCheckboxInput from './BaseMasterCheckboxInput';

export default {
  mixins: [BaseMasterCheckboxInput]
};
</script>
