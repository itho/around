<template>
  <section class="has-background-white">
    <b-tabs position="is-centered" class="block">
        <b-tab-item label="around-me">
          <explore-map :events="events"/>
        </b-tab-item>
        <b-tab-item label="quick-view">
          456
        </b-tab-item>
        <b-tab-item label="profile">
          789
        </b-tab-item>
    </b-tabs>

    <!-- <Adsense
      data-ad-client="ca-pub-4693179382080726"
      data-ad-slot="1487770485">
    </Adsense> -->

    <Floating-action-button/>
  </section>
</template>

<script lang="ts">
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'

import ExploreMap from '@/components/maps/ExploreMap'
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
  someNum: number = 1
  events = []

  mounted () {
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
      // console.log('entered: ' + key)
      vm.events.push(key)
    });

    let onKeyExitedRegistration = geoQuery.on("key_exited", function(key, location) {
      // console.log('exited: ' + key)
      let index = vm.events.indexOf(key)
      if (index > -1) {
        vm.events.splice(index, 1);
      }
    });
  }

  get location () {
    return {
      lat: this.$store.state.geolocation.lat,
      lng: this.$store.state.geolocation.lng
    }
  }
}
</script>

<style lang="scss" scoped></style>
