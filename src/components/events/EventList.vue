<template>
  <div>
    <div v-if="events.length" class="event-list">
      <h1 class="title is-5">
        {{ title }}:
        <span v-if="events.length > 2">
          (<a @click="showAll = !showAll">show {{ showAll ? 'fewer' : 'all' }}</a>)
        </span>
      </h1>
      <div class="columns is-multiline">
        <template v-for="(event, key, index) in visibleEvents">
          <div :key="index" class="column is-half">
            <fixed-height-card :id="event[0]"/>
          </div>
        </template>
      </div>
    </div>
    <div v-else class="event-list">
      <h1 class="title is-5">No {{ title }}.</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import FixedHeightCard from '@/components/events/FixedHeightCard.vue'

@Component({
  name: 'EventList',
  components: { FixedHeightCard }
})
export default class EventList extends Vue {
  @Prop() title: string
  @Prop() events: Around.Event[]

  defaultVisible: number = 2
  showAll: boolean = false

  get visibleEvents (): Around.Event[] {
    return (this.showAll)
      ? this.events
      : this.events.slice(0, this.defaultVisible)
  }  
}
</script>

<style lang="scss" scoped>
.event-list {
  margin-bottom: 1.5rem;
}
</style>
