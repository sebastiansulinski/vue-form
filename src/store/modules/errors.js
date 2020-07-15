export const namespaced = true;

const extract = error => {
  if ((error.response || {}).data) {
    return {
      message: error.response.data.message || 'Request failed',
      errors: error.response.data.errors || {},
    };
  }
  return {
    message: error.message || 'Request failed',
    errors: error.errors || {},
  };
};

export const state = {
  errors: {},
};

export const mutations = {
  ADD(state, { group, payload }) {
    state.errors = { ...state.errors, ...{ [group]: payload } };
  },
  CLEAR(state, { group }) {
    state.errors = { ...state.errors, ...{ [group]: {} } };
  },
};

export const actions = {
  add({ commit }, { group, error }) {
    commit('ADD', {
      group,
      payload: extract(error),
    });
  },
  clear({ commit }, group) {
    commit('CLEAR', group);
  },
};
