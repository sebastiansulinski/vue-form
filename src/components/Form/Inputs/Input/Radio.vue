<template>
  <div
    v-show="show"
    :class="computedWrapperCssClass"
    :style="computedWrapperCssStyle"
  >
    <div v-for="option in options" :key="option.id" class="checkbox-group-item">
      <input
        type="radio"
        :id="(option_id = optionId(option))"
        :name="name"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :value="option.value"
        v-model="checked"
        @change="update"
      />
      <label :for="option_id" v-if="option.name" v-text="option.name"></label>
    </div>
  </div>
</template>
<script>
import BaseRadioInput from './BaseRadioInput';

export default {
  mixins: [BaseRadioInput]
};
</script>
