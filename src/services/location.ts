import vm from '../main'

export default {
  checkEnabled(): boolean {
    let val = !!(vm.$store.state.geolocation.lat !== null && vm.$store.state.geolocation.lng !== null)
    return val
  }
}
