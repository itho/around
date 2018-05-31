const defaultState = {
  loading: false,
  error: null,
  success: null,
  signInModal: false,
  gradient: null,
  snackbar: {
    active: false,
    duration: 4000,
    isInfinity: false,
    message: '',
    position: 'center',
    type: ''
  }
}

const actions = {
  clearError: ({ commit }) => {
    commit('clearError')
  },
  openSnackbar: ({ commit }, payload) => {
    commit('openSnackbar', payload)
  },
  closeSnackbar: ({ commit }) => {
    commit('closeSnackbar')
  },
  setError: ({ commit }, payload) => {
    commit('setError', payload)
  },
  setSuccess: ({ commit }, payload) => {
    commit('setSuccess', payload)
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
  openSnackbar: (state: any, payload: any) => {
    state.snackbar.message = payload.message
    state.snackbar.type = payload.type
    state.snackbar.active = true
  },
  closeSnackbar: (state: any) => {
    state.snackbar.active = false
  },
  setLoading: (state: any, payload: any) => {
    state.loading = payload
  },
  setError: (state: any, payload: any) => {
    state.error = payload
  },
  setSuccess: (state: any, payload: any) => {
    state.success = payload
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
  success: (state: any) => state.success,
  gradient: (state: any) => state.gradient,
  loading: (state: any) => state.loading,
  signInModal: (state: any) => state.signInModal,
  snackbar: (state: any) => state.snackbar
}

export default {
  state: defaultState,
  getters,
  actions,
  mutations
};
