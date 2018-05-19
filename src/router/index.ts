import Vue from 'vue'
import Router from 'vue-router'
import Guard from '../services/middleware'

import HomeComponent from '@/views/home/index.vue'
import DashboardComponent from '@/views/dashboard/index.vue'
import EventsComponent from '@/views/events/index.vue'
import NewEventComponent from '@/views/events/new.vue'
import ShowEventComponent from '@/views/events/show.vue'
import NotFoundComponent from '@/components/NotFound.vue'

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
      beforeEnter: Guard.authCheck
    },
    {
      path: '/events',
      name: 'events',
      component: EventsComponent,
      beforeEnter: Guard.authCheck,
      children: [
        {
          path: 'new',
          name: 'new-event',
          component: NewEventComponent,
          beforeEnter: Guard.authCheck
        },
        {
          path: ':id',
          name: 'show-event',
          component: ShowEventComponent,
          beforeEnter: Guard.authCheck
        }
      ]
    },
    {
      path: '*',
      component: NotFoundComponent
    }
  ]
})
