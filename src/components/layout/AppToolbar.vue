<template>
  <nav class="navbar is-transparent is-fixed-top brand--gradient" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item has-text-light" :to="{ name: 'home' }">
          <!-- <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28"> -->
          <b>around</b>
        </router-link>
        <div class="navbar-burger burger has-text-light" data-target="navMenu" aria-label="menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    
      <div id="navMenu" class="navbar-menu">
        <div class="navbar-end">
          <router-link v-if="userIsAuthenticated" class="navbar-item has-text-light" :to="{ name: 'events' }">
            events
          </router-link>
          <router-link v-if="userIsAuthenticated" class="navbar-item has-text-light" :to="{ name: 'new-event' }">
            new
          </router-link>
          <router-link v-if="userIsAuthenticated" class="navbar-item has-text-light" :to="{ name: 'show-event', params: { id: '123' }}">
            show
          </router-link>
          <router-link v-if="userIsAuthenticated" class="navbar-item has-text-light" :to="{ name: 'dashboard' }">
            dashboard
          </router-link>
          <a v-if="!userIsAuthenticated" class="navbar-item has-text-light" @click="toggleSignInModal()">
            <b>sign in / create an account</b>
          </a>
          <b-dropdown v-else hoverable position="is-bottom-left" class="navbar-item">
            <a class="has-text-light" slot="trigger">
              <b>{{ user.name }}</b>
            </a>

            <b-dropdown-item>Profile</b-dropdown-item>
            <b-dropdown-item>Settings</b-dropdown-item>
            <b-dropdown-item @click="onSignout()">Sign out</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import { Action, Getter, Mutation } from 'vuex-class'

document.addEventListener('DOMContentLoaded', () => {
  // Get all "navbar-burger" elements
  let $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(($el: any) => {
      $el.addEventListener('click', () => {
        // Get the target from the "data-target" attribute
        let target = $el.dataset.target
        let $target = document.getElementById(target)

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active')
        if ($target) {
          $target.classList.toggle('is-active')
          $target.classList.toggle('brand--gradient')
        }
      })
    })
  }
})

@Component({
  name: 'AppToolbar'
})
export default class AppToolbar extends Vue {
  // initial data
  msg: number = 123

  // use prop values for initial data
  helloMsg: string = 'Hello, ' // + this.propMessage

  @Action('toggleSignInModal') toggleSignInModal

  // lifecycle hook
  mounted () {
    // this.greet()
  }

  get user () {
    return this.$store.getters.user
  }

  get userIsAuthenticated (): boolean {
    return this.$store.getters.user !== null && this.$store.getters.user !== undefined
  }

  // method
  onSignout () {
    this.$store.dispatch('signout')
    this.$router.push('/')
    this.$toast.open({
      duration: 3500,
      message: `Successfully signed out!`,
      position: 'is-top',
      type: 'is-info'
    })
  }
}
</script>

<style lang="scss">
  .dropdown.is-active .dropdown-menu,
  .dropdown.is-hoverable:hover .dropdown-menu {
    width: 100% !important;
  }
</style>
