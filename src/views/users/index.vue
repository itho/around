<template>
  <section class="section is-paddingless-touch">
    <div class="container">
      <div class="tile is-ancestor is-marginless">
        <div class="tile is-5 is-vertical is-parent is-paddingless-touch">
          <div class="tile is-child" style="max-height: max-content;">
            <user-card :user="user"/>
          </div>
          <div class="tile is-child is-hidden-touch"></div>
        </div>
        <div class="tile is-7 is-parent is-vertical">
          <div v-if="loading.userEvents" class="has-text-centered" style="margin: 1.5rem;">
            <font-awesome-icon icon="spinner" spin size="2x"/>
          </div>
          <div v-else class="tile is-child">
            <event-list
              title="Upcoming Events"
              :events="upcomingCreatedEvents"/>
            <event-list
              title="Previous Events"
              :events="expiredCreatedEvents"/>
            <event-list
              title="Upcoming Events Interested In"
              :events="upcomingInterestedEvents"/>
            <event-list
              title="Previous Events Interested In"
              :events="expiredInterestedEvents"/>
          </div>
        </div>
      </div>
    </div>
    <scroll-to-top/>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import axios from 'axios'
import EventList from '@/components/events/EventList'
import firebase from 'firebase'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import ScrollToTop from '@/components/layout/fab/ScrollToTop'
import UserCard from '@/components/users/FullHeightCard'

@Component({
  name: 'ShowEvent',
  components: {
    EventList,
    FontAwesomeIcon,
    ScrollToTop,
    UserCard
  }
})
export default class ShowEvent extends Vue {
  @Mutation('setError') setError

  loading: any = {
    user: true,
    userEvents: true
  }

  snapshot: any = {
    user: {
      id: null,
      name: null,
      photoUrl: null
    },
    userEvents: {
      created: null,
      liked: null,
      reported: null
    }
  }

  get user () {
    return this.snapshot.user
  }

  get userEvents () {
    return this.snapshot.userEvents
  }

  get upcomingCreatedEvents () {
    let sortable = []
    // create an array of eligible events
    for (var event in this.userEvents.created) {
      // if the event has not ended yet, display it
      if (this.userEvents.created[event] >= new Date().getTime())
        sortable.push([event, this.userEvents.created[event]])
    }
    // sort by end time (soonest first)
    return sortable.sort(function(a, b) { return a[1] - b[1] })
  }

  get expiredCreatedEvents () {
    let sortable = []
    // create an array of eligible events
    for (var event in this.userEvents.created) {
      // if the event has not ended yet, display it
      if (this.userEvents.created[event] <= new Date().getTime())
        sortable.push([event, this.userEvents.created[event]])
    }
    // sort by end time (soonest first)
    return sortable.sort(function(a, b) { return a[1] - b[1] })
  }

  get upcomingInterestedEvents () {
    let sortable = []
    // create an array of eligible events
    for (var event in this.userEvents.liked) {
      // if the event has not ended yet, display it
      if (this.userEvents.liked[event] >= new Date().getTime())
        sortable.push([event, this.userEvents.liked[event]])
    }
    // sort by end time (soonest first)
    return sortable.sort(function(a, b) { return a[1] - b[1] })
  }

  get expiredInterestedEvents () {
    let sortable = []
    // create an array of eligible events
    for (var event in this.userEvents.liked) {
      // if the event has not ended yet, display it
      if (this.userEvents.liked[event] <= new Date().getTime())
        sortable.push([event, this.userEvents.liked[event]])
    }
    // sort by end time (soonest first)
    return sortable.sort(function(a, b) { return a[1] - b[1] })
  }

  mounted() {
    // fetch the event snapshot from firebase
    firebase.database().ref('/users/' + this.$route.params.id).once('value')
      .then(snapshot => {
        this.snapshot.user = snapshot.val()
        this.loading.user = false
      })
      .catch(error => {
        this.setError(error)
      })

    firebase.database().ref('/user-events/' + this.$route.params.id).once('value')
      .then(snapshot => {
        this.snapshot.userEvents = snapshot.val()
        this.loading.userEvents = false
      })
      .catch(error => {
        this.setError(error)
      })
  }
}
</script>
