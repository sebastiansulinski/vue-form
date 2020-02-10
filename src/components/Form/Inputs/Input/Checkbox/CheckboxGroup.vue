<template>
  <div
    v-show="show"
    :class="computedWrapperCssClass"
    :style="computedWrapperCssStyle"
  >
    <div
      v-for="option in options"
      :key="option.value"
      class="checkbox-group-item"
    >
      <input
        type="checkbox"
        :id="(option_id = optionId(option))"
        :name="name"
        :disabled="isDisabled"
        :autocomplete="autocomplete"
        :value="option.value"
        :checked="isSelected(option.value)"
        :class="inputCssClass"
        @change="update"
      />
      <label :for="option_id" v-text="option.name"></label>
    </div>
  </div>
</template>
<script>
import BaseCheckboxGroupInput from './BaseCheckboxGroupInput';

export default {
  mixins: [BaseCheckboxGroupInput]
};
</script>
