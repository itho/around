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
                    <b-icon
                        pack="fas"
                        :icon="item.icon">
                    </b-icon>
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

    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            <img src="/static/img/icons/favicon-32x32.png" style="height: 16px; width: auto; vertical-align: text-bottom;"/> <strong>around</strong> by <a href="https://itho.co">itho</a>.
          </p>
          <p>
            by using our services, you agree to our <a href="https://itho.co">terms</a>, <a href="https://itho.co">privacy policy</a> and use of <a>cookies</a>.
          </p>
          <p>
            <!-- <svg width="25px" height="25px" transform="rotate(180)" viewBox="0 0 1000 500">
              <path d=" M425.403 117.061C408.4140000000001 133.846 390.8570000000001 151.204 390.8570000000001 233.144C390.8570000000001 316.17 329.899 385.218 250.39 397.906A31.842999999999996 31.842999999999996 0 0 1 256 416C256 433.673 241.673 448 224 448S192 433.673 192 416A31.848 31.848 0 0 1 197.609 397.905C118.101 385.217 57.143 316.169 57.143 233.143C57.143 151.21 39.592 133.851 22.6 117.065C-25.496 69.559 9.726 0 66.919 0H160C160 -35.346 188.654 -64 224 -64C259.346 -64 288 -35.346 288 0H381.08C438.27 0 473.495 69.583 425.403 117.061zM224 -24C210.766 -24 200 -13.234 200 0H248C248 -13.234 237.234 -24 224 -24zM381.092 48H66.9C50.138 48 41.765 68.39 53.566 80.191C82.151 108.776 105.143 135.915 105.143 233.1430000000001C105.143 298.6810000000001 158.462 352 224 352S342.857 298.681 342.857 233.143C342.857 135.493 366.078 108.569 394.425 80.191C406.278 68.339 397.783 48 381.092 48z"/>
            </svg> -->
            <!-- <svg>
              <use xlink:href="/static/webfonts/fa-regular.svg#bell"></use>
            </svg> -->
            <!-- <svg>
              <defs>
                <g id="shape">
                  <circle cx="100" cy="100" r="100" />
                </g>
              </defs>

              <use xlink:href="#shape" x="10" y="10" />
            </svg> -->
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 640" width="40" height="40">
              <defs>
                <path d="M337.97 2.29L347.58 3.2L357.08 4.47L366.46 6.09L375.71 8.05L384.81 10.34L393.77 12.95L402.57 15.89L411.21 19.13L419.68 22.68L427.98 26.53L436.08 30.66L444 35.08L451.71 39.77L459.22 44.73L466.5 49.95L473.57 55.42L480.4 61.14L487 67.1L493.34 73.29L499.44 79.71L505.27 86.34L510.83 93.18L516.11 100.23L521.11 107.47L525.81 114.9L530.21 122.51L534.31 130.3L538.09 138.25L541.55 146.36L544.67 154.63L547.46 163.04L549.9 171.59L551.98 180.26L553.7 189.07L555.06 197.99L556.04 207.02L556.63 216.15L556.83 225.37L556.63 234.6L556.04 243.76L555.06 252.84L553.7 261.87L551.98 270.85L549.9 279.8L547.46 288.72L544.67 297.63L541.55 306.53L538.09 315.45L534.31 324.37L530.21 333.33L525.81 342.32L521.11 351.36L516.11 360.46L510.83 369.63L505.27 378.88L499.44 388.22L493.34 397.66L487 407.21L480.4 416.88L473.57 426.69L466.5 436.63L459.22 446.73L451.71 457L444 467.43L436.08 478.06L427.98 488.87L419.68 499.9L411.21 511.14L402.57 522.6L393.77 534.3L384.81 546.25L375.71 558.46L366.46 570.93L357.08 583.69L347.58 596.73L337.97 610.07L328.24 623.72L318.41 637.7L308.59 623.72L298.86 610.07L289.24 596.73L279.74 583.69L270.36 570.93L261.12 558.46L252.01 546.25L243.06 534.3L234.25 522.6L225.61 511.14L217.14 499.9L208.85 488.87L200.74 478.06L192.83 467.43L185.11 457L177.61 446.73L170.32 436.63L163.26 426.69L156.42 416.88L149.83 407.21L143.48 397.66L137.39 388.22L131.56 378.88L126 369.63L120.72 360.46L115.72 351.36L111.02 342.32L106.61 333.33L102.52 324.37L98.74 315.45L95.28 306.53L92.15 297.63L89.37 288.72L86.93 279.8L84.84 270.85L83.12 261.87L81.77 252.84L80.79 243.76L80.2 234.6L80 225.37L80.2 216.15L80.79 207.02L81.77 197.99L83.12 189.07L84.84 180.26L86.93 171.59L89.37 163.04L92.15 154.63L95.28 146.36L98.74 138.25L102.52 130.3L106.61 122.51L111.02 114.9L115.72 107.47L120.72 100.23L126 93.18L131.56 86.34L137.39 79.71L143.48 73.29L149.83 67.1L156.42 61.14L163.26 55.42L170.32 49.95L177.61 44.73L185.11 39.77L192.83 35.08L200.74 30.66L208.85 26.53L217.14 22.68L225.61 19.13L234.25 15.89L243.06 12.95L252.01 10.34L261.12 8.05L270.36 6.09L279.74 4.47L289.24 3.2L298.86 2.29L308.59 1.73L318.41 1.54L328.24 1.73L337.97 2.29ZM309.15 107.92L304.59 108.35L300.09 108.96L295.65 109.72L291.27 110.65L286.96 111.73L282.72 112.97L278.55 114.36L274.45 115.9L270.44 117.58L266.51 119.4L262.67 121.36L258.92 123.45L255.27 125.68L251.72 128.03L248.26 130.5L244.92 133.09L241.68 135.8L238.56 138.62L235.55 141.56L232.67 144.59L229.9 147.74L227.27 150.98L224.77 154.31L222.4 157.74L220.17 161.26L218.09 164.87L216.15 168.56L214.36 172.32L212.72 176.17L211.24 180.08L209.92 184.07L208.76 188.11L207.77 192.23L206.96 196.4L206.32 200.62L205.85 204.9L205.57 209.22L205.48 213.59L205.57 217.96L205.85 222.29L206.32 226.57L206.96 230.79L207.77 234.96L208.76 239.07L209.92 243.12L211.24 247.11L212.72 251.02L214.36 254.86L216.15 258.63L218.09 262.32L220.17 265.92L222.4 269.44L224.77 272.87L227.27 276.21L229.9 279.45L232.67 282.59L235.55 285.63L238.56 288.57L241.68 291.39L244.92 294.1L248.26 296.69L251.72 299.16L255.27 301.51L258.92 303.73L262.67 305.83L266.51 307.79L270.44 309.61L274.45 311.29L278.55 312.82L282.72 314.21L286.96 315.45L291.27 316.54L295.65 317.47L300.09 318.23L304.59 318.83L309.15 319.27L313.76 319.53L318.41 319.62L323.07 319.53L327.67 319.27L332.23 318.83L336.73 318.23L341.17 317.47L345.55 316.54L349.86 315.45L354.11 314.21L358.28 312.82L362.37 311.29L366.38 309.61L370.31 307.79L374.15 305.83L377.9 303.73L381.55 301.51L385.11 299.16L388.56 296.69L391.91 294.1L395.14 291.39L398.27 288.57L401.27 285.63L404.16 282.59L406.92 279.45L409.56 276.21L412.06 272.87L414.43 269.44L416.65 265.92L418.74 262.32L420.68 258.63L422.47 254.86L424.11 251.02L425.59 247.11L426.91 243.12L428.06 239.07L429.05 234.96L429.87 230.79L430.51 226.57L430.97 222.29L431.25 217.96L431.35 213.59L431.25 209.22L430.97 204.9L430.51 200.62L429.87 196.4L429.05 192.23L428.06 188.11L426.91 184.07L425.59 180.08L424.11 176.17L422.47 172.32L420.68 168.56L418.74 164.87L416.65 161.26L414.43 157.74L412.06 154.31L409.56 150.98L406.92 147.74L404.16 144.59L401.27 141.56L398.27 138.62L395.14 135.8L391.91 133.09L388.56 130.5L385.11 128.03L381.55 125.68L377.9 123.45L374.15 121.36L370.31 119.4L366.38 117.58L362.37 115.9L358.28 114.36L354.11 112.97L349.86 111.73L345.55 110.65L341.17 109.72L336.73 108.96L332.23 108.35L327.67 107.92L323.07 107.66L318.41 107.57L313.76 107.66L309.15 107.92Z" id="a2Xlw8CRpL"></path>
                <path d="M525 230.45C525 339.37 433.14 427.79 320 427.79C206.86 427.79 115 339.37 115 230.45C115 121.54 206.86 33.12 320 33.12C433.14 33.12 525 121.54 525 230.45Z" id="c9F1iGcu"></path>
                <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stop-color="#b06ab3"/>
                  <stop offset="100%" stop-color="#4568dc"/>
                </linearGradient>
              </defs>
              <g>
                <g>
                  <use xlink:href="#a2Xlw8CRpL" opacity="1" fill="url(#linear)" fill-opacity="1"></use>
                </g>
                <g>
                  <use xlink:href="#c9F1iGcu" opacity="1" fill="#f5f5f5" fill-opacity="1"></use>
                  <!-- <use xlink:href="#c9F1iGcu" opacity="1" fill="#ffd700" fill-opacity="1"></use> -->
                </g>
              </g>
              <g>
                <use transform="scale(0.4) translate(470,280)" fill="#DC143C" xlink:href="/static/webfonts/fa-solid.svg#heart"></use>
              </g>
            </svg>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Home'
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
