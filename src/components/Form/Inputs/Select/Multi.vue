<template>
  <div
    v-show="show"
    :class="computedWrapperCssClass"
    :style="computedWrapperCssStyle"
  >
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
    <select
      :id="identity"
      :name="name"
      :disabled="isDisabled"
      :autocomplete="autocomplete"
      :class="inputCssClass"
      v-focus="focus"
      v-model="selected"
      @change="update"
      multiple
    >
      <option v-if="placeholder" v-text="placeholder" value></option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        v-text="option.name"
      ></option>
    </select>
  </div>
</template>
<script>
import BaseMultiSelect from './BaseMultiSelect';

export default {
  mixins: [BaseMultiSelect],
};
</script>
