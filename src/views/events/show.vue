<template>
  <section class="section is-paddingless-touch">
    <div class="container">
      <div class="tile is-ancestor is-marginless">
        <div class="tile is-5 is-vertical is-parent is-paddingless-touch">
          <div class="tile is-child card">
            <div class="card-image">
              <figure id="event-image" class="image">
                <progressive-img :src="event.image" :aspect-ratio="aspectRatio" @onLoad="setAspectRatio">
                  <div
                    slot-scope="{ visible }"
                    v-if="visible"
                    style="height: 100%;"
                    :style="(event.theme) ? 'background: ' + event.theme + ';' : ''">
                  </div>
                </progressive-img>
              </figure>
            </div>
            <div class="card-content">

              <content-placeholders v-if="!snapshot" rounded>
                <content-placeholders-heading :img="true" />
                <content-placeholders-text :lines="3" />
              </content-placeholders>

              <div v-else class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <progressive-img
                      :src="event.users.created.photoUrl"
                      :aspect-ratio="1"
                      alt="user image"
                      style="border-radius: 50%; background: #eee;"/>
                  </figure>
                </div>
                <div class="media-content is-clipped">
                    <p class="title is-4">
                      <router-link :to="{ name: 'user', params: { id: event.users.created.id } }">{{ event.users.created.name}}</router-link>
                    </p>
                    <p class="subtitle is-6">
                      <span v-html="eventDistance"/>
                      <span v-html="eventDates"/>
                    </p>
                </div>
                <div class="media-right">
                  <font-awesome-icon :icon="event.icon"/>
                </div>
              </div>

              <div v-if="snapshot" class="content">
                <p v-html="event.description"></p>
              </div>

              <div v-if="snapshot" class="content">
                <div class="columns is-mobile">
                  <div class="column is-narrow">
                    <span class="button is-outlined is-success">Interested: {{ numLiked }}</span>
                  </div>
                  <div class="column has-text-centered" style="padding-left: 0; padding-right: 0;">
                    &nbsp;
                  </div>
                  <div class="column is-narrow">
                    <span @click="toggle = !toggle" class="button is-outlined is-danger">Not Interested: {{ numDisliked }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tile is-parent is-paddingless-touch">
          <div class="tile is-child card">
            <event-map v-if="event.location.lat" :event="event"/>
            <div v-else>else</div>
          </div>
        </div>
      </div>
      <div class="tile is-ancestor is-marginless">
        <div class="tile is-parent is-paddingless-touch">
          <div class="tile is-child has-text-centered" style="padding: 1em;">
            <font-awesome-icon v-if="eventUsersLikedLoaded" icon="spinner" spin size="2x" class="has-text-grey"/>
            <user-tag-list v-else :users="event.users.liked" :snapshot="snapshot.users"/>
          </div>
        </div>
      </div>
    </div>
    <scroll-to-top/>
  </section>
</template>

<script lang="ts">
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import axios from 'axios'
import Color from 'color'
import firebase from 'firebase'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import EventMap from '@/components/maps/EventMap'
import moment from 'moment'
import ScrollToTop from '../../components/layout/fab/ScrollToTop'
import UserTagList from '@/components/users/TagList'

@Component({
  name: 'ShowEvent',
  components: { EventMap, FontAwesomeIcon, ScrollToTop, UserTagList }
})
export default class ShowEvent extends Vue {
  @Mutation('setError') setError
  @Mutation('setGradient') setGradient

  snapshot: any = null
  imageRef: any = null
  aspectRatio: number = null

  randomUsers: any = null
  toggle: boolean = false

  users: any = {
    created: {
      id: null,
      name: null,
      photoUrl: null
    },
    liked: [],
    reported: []
  }


  get event (): Around.Event {
    return (this.snapshot) ? {
      description: this.snapshot.description || null,
      icon: this.snapshot.icon || null,
      image: this.imageRef || null,
      location: this.snapshot.location || { lat: null, lng: null },
      locationName: this.snapshot.locationName || null,
      theme: this.snapshot.theme || null,
      timestamps: this.snapshot.timestamps || { created: null, start: null, end: null },
      users: this.users || { created: null, liked: {}, reported: {} }
    } : {
      description: null,
      icon: null,
      image: null,
      location: { lat: null, lng: null },
      locationName: null,
      theme: null,
      timestamps: { created: null, start: null, end: null },
      users: { created: null, liked: {}, reported: {} }
    }
  }

  setAspectRatio () {
    let el = document.getElementById('event-image') as HTMLElement
    let img = null

    if (el) {
      img = el.getElementsByClassName('progressive-image-main')[0] as HTMLImageElement
    }

    return (el)
      ? img.height / img.width
      : 2 / 3
  }

  get eventDates () {
    if (!this.event.timestamps) return null

    let now = new Date().getTime()
    let expired = (this.event.timestamps.end <= now)

    let diffInMilliseconds = this.event.timestamps.end - this.event.timestamps.start

    let starts = (expired)
      ? moment(this.event.timestamps.start).format('MMMM Do YYYY, ha')
      : moment(this.event.timestamps.start).format('ddd, ha')

    let and = ' - '
    
    let ends = (diffInMilliseconds >= 82800000) // 23 hours
      ? moment(this.event.timestamps.end).format('ddd, ha')
      : moment(this.event.timestamps.end).format('ha')

    return starts + and + ends
  }

  get eventDistance () {
    if (!this.event.location.lat || !this.location.lat) return '...'

    // distance in m
    let dist = Math.floor(this.getGeoDistance(this.location, this.event.location))

    switch (true) {
      // case (dist >= 10000):
      //   return '> 10km'
      case (dist >= 1000):
        // distance in km to 1.d.p
        return (Math.round(dist / 100) / 10) + 'km'
      case (dist >= 10):
        // distance in m to nearest 10m
        return (Math.round(dist / 10) * 10) + 'm'
      default:
        return 'Right here!'
    }
  }

  get location () {
    return {
      lat: this.$store.state.geolocation.lat,
      lng: this.$store.state.geolocation.lng
    }
  }

  getGeoDistance (start: google.maps.LatLngLiteral, end: google.maps.LatLngLiteral) {
    const deg2rad = deg => deg * (Math.PI / 180);
    const R = 6371;
    const dLat = deg2rad(end.lat - start.lat);
    const dLng = deg2rad(end.lng - start.lng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(start.lat)) * Math.cos(deg2rad(end.lat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000;
  }

  get numLiked (): number {
    return (this.snapshot)
      ? this.getActiveUsersinList(this.snapshot.users.liked)
      : null
  }

  get numDisliked (): number {
    return (this.snapshot)
      ? this.getActiveUsersinList(this.snapshot.users.reported)
      : null
  }

  mounted () {
    this.setAspectRatio()
    // fetch the event snapshot from firebase
    firebase.database().ref('/events/' + this.$route.params.id).once('value')
      .then(snapshot => {
        this.snapshot = snapshot.val()

        this.getEventImage()
        this.getEventUsers()
        this.getEventColors()
      })
  }

  beforeDestroy() {
    this.setGradient(null)
  }

  getEventColors () {
    let base = this.event.theme
    let saturate = 0
    let lighten = 0
    let hueShift = 130
    let angle = -90
    
    let from = Color(base)
      .rotate(hueShift)
      .saturate(saturate)
      .lighten(lighten)
      .hex()

    let to = Color(base)
      .rotate(-1 * hueShift)
      .desaturate(saturate)
      .darken(lighten)
      .hex()

    let gradient = this.linearGradient(angle, from, to)
    this.setGradient(gradient)
  }

  linearGradient (deg, from, to) {
    return 'linear-gradient(' + deg + 'deg, ' + from + ', ' + to + ')'
  }

  getEventImage () {
    // create a reference to the file we want to download
    const imageRef = firebase.storage().ref(this.snapshot.image)

    // Get the download URL
    imageRef.getDownloadURL().then(url => {
      // set the url to the imageRef data ref
      this.imageRef = url
    }).catch(error => {
      // add the error to the vuex state
      this.setError(error)
    })
  }

  getEventUsers () {
    // create a reference to the file we want to download
    firebase.database().ref('users/' + this.snapshot.users.created).once('value')
      .then(user => {
        this.users.created = user.val()
      })
      .catch(error => {
        // add the error to the vuex state
        this.setError(error)
      })

    for (let uid in this.snapshot.users.liked) {
      firebase.database().ref('users/' + uid).once('value')
        .then(user => {
          this.users.liked.push(user.val())
        })
        .catch(error => {
          // add the error to the vuex state
          this.setError(error)
        })
    }

    for (let uid in this.snapshot.users.reported) {
      firebase.database().ref('users/' + uid).once('value')
        .then(user => {
          this.users.reported.push(user.val())
        })
        .catch(error => {
          // add the error to the vuex state
          this.setError(error)
        })
    }
  }

  get eventUsersLikedLoaded () {
    return (
      !this.snapshot ||
      !this.event.users ||
      !this.event.users.liked ||
      !this.event.users.liked[0] ||
      !this.event.users.liked[0].name
    )
  }

  getActiveUsersinList (obj) {
    let num = 0

    for (var key in obj) {
      if (obj[key])
        num++
    }

    return num
  }
}
</script>
