<template>
  <section class="section">show event {{ $route.params.id }}</section>
</template>

<script lang="ts">
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'

@Component({
  name: 'ShowEvent'
})
export default class ShowEvent extends Vue {
  
}
</script>

<style lang="scss" scoped></style>
