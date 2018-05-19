import Vue from 'vue'
import Home from '@/components/Home'

describe('Home.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Home)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.is-1 h1').textContent)
      .to.equal("around")
    expect(vm.$el.querySelector('.subtitle h2').textContent)
      .to.equal('A truly social network for discovering what\'s happening around you.')
  })
})
