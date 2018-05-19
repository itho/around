import user from './auth'

export default {
  // Only allow non-authenticated users to these routes.
  guestOnly (to, from, next) {
    next(!user.check())
  },

  // Check if the user is authenticated.
  // If not, return them to the main page with a redirect query
  authCheck (to, from, next) {
    next(user.check() ? true : {
      path: '/',
      query: {
        redirect: to.path
      }
    })
  }
}
