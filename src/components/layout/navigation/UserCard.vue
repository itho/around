<template>
  <md-card class="is-shadowless">
    <md-card-media-cover>
      <md-card-media md-ratio="16:9" class="app-gradient md-elevation-1"></md-card-media>
      <md-card-area v-if="user">
        <md-card-header>
          <md-list class="md-double-line is-paddingless" style="background-color: transparent;">
            <md-list-item class="is-paddingless">
              <md-avatar>
                <img :src="user.photoUrl" alt="Profile Pic">
              </md-avatar>
              <div class="md-list-item-text">
                <span class="has-text-white" style="font-weight: 600;">{{ user.name }}</span>
                <span class="has-text-white">{{ user.email }}</span>
              </div>
            </md-list-item>
          </md-list>
        </md-card-header>
      </md-card-area>
      <md-card-area v-else>
        <md-card-header>
          <md-list class="is-paddingless" style="background-color: transparent;">
            <md-list-item class="is-paddingless">
              <div class="md-list-item-text">
                <span class="md-title has-text-white" style="font-weight: 600;">around</span>
              </div>
            </md-list-item>
          </md-list>
        </md-card-header>
      </md-card-area>
    </md-card-media-cover>
  </md-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: 'UserCard' })
export default class UserCard extends Vue {
  @Prop() user: any
}
</script>

<style lang="scss" scoped>
  .md-card-header {
    padding: 0;
  }
</style>
