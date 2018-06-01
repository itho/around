<template>
  <router-link :to="{ name: 'show-event', params: { id }}">
    <md-card md-with-hover style="margin-bottom: 0px;">
      <md-ripple>                 
        <md-card-media>
          <progressive-img
            :src="imageUrl"
            :aspect-ratio="aspectRatio">
            <div
              slot-scope="{ visible }"
              v-if="visible"
              style="height: 100%;"
              :style="'background: ' + event.theme + ';'">
            </div>
          </progressive-img>
        </md-card-media>
        <md-card-content style="padding: 0;">
          <content-placeholders v-if="!snapshot.event.description" rounded>
            <content-placeholders-text :lines="2" />
          </content-placeholders>
          <md-list v-else class="md-double-line" style="padding: 0;">
            <md-list-item>
              <div class="md-list-item-text">
                <span>{{ event.description }}</span>
                <span>
                  <md-icon class="subtitle-icon">location_on</md-icon> {{ eventDistance }} - {{ eventDates }}</span>
              </div>
        
              <md-button class="md-icon-button md-list-action">
                <!-- <md-icon>pets</md-icon> -->
                <font-awesome-icon :icon="event.icon"/>
              </md-button>
            </md-list-item>
          </md-list>
        </md-card-content>
      </md-ripple>
    </md-card>
  </router-link>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import axios from 'axios'
import firebase from 'firebase'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import moment from 'moment'

@Component({
  name: 'FixedHeightCard',
  components: { FontAwesomeIcon },
})
export default class FixedHeightCard extends Vue {}
</script>

