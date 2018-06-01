<template>
  <md-empty-state
    class="md-primary"
    :md-size="380"
    style="margin-top: 20px;"
    md-rounded
    md-icon="sentiment_dissatisfied"
    md-label="User not found!"
    md-description="They may have deleted their account or been removed.">
  </md-empty-state>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'EventNotFound' })
export default class EventNotFound extends Vue {}
</script>
