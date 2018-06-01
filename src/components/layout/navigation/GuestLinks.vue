<template>
  <md-list>
    <md-list-item @click="onSignIn()">
      <md-icon>account_circle</md-icon>
      <span class="md-list-item-text">Sign in / Create an account</span>
    </md-list-item>
  </md-list>
</template>

<script lang="ts">
import { Action } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'GuestLinks' })
export default class GuestLinks extends Vue {
  @Action('toggleSignInModal') toggleSignInModal
  @Action('setError') setError
  @Action('setSuccess') setSuccess

  onSignIn () {
    this.$emit('close-menu')
    this.toggleSignInModal()
  }
}
</script>
