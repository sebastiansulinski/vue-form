import Vue from 'vue'
import '@sscode/vue-focus-directive';
import EventBus from '@sscode/vue-event-bus';
import { ErrorHandler } from '@sscode/cms-partials';

window.EventBus = window.EventBus || new EventBus;
window.ErrorHandler = window.ErrorHandler || ErrorHandler;

import App from './App.vue'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
