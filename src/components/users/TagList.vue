<template>
  <div class="tags" style="justify-content: center;">
    <span v-for="(u, i) in users" :key="i"
      v-if="snapshot.liked[u.id]"
      class="button tag is-white is-large is-rounded"
      style="padding-left: 0.75em; padding-right: 0.75em; box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);"
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