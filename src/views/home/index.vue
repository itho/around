<template>
  <div>
    <section class="hero is-medium brand--gradient">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1 has-text-white">
            around
          </h1>
          <h2 class="subtitle has-text-light">
            A truly social network for discovering what's happening around you.
          </h2>
        </div>
      </div>
    </section>

    <section class="section has-background-white-90">
      <div class="container">
        <h1 class="title">How it works...</h1>
        <p>
          Simply and quckly add posts showing what you're up to and for how long
          in order to let other users to know what's going on in the area!
        </p>
      </div>
    </section>

    <section class="section has-background-white-90">
      <div class="container">
        <div class="columns">
          <div class="column is-narrow">
            <p class="image is-128x128" style="margin: auto !important;">
              <img src="/static/img/home/map-marker.svg"/>
            </p>
          </div>
          <div class="column" style="margin: auto !important;">
            <p class="has-text-centered">
              All posts are geo-tagged so only those local will be able to see what's happening in the area.
              <br>
              When searching for events, you'll be shown everything going on
              in your area and be able to quickly see what's available for you to do. 
            </p>
          </div>
        </div>

        <div class="columns">
          <div class="column is-narrow is-hidden-tablet">
            <p class="image is-128x128" style="margin: auto !important;">
              <img src="/static/img/home/coffee.svg"/>
            </p>
          </div>
          <div class="column" style="margin: auto !important;">
            <p class="has-text-centered">
              Fancy an impromptu book club at your favourite coffee place?
              <br>
              Now it's possible to extend your audience and meet like-minded
              people looking to share your interests.
              </p>
          </div>
          <div class="column is-narrow is-hidden-mobile">
            <p class="image is-128x128" style="margin: auto !important;">
              <img src="/static/img/home/coffee.svg"/>
            </p>
          </div>
        </div>

        <div class="columns">
          <div class="column is-narrow">
            <p class="image is-128x128" style="margin: auto !important;">
              <img src="/static/img/home/trophy.svg"/>
            </p>
          </div>
          <div class="column" style="margin: auto !important;">
            <p class="has-text-centered">
              This only person supporting your team at a sports bar?
              <br>
              Let people know they've got a fellow fan enjoying the match and
              meet new people in your area who you could get along with.
              </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section has-background-white-90">
      <div class="container">
        <h1 class="title">What to expect!</h1>
      </div>
    </section>

    <section class="hero">
      <img src="/static/img/home/example-map.png" style="witdh: 100%; height: auto;"/>
    </section>

    <section v-if="randomUsers" class="section has-background-white-90">
      <div class="container">
        <div class="columns">
          <div v-for="(item, i) in examplePosts" :key="i" class="column">
            <div class="card">
              <div class="card-image">
                <figure class="image is-16by9">
                  <img :src="item.img" alt="post image">
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img :src="getRandomUserPicture(i)" alt="user image" style="border-radius: 50%;">
                    </figure>
                  </div>
                  <div class="media-content is-clipped">
                    <p class="title is-4">{{ getRandomUserName(i) }}</p>
                    <p class="subtitle is-6">
                      {{ item.time }}
                    </p>
                  </div>
                  <div class="media-right">
                    <font-awesome-icon :icon="item.icon"/>
                  </div>
                </div>
                <div class="content">
                  <p v-html="item.text"></p>
                  <p class="subtitle is-7 has-text-right">example post</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <app-footer />
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { Component, Vue } from 'vue-property-decorator'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import AppFooter from '../../components/layout/AppFooter.vue'

@Component({
  name: 'Home',
  components: {
    FontAwesomeIcon,
    AppFooter
  }
})
export default class Home extends Vue {
  // randomuser.me data object
  randomUsers: any = false
  examplePosts: object = [
    { img: '/static/img/home/coffee-640-360.png', time: '1.2 km - moments ago', icon: 'coffee', text: 'Just got some Blue Mountain Coffee, you need to come try this!! <a>#coffee</a> <a>#coffeelover</a>' },
    { img: '/static/img/home/basketball-640-360.png', time: '2.4 km - 1.5 hours ago', icon: 'basketball-ball', text: 'Making the most of this weather by shooting some hoops out by the beach. 🙌 <a>#basketball</a>' },
    { img: '/static/img/home/cocktails-640-360.png', time: '400m - 45 minutes ago', icon: 'glass-martini', text: 'TGIF! Celebrating the end of the week by staying out all night! <a>#cocktails</a> <a>#party</a>' }
  ]

  mounted () {
    axios.get(`https://randomuser.me/api?results=3`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.randomUsers = response.data.results
    })
    .catch(e => {
      this.$toast.open({
        duration: 3500,
        message: `Unable to fetch sample data!`,
        position: 'is-top',
        type: 'is-danger'
      })
    })
  }

  getRandomUserName (index: number): string {
    let fn = this.randomUsers[index].name.first.charAt(0).toUpperCase() + this.randomUsers[index].name.first.substr(1)
    let ln = this.randomUsers[index].name.last.charAt(0).toUpperCase() + this.randomUsers[index].name.last.substr(1)
    return fn + ' ' + ln
  }

  getRandomUserPicture (index: number): string {
    return this.randomUsers[index].picture.thumbnail
  }
}
</script>

<style lang="scss"></style>
