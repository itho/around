<template>
  <div class="column is-half">
    <router-link :to="{ name: 'show-event', params: { id }}">
    <div class="card">
      <div class="card-image">
        <progressive-img
          :src="imageUrl"
          :aspect-ratio="aspectRatio">
          <div
            slot-scope="{ visible }"
            v-if="visible"
            style="height: 100%;"
            :style="'background: ' + event.theme + ';'">
          </div>
        </progressive-img>
      </div>
      <div class="card-content" style="padding: 1rem;">
        <content-placeholders v-if="!snapshot.event.description" rounded>
          <content-placeholders-text :lines="2" />
        </content-placeholders>
        <div v-else class="media">
          <div class="media-content is-clipped">
              <p class="title is-5 no-wrap-elipsis">
                {{ event.description }}
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
      </div>
    </div>
    </router-link>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import axios from 'axios'
import firebase from 'firebase'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import moment from 'moment'

@Component({
  name: 'FixedHeightCard',
  components: { FontAwesomeIcon },
  props: {
    id: String
  }
})
export default class FixedHeightCard extends Vue {
  @Mutation('setError') setError
  
  id: string = this.id

  aspectRatio: number = 9 / 16
  imageUrl: string = null

  snapshot: any = {
    event: {
      description: null,
      icon: null,
      image: null,
      location: null,
      locationName: null,
      theme: '#eeeeee',
      timestamps: { created: null, start: null, end: null },
      users: { created: null, liked: null, reported: null }
    }
  }

  get event () {
    return this.snapshot.event
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

  mounted() {
    // fetch the event snapshot from firebase
    firebase.database().ref('/events/' + this.id).once('value')
      .then(snapshot => {
        this.snapshot.event = snapshot.val()
        this.getEventImage()
      })
      .catch(error => {
        this.setError(error)
      })
  }

  getEventImage () {
    // create a reference to the file we want to download
    const imageRef = firebase.storage().ref(this.snapshot.event.image)

    // Get the download URL
    imageRef.getDownloadURL().then(url => {
      // set the url to the imageRef data ref
      this.imageUrl = url
    }).catch(error => {
      // add the error to the vuex state
      this.setError(error)
    })
  }
}
</script>

