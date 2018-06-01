<template>
  <section class="has-background-white">
   <explore-map v-if="events.length || initialFetch" :events="events"/>
    <md-empty-state v-else style="height: 100%;">
      <md-button class="md-icon-button md-raised">
        <md-progress-spinner style="margin-top: 2px;" :md-diameter="20" :md-stroke="2" md-mode="indeterminate"></md-progress-spinner>
      </md-button>
    </md-empty-state>

    <!-- <Adsense
      data-ad-client="ca-pub-4693179382080726"
      data-ad-slot="1487770485">
    </Adsense> -->

    <md-button v-if="events.length || initialFetch" :to="{ name: 'create' }" class="md-fab md-primary md-fixed md-fab-bottom-right">
      <md-icon>add</md-icon>
    </md-button>
  </section>
</template>

<script lang="ts">
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import ExploreMap from '@/components/maps/ExploreMap.vue'
import FloatingActionButton from '@/components/layout/FloatingActionButton.vue'
import firebase from 'firebase'
import geofire from 'geofire'

@Component({
  name: 'Explore',
  components: {
    ExploreMap,
    FloatingActionButton
  }
})
export default class Explore extends Vue {
  // initial data
  initialFetch: boolean = false
  events = []

  mounted () {
    this.fetchEvents()
  }

  get location () {
    return {
      lat: this.$store.state.geolocation.lat,
      lng: this.$store.state.geolocation.lng
    }
  }

  fetchEvents () {
    if (!this.location.lat || !this.location.lng) return
    // Generate a random Firebase location
    let geoFireRef = firebase.database().ref('/event-locations')
    // Create a new GeoFire instance at the random Firebase location
    let geoFire = new geofire(geoFireRef)
    
    let geoQuery = geoFire.query({
      center: [this.location.lat, this.location.lng],
      radius: 10000
    })

    let vm = this

    // Attach event callbacks to the query
    let onKeyEnteredRegistration = geoQuery.on("key_entered", function(key, location) {
      firebase.database().ref('/events/' + key).once('value')
        .then(snapshot => {
          vm.events.push({ key, val: snapshot.val() })
        })
    });

    let onKeyExitedRegistration = geoQuery.on("key_exited", function(key, location) {
      // vm.events[key] = null
    });

    this.initialFetch = true
  }

  @Watch('location')
  onLocationChange () {
    this.fetchEvents()
  }
}
</script>

<style lang="scss" scoped></style>
