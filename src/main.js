import Vue from 'vue';
import EventBus from '@ssdcode/vue-event-bus';
import { FocusDirective } from '@ssdcode/vue-focus-directive';

window.EventBus = window.EventBus || new EventBus();

import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  directives: {
    FocusDirective
  },
  render: h => h(App)
}).$mount('#app');
