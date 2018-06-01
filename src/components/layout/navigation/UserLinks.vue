<template>
  <md-list>
    <!-- <md-list-item md-expand :md-expanded.sync="expandProfile">
      <md-icon>account_circle</md-icon>
      <span class="md-list-item-text">Profile</span>

      <md-list slot="md-expand">
        <md-list-item class="md-inset" :class="activeRoute('user')" @click="onProfile()">My Events</md-list-item>
        <md-list-item class="md-inset" href="#">Followed</md-list-item>
        <md-list-item class="md-inset" href="#">Followers</md-list-item>
      </md-list>
    </md-list-item> -->

    <md-list-item @click="onProfile()">
      <md-icon :class="activeRoute('user')">account_circle</md-icon>
      <span class="md-list-item-text" :class="activeRoute('user')">Profile</span>
    </md-list-item>

    <md-list-item @click="onExplore()">
      <md-icon :class="activeRoute('explore')">explore</md-icon>
      <span class="md-list-item-text" :class="activeRoute('explore')">Explore</span>
    </md-list-item>

    <md-list-item @click="onCreate()">
      <md-icon :class="activeRoute('create')">add_location</md-icon>
      <span class="md-list-item-text" :class="activeRoute('create')">Create</span>
    </md-list-item>

    <md-list-item href="#">
      <md-icon>settings</md-icon>
      <span class="md-list-item-text">Settings</span>
    </md-list-item>

    <md-list-item @click="onAbout()">
      <md-icon :class="activeRoute('home')">help</md-icon>
      <span class="md-list-item-text" :class="activeRoute('home')">About</span>
    </md-list-item>

    <md-list-item @click="onSignOut()">
      <md-icon>exit_to_app</md-icon>
      <span class="md-list-item-text">Sign out</span>
    </md-list-item>
  </md-list>
</template>

<script lang="ts">
import { Action, Getter } from 'vuex-class'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: 'UserLinks' })
export default class UserLinks extends Vue {
  @Action('setSuccess') setSuccess
  @Getter('user') user

  expandProfile: boolean = false

  activeRoute (name) {
    return (this.$route.name === name)
      ? 'is-active'
      : ''
  }

  onProfile () {
    this.$emit('close-menu')
    this.$router.push({ name: 'user', params: { id: this.user.id } })
  }

  onExplore () {
    this.$emit('close-menu')
    this.$router.push({ name: 'explore' })
  }

  onCreate () {
    this.$emit('close-menu')
    this.$router.push({ name: 'create' })
  }

  onAbout () {
    this.$emit('close-menu')
    this.$router.push({ name: 'home' })
  }

  onSignOut () {
    this.$emit('close-menu')
    this.$store.dispatch('signout')
    this.$router.push('/')
    this.setSuccess({ message: 'Successfully signed out!' })
  }
}
</script>

<style lang="scss" scoped>
  .is-active {
    color: #448aff !important;
    color: var(--md-theme-demo-light-primary-on-background,#448aff) !important;
  }
</style>

