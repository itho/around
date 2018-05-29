// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Buefy from "buefy"
import fontawesome from '@fortawesome/fontawesome'
import faSolid from '@fortawesome/fontawesome-free-solid'
import faRegular from '@fortawesome/fontawesome-free-regular'
import faBrands from '@fortawesome/fontawesome-free-brands'
import * as firebase from 'firebase'
import * as VueGoogleMaps from 'vue2-google-maps'
import Ads from 'vue-google-adsense'
import VueScript2 from 'vue-script2'
import VuexGeolocation from 'vuex-geolocation'

import VueProgressiveImage from 'vue-progressive-image'
import VueContentPlaceholders from 'vue-content-placeholders'

Vue.use(VueProgressiveImage, {
  // delay: 5000 // 5 seconds before the image is displayed
})
Vue.use(VueContentPlaceholders)

Vue.use(VueScript2)
Vue.use(Ads.Adsense)
// Vue.use(Ads.InArticleAdsense)
// Vue.use(Ads.InFeedAdsense)

import App from './App.vue'
import router from './router'
import store from './store'

// Require the main scss manifest file
import './assets/scss/index.scss'

Vue.use(Buefy, {
  // Override material design icon default
  defaultIconPack: 'fas',
})

// Import fontawesome libs
fontawesome.library.add(
  faSolid,
  faRegular,
  faBrands
)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBuCVQB-cv-ShH8phP4hPVQWuNsG2rJoX0',
    // libraries: 'places' // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  }

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
});

const vuexGeolocation = VuexGeolocation.sync(store)
Vue.use(vuexGeolocation)

Vue.config.productionTip = false

/* eslint-disable no-new */
export default new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App },
  mounted () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCrljfD23oTNrhSeEl0v1q5gNuurKWB5LU',
      authDomain: 'around-me-app.firebaseapp.com',
      databaseURL: 'https://around-me-app.firebaseio.com',
      projectId: 'around-me-app',
      storageBucket: 'around-me-app.appspot.com',
      messagingSenderId: '1043835200298'
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let redirect = this.$route.query.redirect || false
        this.$store.dispatch('autoSignIn', { user, redirect })
      }
    })
  }
});
