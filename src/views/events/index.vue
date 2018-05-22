<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'

@Component({
  name: 'Events'
})
export default class Events extends Vue {
  
}
</script>

<style lang="scss" scoped></style>
