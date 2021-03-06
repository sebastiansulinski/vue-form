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
    <textarea :ref="identity" :disabled="isDisabled"></textarea>
  </div>
</template>
<script>
import Toolbar from './Toolbar';
import BaseInput from './../BaseInput';

export default {
  mixins: [BaseInput],
  props: {
    contentsCss: {
      type: String,
      required: false,
    },
    config: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      currentBody: '',
      editor: null,
      default: {
        toolbar: this.toolbar(),
        language: 'en',
        height: '20rem',
        contentsCss: this.contentsCss,
        stylesSet: 'default',
        format_tags: 'p;h1;h2;h3;h4;h5;h6;pre;address;div;ul',
        format_ul: {
          element: 'ul',
          name: 'List',
          attributes: { class: 'list' },
        },
        startupOutlineBlocks: true,
        allowedContent: true,
        templates_replaceContent: false,
        htmlEncodeOutput: false,
        entities: false,
        readOnly: this.isDisabled,
      },
    };
  },
  mounted() {
    if (typeof window.CKEDITOR === 'undefined') {
      return;
    }
    this.currentBody = this.$slots.body ? this.$slots.body[0].text : '';
    this.makeEditor();
    this.initialize();
    this.registerListeners();
  },
  methods: {
    makeEditor() {
      this.editor = window.CKEDITOR.replace(
        this.$refs[this.identity],
        Object.assign({}, this.default, this.config)
      );
      this.reset();
      this.editor.on('change', this.update);
    },
    setData(value) {
      this.editor.setData(value);
    },
    update() {
      this.emit(this.editor.getData());
    },
    toolbar() {
      return Toolbar[this.config.toolbar || 'full'];
    },
    reset() {
      this.setData(this.currentBody);
      this.emit(this.currentBody);
    },
    clear() {
      this.setData('');
      this.emit('');
    },
  },
  watch: {
    isDisabled(isReadOnly) {
      this.editor.setReadOnly(isReadOnly);
    },
  },
};
</script>
