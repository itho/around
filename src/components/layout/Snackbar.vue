<template>
  <md-snackbar
    :md-position="snackbar.position"
    :md-duration="snackbar.isInfinity ? Infinity : snackbar.duration"
    :md-active.sync="snackbar.active"
    :class="snackbarClass"
    md-persistent>
      <span v-html="snackbar.message"/>
      <md-button class="has-text-white" @click="onCloseSnackbar()">Close</md-button>
  </md-snackbar>
</template>

<script lang="ts">
import { Action, Getter } from 'vuex-class'
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({ name: 'GuestLinks' })
export default class GuestLinks extends Vue {
  @Action('closeSnackbar') closeSnackbar
  @Action('openSnackbar') openSnackbar
  @Getter('error') error
  @Getter('snackbar') snackbar
  @Getter('success') success

  get snackbarClass () {
    return 'is-' + this.snackbar.type
  }

  shouldQueue () {
    return document.getElementsByClassName('md-snackbar-content').length
  }

  onCloseSnackbar () {
    this.closeSnackbar()
  }

  addErrorMessage (message) {
    if (this.shouldQueue()) {
      setTimeout(() => this.addErrorMessage(message), 250)
    } else {
      this.openSnackbar({ message, type: 'error'})
    }
  }

  addSuccessMessage (message) {
    if (this.shouldQueue()) {
      setTimeout(() => this.addSuccessMessage(message), 250)
    } else {
      this.openSnackbar({ message, type: 'success'})
    }
  }

  @Watch('error')
  onErrorChange(to: any, from: any) {
    if (this.error) {
      this.addErrorMessage(this.error.message)
    }
  }

  @Watch('success')
  onSuccessChange(to: any, from: any) {
    if (this.success) {
      this.addSuccessMessage(this.success.message)
    }
  }
}
</script>

<style lang="scss">
  .md-snackbar.is-success {
    background-color: #4caf50;
  }
  .md-snackbar.is-error {
    background-color: #d32f2f;
  }
</style>
