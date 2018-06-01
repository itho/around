import Vue from 'vue'
import Router from 'vue-router'
import Guard from '../services/middleware'

// general pages
import HomeView from '@/views/home/index.vue'
import ExploreView from '@/views/explore/index.vue'
// event pages
import NewEventView from '@/views/events/new.vue'
import EventView from '@/views/events/show.vue'
// user pages
import UserView from '@/views/users/index.vue'
// legal pages
import TermsView from '@/views/legal/terms.vue'
import PrivacyView from '@/views/legal/privacy.vue'
import CookiesView from '@/views/legal/cookies.vue'
// error pages
import EnableLocationComponent from '@/components/errors/LocationBlocked.vue'
import NotFoundComponent from '@/components/errors/NotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/explore',
      name: 'explore',
      component: ExploreView,
      beforeEnter: (to, from, next) => {
        Guard.authCheck(to, from, next)
        // Guard.locationEnabled(to, from, next)
      }
    },
    {
      path: '/events/new',
      name: 'create',
      component: NewEventView,
      beforeEnter: (to, from, next) => {
        Guard.authCheck(to, from, next)
        // Guard.locationEnabled(to, from, next)
      }
    },
    {
      path: '/events/:id',
      name: 'show-event',
      component: EventView,
      beforeEnter: (to, from, next) => {
        Guard.authCheck(to, from, next)
        // Guard.locationEnabled(to, from, next)
      }
    },
    {
      path: '/users/:id',
      name: 'user',
      component: UserView,
      beforeEnter: (to, from, next) => {
        Guard.authCheck(to, from, next)
        // Guard.locationEnabled(to, from, next)
      }
    },
    {
      path: '/users/:id/created',
      name: 'user-created',
      component: PrivacyView,
      beforeEnter: (to, from, next) => {
        Guard.authCheck(to, from, next)
        // Guard.locationEnabled(to, from, next)
      }
    },
    {
      path: '/terms',
      name: 'terms',
      component: TermsView
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyView
    },
    {
      path: '/cookies',
      name: 'cookies',
      component: CookiesView
    },
    {
      path: '/enable-location',
      name: 'enable-location',
      component: EnableLocationComponent
    },
    {
      path: '*',
      component: NotFoundComponent
    }
  ]
})
