<template>
  <div id="around-app">
    <app-toolbar/>

    <transition :name="transitionName" mode="out-in">
      <router-view></router-view>
    </transition>

    <sign-in/>
  </div>
</template>

<script lang="ts">
// import firebase from 'firebase'
import axios from 'axios'
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

import AppToolbar from './components/layout/AppToolbar.vue'
import SignIn from './components/auth/SignIn.vue'

@Component({
  name: 'App',
  components: {
    AppToolbar,
    SignIn
  }
})
export default class App extends Vue {
  // initial data
  transitionName: string = 'slide-left'

  // computed
  userIsAuthenticated () {
    return (this.$store.getters.user !== null && this.$store.getters.user !== undefined)
  }

  mounted () {
    this.redirectHandler()
  }

  redirectHandler () {
    

    if (this.userIsAuthenticated()) {
      this.$router.push(this.$route.query.redirect)
    }
  }

  @Watch('$route')
  onRouteChanged(to: any, from: any) {
    if (to.path === '/' || from.path === '/') {
      this.transitionName = to.path === '/' ? 'slide-right' : 'slide-left'
    } else {
      let toDepth = to.path.split('/').length
      let fromDepth = from.path.split('/').length

      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

<style lang="scss"></style>
