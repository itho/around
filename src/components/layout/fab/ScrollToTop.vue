<template>
  <transition name="fab-transition" mode="out-in">
    <button
      v-if="scrollTop > 200"
      class="mdc-fab ripple app-fab--absolute"
      aria-label="Scroll To Top"
      @click="handleClicked()">
      <span class="mdc-fab__icon">
        <font-awesome-icon icon="chevron-up" size="2x" class="has-text-white"/>
      </span>
    </button>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

@Component({
  name: 'ScrollToTop',
  components: { FontAwesomeIcon }
})
export default class ScrollToTop extends Vue {
  scrollTop: number = 0

  mounted () {
    document.addEventListener('scroll', (e) => { this.scrollTop = window.scrollY }, true)
  }

  handleClicked () {
    this.scrollIt(0)
  }

  scrollIt (destination, duration = 300, easing = 'easeInOutCubic', callback = null) {
    const easings = {
      linear (t) { return t },
      easeInQuad (t) { return t * t },
      easeOutQuad (t) { return t * (2 - t) },
      easeInOutQuad (t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t },
      easeInCubic (t) { return t * t * t },
      easeOutCubic (t) { return (--t) * t * t + 1 },
      easeInOutCubic (t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 },
      easeInQuart (t) { return t * t * t * t },
      easeOutQuart (t) { return 1 - (--t) * t * t * t },
      easeInOutQuart (t) { return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t },
      easeInQuint (t) { return t * t * t * t * t },
      easeOutQuint (t) { return 1 + (--t) * t * t * t * t },
      easeInOutQuint (t) { return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t }
    }

    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

    const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
    const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

    if ('requestAnimationFrame' in window === false) {
      window.scroll(0, destinationOffsetToScroll);
      if (callback) {
        callback();
      }
      return;
    }

    function scroll() {
      const now = 'now' in window.performance ? performance.now() : new Date().getTime();
      const time = Math.min(1, ((now - startTime) / duration));
      const timeFunction = easings[easing](time);
      window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

      if (window.pageYOffset === destinationOffsetToScroll) {
        if (callback) {
          callback();
        }
        return;
      }

      requestAnimationFrame(scroll);
    }

    scroll();
  }
}
</script>

<style lang="scss" scoped>
  .mdc-fab {
    --mdc-ripple-fg-size: 0;
    --mdc-ripple-left: 0;
    --mdc-ripple-top: 0;
    --mdc-ripple-fg-scale: 1;
    --mdc-ripple-fg-translate-end: 0;
    --mdc-ripple-fg-translate-start: 0;
    -webkit-tap-highlight-color: transparent;
    will-change: transform,opacity;
    -webkit-box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
    box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
    display: -ms-inline-flexbox;
    display: inline-flex;
    position: relative;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 56px;
    height: 56px;
    padding: 0;
    transition: box-shadow .28s cubic-bezier(.4,0,.2,1),opacity 15ms linear 30ms,-webkit-transform .27s cubic-bezier(0,0,.2,1) 0ms;
    -webkit-transition: opacity 15ms linear 30ms,-webkit-box-shadow .28s cubic-bezier(.4,0,.2,1),-webkit-transform .27s cubic-bezier(0,0,.2,1) 0ms;
    transition: opacity 15ms linear 30ms,-webkit-box-shadow .28s cubic-bezier(.4,0,.2,1),-webkit-transform .27s cubic-bezier(0,0,.2,1) 0ms;
    -o-transition: box-shadow .28s cubic-bezier(.4,0,.2,1),opacity 15ms linear 30ms,transform .27s 0ms cubic-bezier(0,0,.2,1);
    transition: box-shadow .28s cubic-bezier(.4,0,.2,1),opacity 15ms linear 30ms,transform .27s cubic-bezier(0,0,.2,1) 0ms;
    transition: box-shadow .28s cubic-bezier(.4,0,.2,1),opacity 15ms linear 30ms,transform .27s cubic-bezier(0,0,.2,1) 0ms,-webkit-box-shadow .28s cubic-bezier(.4,0,.2,1),-webkit-transform .27s cubic-bezier(0,0,.2,1) 0ms;
    transition: box-shadow .28s cubic-bezier(.4,0,.2,1),opacity 15ms linear 30ms,transform .27s cubic-bezier(0,0,.2,1) 0ms,-webkit-transform .27s cubic-bezier(0,0,.2,1) 0ms;
    border: none;
    border-radius: 50%;
    fill: currentColor;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    overflow: hidden;
    // background-color: #018786;
    color: #fff;
    color: var(--mdc-theme-on-secondary,#fff);
    z-index: 99;
    background: #4568dc;  /* fallback for old browsers */
    // background: -webkit-linear-gradient(to right, #b06ab3, #4568dc);  /* Chrome 10-25, Safari 5.1-6 */
    // background: linear-gradient(to right, #b06ab3, #4568dc); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  .mdc-fab:hover {
    cursor: pointer;
  }

  .mdc-fab:focus,
  .mdc-fab:hover {
    -webkit-box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);
    box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12);
  }

  .mdc-fab:active,
  .mdc-fab:focus {
    outline: none;
  }

  .app-fab--absolute {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
  }

  @media(min-width: 1024px) {
    .app-fab--absolute {
      bottom: 1.5rem;
      right: 1.5rem;
    }
  }

  .mdc-fab__icon {
    width: 24px;
    height: 24px;
    font-size: 12px;
    line-height: 12px;
  }
</style>
