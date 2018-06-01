<template>
  <div id="around-app" v-touch:swipe.left="swipeLeftHandler" v-touch:swipe.right="swipeRightHandler">
    <head v-html="styles"/>
    <sign-in/>

    <md-app md-waterfall md-mode="fixed" v-cloak>
      <md-app-toolbar class="md-primary app-gradient">
        <md-button class="md-icon-button is-hidden-desktop" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <h3 class="md-title" style="flex: 1">
          <router-link id="nav-home-link" :to="{ name: 'home' }">around</router-link>
        </h3>
        <toolbar-user-links v-if="userIsAuthenticated" class="is-hidden-touch"/>
        <toolbar-guest-links v-else class="is-hidden-touch"/>
      </md-app-toolbar>
    
      <md-app-drawer :md-active.sync="menuVisible">
        <nav-user-card :user="user"/>
        <nav-user-links v-if="userIsAuthenticated" @close-menu="menuVisible = false"/>
        <nav-guest-links v-else @close-menu="menuVisible = false"/>
      </md-app-drawer>

      <md-app-content class="is-paddingless is-borderless">
        <transition :name="transitionName" mode="out-in">
          <router-view></router-view>
        </transition>
        <app-snackbar/>
      </md-app-content>
    </md-app>
  </div>
</template>

<script lang="ts">
// import firebase from 'firebase'
import { Action, Getter } from 'vuex-class'
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import AppSnackbar from '@/components/layout/Snackbar.vue'
import AppToolbar from './components/layout/AppToolbar.vue'
import axios from 'axios'
import NavGuestLinks from '@/components/layout/navigation/GuestLinks.vue'
import NavUserCard from '@/components/layout/navigation/UserCard.vue'
import NavUserLinks from '@/components/layout/navigation/UserLinks.vue'
import SignIn from './components/auth/SignIn.vue'
import ToolbarGuestLinks from '@/components/layout/toolbar/GuestLinks.vue'
import ToolbarUserLinks from '@/components/layout/toolbar/UserLinks.vue'

@Component({
  name: 'App',
  components: {
    AppSnackbar,
    AppToolbar,
    NavUserCard,
    NavUserLinks,
    NavGuestLinks,
    SignIn,
    ToolbarGuestLinks,
    ToolbarUserLinks
  }
})
export default class App extends Vue {
  @Action('toggleSignInModal') toggleSignInModal
  @Getter('error') error
  @Getter('gradient') gradient
  @Getter('loading') isLoading
  @Getter('user') user

  // initial data
  menuVisible: boolean = null
  transitionName: string = 'slide-left'

  // hacky or genius?
  get styles () {
    return  (this.gradient)
      ? '<style>\
          .md-app-content:before {\
            background: ' + this.gradient + ';\
            opacity: 1;\
          }\
        </style>'
      : null
  }

  // computed
  get userIsAuthenticated (): boolean {
    return this.$store.getters.user !== null && this.$store.getters.user !== undefined
  }

  mounted () {
    this.redirectHandler()

    document.getElementById('splash').classList.add('hidden')
  }

  redirectHandler () {
    if (this.userIsAuthenticated) {
      this.$router.push(this.$route.query.redirect)
    }
  }

  swipeLeftHandler () {
    if (this.$route.name !== 'explore' && this.$route.name !== 'show-event') this.menuVisible = false
  }

  swipeRightHandler () {
    if (this.$route.name !== 'explore' && this.$route.name !== 'show-event') this.menuVisible = true
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

<style lang="scss">
  .md-app-content:before {
    height: 100vh;
    width: 100vw;
    content: '';
    position: fixed;
    left: 0px;
    top: 0px;
    opacity: 0;
    transition: opacity 0.4s;
  }

  #nav-home-link {
    color: white;
    text-decoration: none;
  }
</style>
