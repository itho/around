const defaultState = {
  loading: false,
  error: null,
  signInModal: false,
  gradient: null
};

const actions = {
  clearError: ({ commit }) => {
    commit('clearError')
  },
  setLoading: ({ commit }, payload) => {
    commit('setLoading', payload)
  },
  setGradient: ({ commit }, payload) => {
    commit('setGradient', payload)
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
  setGradient: (state: any, payload: any) => {
    state.gradient = payload
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
  error: (state: any) => state.error,
  gradient: (state: any) => state.gradient,
  loading: (state: any) => state.loading,
  signInModal: (state: any) => state.signInModal,
}

export default {
  state: defaultState,
  getters,
  actions,
  mutations
};
