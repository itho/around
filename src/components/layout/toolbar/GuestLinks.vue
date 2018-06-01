<template>
  <md-button @click="toggleSignInModal()">
    sign in / create an account
  </md-button>
</template>

<script lang="ts">
import { Action } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'GuestLinks' })
export default class GuestLinks extends Vue {
  @Action('toggleSignInModal') toggleSignInModal

  onSignIn () {
    this.toggleSignInModal()
  }
}
</script>

<style lang="scss" scoped>
  .md-button {
    text-transform: lowercase !important;
  }
</style>
