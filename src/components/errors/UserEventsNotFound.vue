<template>
  <md-empty-state
    class="md-primary"
    :md-size="380"
    md-rounded
    md-icon="search"
    md-label="No events not found!">
  </md-empty-state>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'EventNotFound' })
export default class EventNotFound extends Vue {}
</script>
