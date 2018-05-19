import Vue from 'vue'
import store from '../store'

export default {
  user () {
    return store.getters.user
  },

  check () {
    return (store.getters.user !== null && store.getters.user !== undefined)
  }
}
