<template>
  <div class="card">
    <div class="card-image">
      <figure id="user-image" class="image">
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
      </figure>
    </div>
    <div class="card-content">

      <content-placeholders v-if="!user.name" rounded>
        <content-placeholders-text :lines="1" />
      </content-placeholders>

      <div v-else class="media">
        <div class="media-content is-clipped">
            <p class="title is-4">{{ user.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'FullHeightCard'
})
export default class FullHeightCard extends Vue {
  @Prop() user: any

  aspectRatio: number = 1

  setAspectRatio () {
    let el = document.getElementById('user-image') as HTMLElement
    let img = (el)
      ? el.getElementsByClassName('progressive-image-main')[0] as HTMLImageElement
      : null

    return (el) ? img.height / img.width : 1
  }
}
</script>

<style lang="scss" scoped>
</style>
