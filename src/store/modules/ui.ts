const defaultState = {
  loading: false,
  error: null,
  signInModal: false
};

const actions = {
  clearError: ({ commit }) => {
    commit('clearError')
  },
  setSignInModalHidden: ({ commit }) => {
    commit('setSignInModalHidden')
  },
  setSignInModalVisible: ({ commit }) => {
    commit('setSignInModalVisible')
  },
  toggleSignInModal: ({ commit }) => {
    commit('toggleSignInModal')
  }
}

const mutations = {
  setLoading: (state: any, payload: any) => {
    state.loading = payload
  },
  setError: (state: any, payload: any) => {
    state.error = payload
  },
  clearError: (state: any) => {
    state.error = null
  },
  setSignInModalVisible: (state: any) => {
    state.signInModal = true
  },
  setSignInModalHidden: (state: any) => {
    state.signInModal = false
  },
  toggleSignInModal: (state: any) => {
    state.signInModal = !state.signInModal
  }
}

const getters = {
  loading: (state: any) => state.loading,
  error: (state: any) => state.error,
  signInModal: (state: any) => state.signInModal
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations
};
