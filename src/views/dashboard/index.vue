<template>
  <section class="has-background-white">
    <b-tabs position="is-centered" class="block">
        <b-tab-item label="around-me">
          <around-map></around-map>
        </b-tab-item>
        <b-tab-item label="quick-view">
          456
        </b-tab-item>
        <b-tab-item label="profile">
          789
        </b-tab-item>
    </b-tabs>

    <!-- <Adsense
      data-ad-client="ca-pub-4693179382080726"
      data-ad-slot="1487770485">
    </Adsense> -->

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
