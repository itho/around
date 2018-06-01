<template>
  <md-empty-state
    class="md-primary"
    :md-size="380"
    style="margin-top: 20px;"
    md-rounded
    md-icon="search"
    md-label="Event not found!"
    md-description="It may have been deleted or removed.">
  </md-empty-state>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'EventNotFound' })
export default class EventNotFound extends Vue {}
</script>
