<template>
  <section class="section has-background-white">
    <div class="container">
      <h1 class="title">We can't find you!</h1>
      <h2 class="subtitle">
        Please allow us to see your location by 
        <a href="https://www.google.com/search?q=enable+browser+location+services" target="_blank">enabling browser location services</a>.
      </h2>
      <br>
      <p class="has-text-centered">
        <img src="/static/img/settings.svg" style="max-width: 400px;"/>
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'LocationBlocked' })
export default class LocationBlocked extends Vue {}
</script>
