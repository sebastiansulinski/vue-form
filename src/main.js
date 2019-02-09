import Vue from 'vue'
import EventBus from '@ssdcode/vue-event-bus';
import { ErrorHandler } from '@ssdcode/cms-partials';
import { FocusDirective } from '@ssdcode/vue-focus-directive';

window.EventBus = window.EventBus || new EventBus;
window.ErrorHandler = window.ErrorHandler || ErrorHandler;

import App from './App.vue'

Vue.config.productionTip = false;

new Vue({
  directives: {
    FocusDirective
  },
  render: h => h(App),
}).$mount('#app');
