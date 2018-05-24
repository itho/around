import auth from './auth'
import location from './location'

export default {
  // Only allow non-authenticated users to these routes.
  guestOnly (to, from, next) {
    next(!auth.check())
  },

  // Check if the user is authenticated.
  // If not, return them to the main page with a redirect query
  authCheck (to, from, next) {
    next(auth.check() ? true : { path: '/', query: { redirect: to.path } })
  },

  // Check if the user has allowed location.
  // If not, return them to the enable-location page
  locationEnabled (to, from, next) {
    next(location.checkEnabled() ? true : { name: 'enable-location' })
  }
}
