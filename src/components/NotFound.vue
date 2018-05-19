<template>
  <section class="section has-background-white">
    <div class="container">
      <h1 class="title">Page not found.</h1>
      <h2 class="subtitle">
        <router-link :to="{ path: '/' }"> 
          home 
        </router-link>
      </h2>
      <br>
      <p class="has-text-centered">
        <img src="/static/img/notfound.svg" style="max-width: 800px;"/>
      </p>
    </div>
    <!-- <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Page not found.
        </h1>
        <h2 class="subtitle">
          <router-link :to="{ path: '/' }"> 
            home 
          </router-link>
        </h2>
        <p>
          <img src="/static/img/notfound.svg"/>
        </p>
      </div>
    </div> -->
  </section>
</template>

<script lang="ts">
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'

@Component({
  name: 'NotFound'
})
export default class NotFound extends Vue {
  
}
</script>

<style lang="scss"></style>
