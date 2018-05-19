<template>
  <section class="has-background-white">
    <b-tabs position="is-centered" class="block">
        <b-tab-item label="around-me" icon="street-view">
          <around-map></around-map>
        </b-tab-item>
        <b-tab-item label="quick-view" icon="list-ul">
          456
        </b-tab-item>
        <b-tab-item label="profile" icon="user-circle">
          789
        </b-tab-item>
    </b-tabs>

    <Floating-action-button/>
  </section>
</template>

<script lang="ts">
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'

import AroundMap from '@/components/Map.vue'
import FloatingActionButton from '@/components/layout/FloatingActionButton.vue'

@Component({
  name: 'Dashboard',
  components: {
    AroundMap,
    FloatingActionButton
  }
})
export default class Dashboard extends Vue {
  // initial data
  someNum: number = 1
}
</script>

<style lang="scss" scoped></style>
