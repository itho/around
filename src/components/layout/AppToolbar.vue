<template>
  <nav class="navbar is-fixed-top is-transparent brand--gradient" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item has-text-light" :to="{ name: 'home' }">
          <!-- <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28"> -->
          <b>around</b>
        </router-link>
        <div id="navbar-burger-menu" class="navbar-burger burger has-text-light" data-target="navMenu" aria-label="menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    
      <div id="navMenu" class="navbar-menu">
        <div class="navbar-end">
          <router-link
            v-if="userIsAuthenticated"
            class="navbar-item has-text-light"
            @click.native="closeNav()"
            :to="{ name: 'new-event' }">
            create
          </router-link>
          <router-link
            v-if="userIsAuthenticated"
            class="navbar-item has-text-light"
            @click.native="closeNav()"
            :to="{ name: 'user', params: { id: user.id }}">
            my events
          </router-link>
          <router-link
            v-if="userIsAuthenticated"
            class="navbar-item has-text-light"
            @click.native="closeNav()"
            :to="{ name: 'explore' }">
            explore
          </router-link>
          <a v-if="!userIsAuthenticated" class="navbar-item has-text-light" @click="signIn()">
            <b>sign in / create an account</b>
          </a>
          <a v-if="userIsAuthenticated" class="navbar-item is-hidden-desktop has-text-light">
            <b>{{ user.name }}</b>
            <ul class="menu-list">
              <li>
                <ul>
                  <li><a class="has-text-light">Settings</a></li>
                  <li><a class="has-text-light" @click="onSignout()">Sign Out</a></li>
                </ul>
              </li>
            </ul>
          </a>
          <b-dropdown v-if="userIsAuthenticated" hoverable position="is-bottom-left" class="navbar-item is-hidden-touch">
            <a class="has-text-light" slot="trigger">
              <b>{{ user.name }}</b>
            </a>

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
          // $target.classList.toggle('brand--gradient')
        }
      })
    })
  }
})

@Component({
  name: 'AppToolbar'
})
export default class AppToolbar extends Vue {
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

  closeNav () {
    document.getElementById('navbar-burger-menu').click()
  }

  signIn () {
    this.toggleSignInModal()
    this.closeNav()
  }

  // method
  onSignout () {
    this.closeNav()
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

<style lang="scss" scoped>
  // nav burger active
  @media screen and (max-width: 1023px){
    #navMenu {
      display: block;
      max-height: 0px;
      transition: max-height 0.3s ease-out, padding 0.1s linear;
      box-shadow: none;
      padding: 0;
      /* https://uigradients.com/#CanYouFeelTheLoveTonight */
      background: #4568dc;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to right, #b06ab3, #4568dc);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to right, #b06ab3, #4568dc); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    #navMenu.is-active {
      max-height: 500px;
      padding: 0.5rem 0;
      box-shadow: 0 8px 16px rgba(10, 10, 10, 0.1);
    }
  }

  a.navbar-item:hover,
  a.navbar-item.is-active,
  a.navbar-link:hover,
  a.navbar-link.is-active,
  a.navbar-item.router-link-exact-active.router-link-active {
    background-color: rgba(255, 255, 255, 0.1)
  }

  .dropdown.is-active .dropdown-menu,
  .dropdown.is-hoverable:hover .dropdown-menu {
    width: 100% !important;
  }

  .menu-list a:hover {
    background: inherit;
  }
</style>
