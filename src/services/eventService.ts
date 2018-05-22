import auth from './auth'
import firebase from './firebase'

export default {
  // fetchPosts() {
  //   return Api().get('posts')
  // },

  addEventImage(image) {
    // return Api().post('posts', params)
    firebase.storage
      .ref()
      .child(`images/event-${(auth.user as any).id}-${new Date().getTime()}`)
      .put(image)
      .then(res => {
        console.log(res)
      })
  },

  // updatePost(params) {
  //   return Api().put('posts/' + params.id, params)
  // },

  getEvent(id) {
    // return Api().get('posts/' + params.id)
  },

  // deletePost(id) {
  //   return Api().delete('posts/' + id)
  // }
}
