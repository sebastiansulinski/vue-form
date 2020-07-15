import Vue from 'vue';
import Vuex from 'vuex';

import * as form from './modules/form';
import * as errors from './modules/errors';
import { notification } from '@ssdcode/vue-notification';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { form, errors, notification },
});
