<template>
  <md-card>        
    <md-card-media>
      <progressive-img
        :src="user.photoUrl"
        :aspect-ratio="aspectRatio"
        @onLoad="setAspectRatio">
        <div
          slot-scope="{ visible }"
          v-if="visible"
          style="height: 100%; background: #eee;">
        </div>
      </progressive-img>
    </md-card-media>
    <md-card-header style="padding: 0;">                
    <div class="md-title">
      <content-placeholders v-if="!user.name" rounded style="padding: 16px;">
        <content-placeholders-text :lines="1" />
      </content-placeholders>
      <md-list v-else>
        <md-list-item>                
          <span class="md-list-item-text">{{ user.name }}</span>
        
          <md-button class="md-icon-button md-list-action">
            <md-icon class="md-primary">star_border</md-icon>
          </md-button>
        </md-list-item>
      </md-list>
    </div>
    </md-card-header>
  </md-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'FullHeightCard'
})
export default class FullHeightCard extends Vue {
  @Prop() user: any

  aspectRatio: number = 1
  // aspectRatioStr: string = '1/1'

  setAspectRatio () {
    let el = document.getElementById('user-image') as HTMLElement
    let img = (el)
      ? el.getElementsByClassName('progressive-image-main')[0] as HTMLImageElement
      : null

    this.aspectRatio = (el) ? img.height / img.width : 1
    // this.aspectRatioStr = this.getClosestAspectRatio()
  }

  // getClosestAspectRatio () {
  //   switch (true) {
  //     case (this.aspectRatio >= 16/9):
  //       return '16/9'
  //     case (this.aspectRatio >= 4/3):
  //       return '4/3'
  //     case (this.aspectRatio >= 1):
  //     default:
  //       return '1/1'
  //   }
  // }
}
</script>

<style lang="scss" scoped>
</style>
