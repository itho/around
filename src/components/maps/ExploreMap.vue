<template>
  <gmap-map
    ref="mapRef"
    :center="location"
    :zoom="14"
    :style="'width: 100%; height: ' + computedHeight"
    :options="mapOptions"
    map-type-id="roadmap">
  >
    <gmap-polygon
      :paths="mapPolygonPaths"
      :options="mapPolygonOptions"
      :editable="false">
    </gmap-polygon>

    <gmap-marker
      :position="userMarker.position"
      :clickable="true"
      :draggable="false"
      :icon="userMarker.icon"
      @click="mapPanTo(userMarker.position)"
    />

    <gmap-marker
      v-for="(m, index) in eventMarkers"
      :key="index"
      :position="m.position"
      :clickable="true"
      :draggable="false"
      :icon="m.icon"
      @click="goTo(m.id)"
    />
  </gmap-map>
</template>

<script lang="ts">
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import firebase from 'firebase'

/// <reference types="@types/googlemaps" />

@Component({
  name: 'ExploreMap'
})
export default class ExploreMap extends Vue {
  @Prop() events: any

  // initial data
  get windowHeight (): number {
    switch (true) {
      case (window.innerWidth > 960):
        return window.innerHeight - 64
      case (window.innerWidth > 600):
        return window.innerHeight - 48
      default:
        return window.innerHeight - 56
    }
  }
  
  get location () {
    return new google.maps.LatLng(
      this.$store.state.geolocation.lat,
      this.$store.state.geolocation.lng
    )
  }

  getLatLng (lat, lng) {
    return new google.maps.LatLng(lat, lng)
  }

  get mapPolygonPaths () {
    return [
      [
        new google.maps.LatLng(85,180),
        new google.maps.LatLng(85,90),
        new google.maps.LatLng(85,0),
        new google.maps.LatLng(85,-90),
        new google.maps.LatLng(85,-180),
        new google.maps.LatLng(0,-180),
        new google.maps.LatLng(-85,-180),
        new google.maps.LatLng(-85,-90),
        new google.maps.LatLng(-85,0),
        new google.maps.LatLng(-85,90),
        new google.maps.LatLng(-85,180),
        new google.maps.LatLng(0,180),
        new google.maps.LatLng(85,180)
      ],
      this.userCircle()
    ]
  }

  mapPolygonOptions: object = {
    strokeColor: '#a1a1a1',
    strokeOpacity: 0.8,
    strokeWeight: 1,
    fillColor: '#a1a1a1',
    fillOpacity: 0.35
  }

  mapOptions: object = {
    styles : this.$store.getters.getMapStylesLight,
    disableDefaultUI: true,
  }

  get userMarker () {
    return {
      position: this.location,
      icon: {
        url: this.getMarkerURI('user', '#209CEE')
      }
    }
  }

  get eventMarkers () {
    let array = []
    for (var key in this.events) {
      // skip loop if the property is from prototype
      if (!this.events.hasOwnProperty(key)) continue;

      var obj = this.events[key];

      let eventId = obj.key
      let eventObj = obj.val

      array.push({
        id: eventId,
        position: new google.maps.LatLng(eventObj.location.lat, eventObj.location.lng),
        icon: {
          url: this.getMarkerURI(eventObj.icon)
        }
      })
    }
    return array
  }

  mounted () {
    //
  }

  // computed
  get computedHeight () {
    return this.windowHeight + 'px'
  }

  drawCircle (point, radius, dir) { 
    let d2r = Math.PI / 180 // degrees to radians 
    let r2d = 180 / Math.PI // radians to degrees 
    let earthsradius = 6371 // radius of the earth 6371 km / 3963 mi
    let points = 64

    // find the raidus in lat/lon 
    let rlat = (radius / earthsradius) * r2d
    let rlng = rlat / Math.cos(point.lat * d2r)

    let extp = new Array()

    const start = (dir === 1) ? 0 : points + 1
    const end = (dir === 1) ? points + 1 : 0

    for (let i = start; (dir == 1 ? i < end : i > end); i = i + dir) {
      let theta = Math.PI * (i / (points/2))
      let ey = point.lng + (rlng * Math.cos(theta)) // center a + radius x * cos(theta) 
      let ex = point.lat + (rlat * Math.sin(theta)) // center b + radius y * sin(theta) 
      extp.push(new google.maps.LatLng(ex, ey))
    }

    return extp;
  }

  userCircle () {
    let point = {
      lat: this.location.lat(),
      lng: this.location.lng()
    }
    let radius = 10
    let dir = -1
    let d2r = Math.PI / 180 // degrees to radians 
    let r2d = 180 / Math.PI // radians to degrees 
    let earthsradius = 6371 // radius of the earth 6371 km / 3963 mi
    let points = 64

    // find the raidus in lat/lon 
    let rlat = (radius / earthsradius) * r2d
    let rlng = rlat / Math.cos(point.lat * d2r)

    let extp = new Array()

    const start = (dir === 1) ? 0 : points + 1
    const end = (dir === 1) ? points + 1 : 0

    for (let i = start; (dir == 1 ? i < end : i > end); i = i + dir) {
      let theta = Math.PI * (i / (points/2))
      let ey = point.lng + (rlng * Math.cos(theta)) // center a + radius x * cos(theta) 
      let ex = point.lat + (rlat * Math.sin(theta)) // center b + radius y * sin(theta) 
      extp.push(new google.maps.LatLng(ex, ey))
    }

    return extp;
  }

  // method
  getMarkerURI (id: string, bg: string = 'url(#linear)') {
    let icon: any = this.$store.getters.getMapMarkerIcon(id)

    let svgMarker: string = '<?xml version="1.0" encoding="UTF-8"?>\
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet" viewBox="0 0 640 640" width="40" height="40">\
      <defs>\
        <path d="M337.97 2.29L347.58 3.2L357.08 4.47L366.46 6.09L375.71 8.05L384.81 10.34L393.77 12.95L402.57 15.89L411.21 19.13L419.68 22.68L427.98 26.53L436.08 30.66L444 35.08L451.71 39.77L459.22 44.73L466.5 49.95L473.57 55.42L480.4 61.14L487 67.1L493.34 73.29L499.44 79.71L505.27 86.34L510.83 93.18L516.11 100.23L521.11 107.47L525.81 114.9L530.21 122.51L534.31 130.3L538.09 138.25L541.55 146.36L544.67 154.63L547.46 163.04L549.9 171.59L551.98 180.26L553.7 189.07L555.06 197.99L556.04 207.02L556.63 216.15L556.83 225.37L556.63 234.6L556.04 243.76L555.06 252.84L553.7 261.87L551.98 270.85L549.9 279.8L547.46 288.72L544.67 297.63L541.55 306.53L538.09 315.45L534.31 324.37L530.21 333.33L525.81 342.32L521.11 351.36L516.11 360.46L510.83 369.63L505.27 378.88L499.44 388.22L493.34 397.66L487 407.21L480.4 416.88L473.57 426.69L466.5 436.63L459.22 446.73L451.71 457L444 467.43L436.08 478.06L427.98 488.87L419.68 499.9L411.21 511.14L402.57 522.6L393.77 534.3L384.81 546.25L375.71 558.46L366.46 570.93L357.08 583.69L347.58 596.73L337.97 610.07L328.24 623.72L318.41 637.7L308.59 623.72L298.86 610.07L289.24 596.73L279.74 583.69L270.36 570.93L261.12 558.46L252.01 546.25L243.06 534.3L234.25 522.6L225.61 511.14L217.14 499.9L208.85 488.87L200.74 478.06L192.83 467.43L185.11 457L177.61 446.73L170.32 436.63L163.26 426.69L156.42 416.88L149.83 407.21L143.48 397.66L137.39 388.22L131.56 378.88L126 369.63L120.72 360.46L115.72 351.36L111.02 342.32L106.61 333.33L102.52 324.37L98.74 315.45L95.28 306.53L92.15 297.63L89.37 288.72L86.93 279.8L84.84 270.85L83.12 261.87L81.77 252.84L80.79 243.76L80.2 234.6L80 225.37L80.2 216.15L80.79 207.02L81.77 197.99L83.12 189.07L84.84 180.26L86.93 171.59L89.37 163.04L92.15 154.63L95.28 146.36L98.74 138.25L102.52 130.3L106.61 122.51L111.02 114.9L115.72 107.47L120.72 100.23L126 93.18L131.56 86.34L137.39 79.71L143.48 73.29L149.83 67.1L156.42 61.14L163.26 55.42L170.32 49.95L177.61 44.73L185.11 39.77L192.83 35.08L200.74 30.66L208.85 26.53L217.14 22.68L225.61 19.13L234.25 15.89L243.06 12.95L252.01 10.34L261.12 8.05L270.36 6.09L279.74 4.47L289.24 3.2L298.86 2.29L308.59 1.73L318.41 1.54L328.24 1.73L337.97 2.29ZM309.15 107.92L304.59 108.35L300.09 108.96L295.65 109.72L291.27 110.65L286.96 111.73L282.72 112.97L278.55 114.36L274.45 115.9L270.44 117.58L266.51 119.4L262.67 121.36L258.92 123.45L255.27 125.68L251.72 128.03L248.26 130.5L244.92 133.09L241.68 135.8L238.56 138.62L235.55 141.56L232.67 144.59L229.9 147.74L227.27 150.98L224.77 154.31L222.4 157.74L220.17 161.26L218.09 164.87L216.15 168.56L214.36 172.32L212.72 176.17L211.24 180.08L209.92 184.07L208.76 188.11L207.77 192.23L206.96 196.4L206.32 200.62L205.85 204.9L205.57 209.22L205.48 213.59L205.57 217.96L205.85 222.29L206.32 226.57L206.96 230.79L207.77 234.96L208.76 239.07L209.92 243.12L211.24 247.11L212.72 251.02L214.36 254.86L216.15 258.63L218.09 262.32L220.17 265.92L222.4 269.44L224.77 272.87L227.27 276.21L229.9 279.45L232.67 282.59L235.55 285.63L238.56 288.57L241.68 291.39L244.92 294.1L248.26 296.69L251.72 299.16L255.27 301.51L258.92 303.73L262.67 305.83L266.51 307.79L270.44 309.61L274.45 311.29L278.55 312.82L282.72 314.21L286.96 315.45L291.27 316.54L295.65 317.47L300.09 318.23L304.59 318.83L309.15 319.27L313.76 319.53L318.41 319.62L323.07 319.53L327.67 319.27L332.23 318.83L336.73 318.23L341.17 317.47L345.55 316.54L349.86 315.45L354.11 314.21L358.28 312.82L362.37 311.29L366.38 309.61L370.31 307.79L374.15 305.83L377.9 303.73L381.55 301.51L385.11 299.16L388.56 296.69L391.91 294.1L395.14 291.39L398.27 288.57L401.27 285.63L404.16 282.59L406.92 279.45L409.56 276.21L412.06 272.87L414.43 269.44L416.65 265.92L418.74 262.32L420.68 258.63L422.47 254.86L424.11 251.02L425.59 247.11L426.91 243.12L428.06 239.07L429.05 234.96L429.87 230.79L430.51 226.57L430.97 222.29L431.25 217.96L431.35 213.59L431.25 209.22L430.97 204.9L430.51 200.62L429.87 196.4L429.05 192.23L428.06 188.11L426.91 184.07L425.59 180.08L424.11 176.17L422.47 172.32L420.68 168.56L418.74 164.87L416.65 161.26L414.43 157.74L412.06 154.31L409.56 150.98L406.92 147.74L404.16 144.59L401.27 141.56L398.27 138.62L395.14 135.8L391.91 133.09L388.56 130.5L385.11 128.03L381.55 125.68L377.9 123.45L374.15 121.36L370.31 119.4L366.38 117.58L362.37 115.9L358.28 114.36L354.11 112.97L349.86 111.73L345.55 110.65L341.17 109.72L336.73 108.96L332.23 108.35L327.67 107.92L323.07 107.66L318.41 107.57L313.76 107.66L309.15 107.92Z" id="a2Xlw8CRpL"></path>\
        <path d="M525 230.45C525 339.37 433.14 427.79 320 427.79C206.86 427.79 115 339.37 115 230.45C115 121.54 206.86 33.12 320 33.12C433.14 33.12 525 121.54 525 230.45Z" id="c9F1iGcu"></path>\
        <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%"   stop-color="#b06ab3"/><stop offset="100%" stop-color="#4568dc"/></linearGradient>\
      </defs>\
      <g>\
        <g><use xlink:href="#a2Xlw8CRpL" opacity="1" fill="' + bg + '" fill-opacity="1"></use></g>\
        <g><use xlink:href="#c9F1iGcu" opacity="1" fill="#f5f5f5" fill-opacity="1"></use></g>\
      </g>'
    let svgIcon0: string = '<g><path fill="#212121" transform="scale(' + icon.scale + ') translate(' + icon.translateX + ',' + icon.translateY + ')" d="'
    let svgIcon1: string = icon.path
    let svgIcon2: string = '"></path></g></svg>'

    let svgURI: string = 'data:image/svg+xml;utf8,' + encodeURIComponent(svgMarker + svgIcon0 + svgIcon1 + svgIcon2)
    return svgURI
  }

  public $refs: any ={
    mapRef: google.maps.Map
  }

  mapPanTo (position: any) {
    this.$refs.mapRef.panTo(position)
  }

  goTo (id: string) {
    this.$router.push({ name: 'show-event', params: { id }})
  }

  logPosition () {
    console.log(this.location)
  }
}
</script>

<style lang="scss" scoped></style>
