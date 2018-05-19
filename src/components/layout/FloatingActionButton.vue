<template>
  <button
    class="mdc-fab ripple app-fab--absolute"
    aria-label="Add"
    @click="handleClicked()">
    <!-- <span class="mdc-fab__icon">
      favorite
    </span> -->
    <!-- <b-icon
      class="mdc-fab__icon"
      pack="fas"
      icon="plus"
      size="is-small">
    </b-icon> -->
    <span class="mdc-fab__icon">+</span>
  </button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'FloatingActionButton'
})
export default class FloatingActionButton extends Vue {
  handleClicked () {
    this.$router.push({ name: 'new-event' })
  }
}
</script>

<style lang="scss">
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
    font-size: 35px;
    line-height: 18px;
  }
</style>
