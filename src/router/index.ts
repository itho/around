import Vue from 'vue'
import Router from 'vue-router'
import Guard from '../services/middleware'

import HomeComponent from '@/views/home/index.vue'
import DashboardComponent from '@/views/dashboard/index.vue'
import EventsComponent from '@/views/events/index.vue'
import NewEventComponent from '@/views/events/new.vue'
import ShowEventComponent from '@/views/events/show.vue'
import TermsComponent from '@/views/legal/terms.vue'
import PrivacyComponent from '@/views/legal/privacy.vue'
import CookiesComponent from '@/views/legal/cookies.vue'
import EnableLocationComponent from '@/components/errors/LocationBlocked.vue'
import NotFoundComponent from '@/components/errors/NotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeComponent
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardComponent,
      beforeEnter: (to, from, next) => {
        Guard.authCheck(to, from, next)
        // Guard.locationEnabled(to, from, next)
      }
    },
    {
      path: '/events',
      name: 'events',
      component: EventsComponent,
      beforeEnter: (to, from, next) => {
        Guard.authCheck(to, from, next)
        // Guard.locationEnabled(to, from, next)
      },
      children: [
        {
          path: 'new',
          name: 'new-event',
          component: NewEventComponent,
          beforeEnter: (to, from, next) => {
            Guard.authCheck(to, from, next)
            // Guard.locationEnabled(to, from, next)
          }
        },
        {
          path: ':id',
          name: 'show-event',
          component: ShowEventComponent,
          beforeEnter: (to, from, next) => {
            Guard.authCheck(to, from, next)
            // Guard.locationEnabled(to, from, next)
          }
        }
      ]
    },
    {
      path: '/terms',
      name: 'terms',
      component: TermsComponent
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyComponent
    },
    {
      path: '/cookies',
      name: 'cookies',
      component: CookiesComponent
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
