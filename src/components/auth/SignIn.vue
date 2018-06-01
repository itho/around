<template>
  <md-dialog :md-active.sync="isActive">
    <md-dialog-title>Sign in with your preferred account</md-dialog-title>
    <md-dialog-content style="max-width: 500px;">

      <md-button class="md-raised firebaseui-idp firebaseui-idp-google" @click.prevent="onSigninGoogle">
        <span class="firebaseui-idp-icon-wrapper">
          <img class="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg">
        </span>
        <span class="firebaseui-idp-text google">
          Sign in with Google
        </span>
      </md-button>

      <md-button class="md-raised firebaseui-idp firebaseui-idp-facebook" disabled>
        <span class="firebaseui-idp-icon-wrapper">
          <img class="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg">
        </span>
        <span class="firebaseui-idp-text facebook">
          Sign in with Facebook
        </span>
      </md-button>

      <md-button class="md-raised firebaseui-idp firebaseui-idp-twitter" disabled>
        <span class="firebaseui-idp-icon-wrapper">
          <img class="firebaseui-idp-icon" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/twitter.svg">
        </span>
        <span class="firebaseui-idp-text twitter">
          Sign in with Twitter
        </span>
      </md-button>
      
      
      <md-checkbox v-model="legal" class="md-primary has-text-danger">
        <p class="subtitle is-7" style="margin-top: 2px;" :class="{ 'has-text-danger': (error && !legal) }">
          I have read &amp; agree to the <a>terms</a> and <a>privacy policy</a>.
        </p>
      </md-checkbox>

    </md-dialog-content>
  </md-dialog>
</template>

<script lang="ts">
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

@Component({
  name: 'SignIn'
})
export default class SignIn extends Vue {
  @Getter('signInModal') signInModalState
  @Action('toggleSignInModal') toggleSignInModal

  legal: boolean = false
  error: boolean = false

  get isActive (): boolean {
    return this.signInModalState
  }

  set isActive (newValue: boolean) {
    // this is only going to be set to false from this component action so we
    // can simply trigger the toggle action in the store.
    this.toggleSignInModal()
  }

  // onSignin () {
  //   this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
  // }
  onSigninGoogle () {
    if (this.legal) {
      let redirect = this.$route.query.redirect
      this.$store.dispatch('signUserInGoogle', redirect)
    } else {
      this.error = true
    }
  }
  onSigninFacebook () {
    this.$store.dispatch('signUserInFacebook')
  }
  onSigninGithub () {
    this.$store.dispatch('signUserInGithub')
  }
  onSigninTwitter () {
    this.$store.dispatch('signUserInTwitter')
  }
  onDismissed () {
    this.$store.dispatch('clearError')
  }

  @Watch('user')
  onUserChanged(value: string, oldValue: string) {
    if (value !== null && value !== undefined) {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
  .firebaseui-idp {
    width: 100%;
    height: 40px;
    margin: 8px 0px;
  }
  .firebaseui-idp-icon-wrapper {
    display: table-cell;
    vertical-align: middle;
    margin-top: -5px;
  }
  .firebaseui-idp-icon {
    border: none;
    display: inline-block;
    height: 18px;
    vertical-align: middle;
    width: 18px;
  }
  .firebaseui-idp-text {
    display: table-cell;
    font-size: 14px;
    padding-left: 16px;
    text-transform: none;
    vertical-align: middle;
  }
  .firebaseui-idp-text.facebook,
  .firebaseui-idp-text.twitter {
    color: whitesmoke;
  }
  .firebaseui-idp-facebook {
    background-color: #3b5998 !important;
  }
  .firebaseui-idp-facebook:disabled {
    background-color: #869ECC !important;
    cursor: not-allowed !important;
  }
  .firebaseui-idp-twitter {
    background-color: #4099FF !important;
  }
</style>
