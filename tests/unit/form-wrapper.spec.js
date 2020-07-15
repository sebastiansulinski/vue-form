import Vue from 'vue';

import CompositionApi from '@vue/composition-api';
Vue.use(CompositionApi);

import store from '../../src/store';
import { mount } from '@vue/test-utils';
import FormWrapper from '../../src/index';

describe('FormWrapper test', () => {
  test('Returns correct fields when props.fields is passed', () => {
    const props = {
      group: 'enquiry-form',
      fields: {
        name: 'Jon Joe',
        email: 'jon@doe.com',
      },
      action: '/',
    };
    const component = mount(FormWrapper, {
      store,
      propsData: props,
    });

    expect(component.props()).toEqual(props);
  });
});
