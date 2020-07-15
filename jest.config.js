module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: [
    '/node_modules/(?!@ssdcode/js-behaviours|@ssdcode/js-caller|@ssdcode/vue-form-inputs|@ssdcode/vue-notification)',
  ],
};
