import Caller from '@ssdcode/js-caller';

export const namespaced = true;

export const state = {
  response: {},
};

export const mutations = {
  SET_RESPONSE(state, { group, response }) {
    state.response = { ...state.response, ...{ [group]: response } };
  },
};

export const actions = {
  submit({ commit, dispatch }, { group, action, method, fields }) {
    return Caller.request(action, method, fields)
      .then(response => {
        let responseData = response.data;
        commit('SET_RESPONSE', { group, responseData });
        return responseData;
      })
      .catch(error => {
        dispatch('errors/add', { group, error }, { root: true });
        throw error;
      });
  },
};
