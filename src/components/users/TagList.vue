<template>
  <div class="tags" style="justify-content: center;">
    <span v-for="(u, i) in users" :key="i"
      v-if="snapshot.liked[u.id]"
      class="button tag is-white is-large is-rounded"
      style="padding-left: 0.75em; padding-right: 0.75em; box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);"
      @click="$router.push({ name: 'user', params: { id: u.id } })">
      <figure class="image is-32x32">
        <progressive-img
          :src="u.photoUrl"
          :aspect-ratio="1"
          alt="user image"
          style="border-radius: 50%; background: #eee; transform: translateX(-12px);"/>
      </figure>
      {{ u.name }}
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'TagList'
})
export default class TagList extends Vue {
  @Prop() users: any
  @Prop() snapshot: any
}
</script>