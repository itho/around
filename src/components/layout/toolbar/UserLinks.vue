<template>
  <div>
    <md-button :to="{ name: 'create' }">create</md-button>
    <md-button :to="{ name: 'user', params: { id: user.id } }">my events</md-button>
    <md-button :to="{ name: 'explore' }">explore</md-button>
    <md-menu md-size="big" md-direction="bottom-end">
      <md-button class="md-icon-button" md-menu-trigger>
        <md-icon>more_vert</md-icon>
      </md-button>

      <md-menu-content>
        <md-menu-item href="#" disabled>
          <span>Settings</span>
        </md-menu-item>
        <md-menu-item @click="onSignOut()">
          <span>Sign Out</span>
        </md-menu-item>
      </md-menu-content>
    </md-menu>
  </div>
</template>

<script lang="ts">
import { Action, Getter } from 'vuex-class'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: 'UserLinks' })
export default class UserLinks extends Vue {
  @Action('setSuccess') setSuccess
  @Getter('user') user

  onSignOut () {
    this.$emit('close-menu')
    this.$store.dispatch('signout')
    this.$router.push('/')
    this.setSuccess({ message: 'Successfully signed out!' })
  }
}
</script>

<style lang="scss" scoped>
  .md-button {
    text-transform: lowercase !important;
  }
  .md-menu {
    margin-top: 4px;
  }
</style>
