import Vue from 'vue'
import store from '../store'

interface User {
  email: string
  id: string
  name: string
  photoUrl: string
}

export default {
  user (): User {
    let user: User = store.getters.user
    return user
  },

  check (): boolean {
    return (store.getters.user !== null && store.getters.user !== undefined)
  }
}
