<template>
  <section class="section is-paddingless-touch">
    <div class="container">
      <div class="tile is-ancestor is-marginless">
        <div class="tile is-5 is-vertical is-parent">
          <div class="tile is-child">
            <md-card md-with-hover onclick="document.getElementById('event-image-input').click()">
                <md-card-media-cover>
                  <md-card-media id="event-image" :md-ratio="aspectRatio" style="background: #eee;"></md-card-media>
                  <input id="event-image-input" type="file" style="display:none" ref="myFiles" v-on:change="onFileInputChange()"/>
                  <md-card-area v-if="!image" style="height: 100%;">
                    <md-card-header style="height: 100%; text-align: center;">
                      <span class="md-title has-text-grey-dark" style="margin-top: 12%;">
                        <md-icon class="md-size-3x">image</md-icon>
                      </span>
                      <span class="md-subhead has-text-grey-dark">Required. (max. 5MB)</span>
                    </md-card-header>
                  </md-card-area>
                </md-card-media-cover>
            </md-card>
          </div>
          <div class="tile is-child is-hidden-touch"></div>
        </div>
        <div class="tile is-parent is-vertical">
          <div id="form-tile" class="tile is-child">
            <form novalidate class="md-layout" @submit.prevent="validateEvent">
              <md-card class="md-layout-item">
                <md-card-header>
                  <div class="md-title">New Event</div>
                </md-card-header>

                <md-card-content>
                  <md-field :class="getValidationClass('locationName')">
                    <label for="location">Location</label>
                    <a v-if="!form.locationName" class="button is-fullwidth is-loading">Button</a>
                    <span class="md-prefix"><md-icon class="subtitle-icon">location_on</md-icon></span>
                    <md-select md-autogrow name="location" id="location" v-model="form.locationName" :disabled="sending">
                      <md-option
                        v-for="(location, i) in form.locationOptions"
                        :key="i"
                        :value="location.formatted_address">
                        {{ location.formatted_address }}
                      </md-option>
                    </md-select>
                    <span class="md-error" v-if="!$v.form.locationName.required">The location is required</span>
                    <span class="md-error" v-else-if="!$v.form.locationName.maxlength">The location is too long</span>
                  </md-field>

                  <md-field :class="getValidationClass('description')">
                    <label for="description">Description</label>
                    <md-textarea md-autogrow  md-counter="250" name="description" id="description" v-model="form.description" :disabled="sending" />
                    <span class="md-error" v-if="!$v.form.description.required">The description is required</span>
                    <span class="md-error" v-else-if="!$v.form.description.maxlength">The description is too long</span>
                  </md-field>

                  <md-field :class="getValidationClass('icon')">
                    <label for="icon">Theme</label>
                    <span v-if="form.icon" class="md-prefix">
                      <font-awesome-icon :icon="form.icon" style="margin: 0 6px;"/>
                    </span>
                    <md-select name="icon" id="icon" v-model="form.icon" :disabled="sending">
                      <md-optgroup v-for="(iconGroup, i) in iconList" :key="i" :label="iconGroup.title">
                        <md-option v-for="(icon, j) in iconGroup.icons" :key="j" :value="icon.id">{{ icon.title }}</md-option>
                      </md-optgroup>
                    </md-select>
                    <span class="md-error" v-if="!$v.form.icon.required">The icon is required</span>
                  </md-field>

                  <md-datepicker v-model="form.date" :md-disabled-dates="disabledDates" md-immediately>
                    <label>Select date</label>
                  </md-datepicker>

                  <div class="md-layout md-gutter">
                    <div class="md-layout-item md-small-size-100">
                      <md-field>
                        <label style="top: 0; font-size: 12px;">Select time</label>
                        <vue-timepicker v-model="form.time" :minute-interval="10" hide-clear-button></vue-timepicker>
                      </md-field>
                    </div>
                    <div class="md-layout-item md-small-size-100">
                      <md-field :class="getValidationClass('duration')">
                        <label for="duration">Select duration</label>
                        <md-select name="duration" id="duration" v-model="form.duration" :disabled="sending">
                          <md-option v-for="i in 24" :key="i" :value="i">{{ i }} hour{{ (i > 1) ? 's' : '' }}</md-option>
                        </md-select>
                      </md-field>
                    </div>
                  </div>
                </md-card-content>

                <md-card-actions>
                  <md-button type="submit" class="md-primary" :disabled="formIsInvalid || sending">Create event</md-button>
                </md-card-actions>
                <md-progress-bar md-mode="indeterminate" v-if="sending" />
              </md-card>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import * as ColorThief from '@mariotacke/color-thief'
import { Action, Getter } from 'vuex-class'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { maxLength, minLength, required  } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import firebase from 'firebase'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import geofire from 'geofire'
import VueTimepicker from 'vue2-timepicker'

const colorThief = new ColorThief()

interface NewEventForm {
  description: string
  icon: string
  image: string
  location: google.maps.LatLngLiteral,
  locationName: string,
  theme: string,
  timestamps: { created: number, start: number, end: number },
  users: { created: string, liked: object, reported: object }
}

const NewEventFormValidations = {
  form: {
    description: { required, maxLength: maxLength(250) },
    icon: { required, maxLength: maxLength(100) },
    locationName: { required, maxLength: maxLength(250) }
  }
}

@Component({
  name: 'NewEvent',
  components: { FontAwesomeIcon, VueTimepicker },
  mixins: [ validationMixin ],
  validations: NewEventFormValidations
})
export default class NewEvent extends Vue {
  @Action('setError') setError
  @Action('setSuccess') setSuccess
  @Getter('user') user
  @Getter('getEventIconList') iconList
  
  sending: boolean = false
  tenMinutesInMilli: number = 1000 * 60 * 10

  form: any = {
    date: new Date(),
    description: null,
    duration: 1,
    files: [],
    icon: '', // empty str to display select placeholder
    image: null,
    locationName: '',
    locationOptions: null,
    minDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
    maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 6),
    now: new Date(),
    theme: null,
    time: {
      HH: new Date().getHours(),
      mm: new Date(Math.ceil(new Date().getTime() / this.tenMinutesInMilli) * this.tenMinutesInMilli).getMinutes()
    },
    users: {
      created: null,
      liked: {},
      reported: {}
    },
    isDisabled: false,
    isLoading: false
  }

  get eventForm (): NewEventForm {
    return {
      description: this.form.description,
      icon: this.form.icon,
      image: this.form.image,
      location: this.location,
      locationName: this.form.locationName,
      theme: this.form.theme,
      timestamps: this.timestamps,
      users: {
        created: this.form.users.created,
        liked: this.form.users.liked,
        reported: this.form.users.reported
      }
    }
  }

  get timestamps (): NewEventForm['timestamps'] {
    let created = new Date().getTime()

    let begins = new Date(
      this.form.date.getFullYear(), this.form.date.getMonth(), this.form.date.getDate(), 
      this.form.time.HH, this.form.time.mm
    )

    let start = begins.getTime()
    let end = new Date(start + (this.form.duration * 60 * 60 * 1000)).getTime()

    return { created, start, end }
  }

  get formIsInvalid (): boolean {
    return !!(
      this.$v.$invalid ||
      this.image === null ||
      this.form.isDisabled
    )
  }

  get formIsLoading (): boolean {
    return this.form.isLoading
  }

  get formIsDisabled (): boolean {
    return this.form.isDisabled
  }

  get formIsResetable (): boolean {
    // any form attributes are set and the form isn't processing
    return !!((
      this.form.icon ||
      this.form.description ||
      this.form.image ||
      this.form.files.length !== 0
    ) && !this.form.isLoading)
  }

  get formIsSubmitable (): boolean {
    return !this.formIsInvalid
  }

  disabledDates (date) {
    let minDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
    let maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 6)

    return !(date >= minDate && date <= maxDate)
  }

  mounted () {
    this.getLocationName()
  }

  getValidationClass (fieldName) {
    const field = this.$v.form[fieldName]

    if (field) {
      return {
        'md-invalid': field.$invalid && field.$dirty
      }
    }
  }

  validateEvent () {
    this.$v.form.$touch()

    if (!this.$v.$invalid) {
      this.addPost()
    }
  }

  get location () {
    return {
      lat: this.$store.state.geolocation.lat,
      lng: this.$store.state.geolocation.lng
    }
  }

  getLocationName () {
    const vm = this

    let geocoder = new google.maps.Geocoder
    let latlng = {
      lat: parseFloat(this.location.lat),
      lng: parseFloat(this.location.lng)
    }

    geocoder.geocode({ 'location': latlng }, (results: any, status: any) => {
      if (status === 'OK') {
        if (results[0]) {
          vm.form.locationName = results[0].formatted_address
          if (results.length > 1) {
            vm.form.locationOptions = results
          }
        } else {
          // vm.setError({ message: 'No location results found!' })
        }
      } else {
        if (vm.$store.state.geolocation.lat !== null || vm.$store.state.geolocation.lng !== null) {
          // vm.setError({ message: 'Unable to find location' })
        }
      }
    })
  }
  
  // 
  resetForm () {
    if (this.formIsResetable) {
      this.form.description = this.form.icon = ''
      this.form.isDisabled = this.form.isLoading = this.sending = false
      this.resetImage()
      this.form.date = new Date()
      // this.form.time = new Date()
      this.form.duration = 1
    }
  }

  // 
  @Watch('location')
  onLocationChanged(newVal: string, oldVal: string) {
    this.getLocationName()
  }

  get aspectRatio () {
    return (this.image) ? null : '16/9'
  }

  public $refs: any ={
    myFiles: FileList
  }

  image: any = null
  onFileInputChange () {
    this.resetImage()
    this.image = this.$refs.myFiles.files[0]
    if (this.image === undefined) return

    let imageType = /image.*/
    // Reject non-images and those over 5MB
    if (!this.image.type.match(imageType) || this.image.size > 5242880) {
      this.setError({ message: 'Please select an image file under 5MB!' })
      this.resetImage()
      return
    }

    const vm = this
    let frame = document.getElementById('event-image') as HTMLImageElement
    let img = document.createElement('img')
    frame.appendChild(img)

    let reader = new FileReader()
    reader.onload = (function (aImg) {
      return (e) => {
        aImg.src = e.target.result
      };
    }(img))

    let ret = reader.readAsDataURL(this.image)
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')

    img.onload = () => {
      ctx.drawImage(img, 100, 100)

      // grab the dominant color from the image and use as a theme
      let rgbArr = colorThief.getColor(img)
      let rgbStr = 'rgb(' + rgbArr[0] + ',' + rgbArr[1] + ',' + rgbArr[2] + ')'
      vm.form.theme = rgbStr
    }
  }

  resetImage () {
    this.image = null
    this.form.theme = null
    document.getElementById('event-image').innerHTML = ''
  }

  // 
  async addPost () {
    if (this.formIsSubmitable) {
      // 1. upload image to firebase storage
      // 2. upload event to geofire with image ref

      this.form.isDisabled = this.form.isLoading = this.sending = true
      this.form.users.created = this.user.id
      this.form.users.liked[this.user.id] = new Date().getTime()
      this.form.users.reported[this.user.id] = false

      const newEventKey = firebase.database().ref().child('events').push().key
      const imageRef = `images/events/${this.user.id}/${newEventKey}`
      
      await firebase.storage()
        .ref()
        .child(imageRef)
        .put(this.image)
        .then(response => {
          // set the event from image to the image path
          this.form.image = response.metadata.fullPath
        })
        .catch(error => {
          let message: string = ''
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized': // User doesn't have permission to access the object
              message = 'Unauthorized: Please make sure you\'re signed in!'
              break;
            case 'storage/canceled': // User canceled the upload
              message = 'Upload cancelled.'
              break;
            case 'storage/unknown': // Unknown error occurred, inspect error.serverResponse
              message = 'Error: Unable to upload event photo!'
              break;
          }

          this.setError({ message })
        })
      
      // add the event to the firebase database
      if (this.form.image) {
        const updates = {}
        updates['/events/' + newEventKey] = this.eventForm
        updates['/user-events/' + this.user.id + '/created/' + newEventKey] = this.eventForm.timestamps.end

        await firebase.database()
          .ref()
          .update(updates)
          .then(response => {
            console.log(response)

            // Generate a random Firebase location
            let geoFireRef = firebase.database().ref('/event-locations')
            // Create a new GeoFire instance at the random Firebase location
            let geoFire = new geofire(geoFireRef)
            //
            geoFire.set(newEventKey, [this.eventForm.location.lat, this.eventForm.location.lng])
              .then(function() {
                // console.log("Current user " + newEventKey + "'s location has been added to GeoFire");

                // When the user disconnects from Firebase (e.g. closes the app, exits the browser),
                // remove their GeoFire entry
                // firebaseRef.child(username).onDisconnect().remove()
                // log("Added handler to remove user " + newEventKey + " from GeoFire when you leave this page.")
              }).catch(error => {
                // console.log("Error adding user " + newEventKey + "'s location to GeoFire")
                console.log(error)
              })

            this.setSuccess({ message: 'Event added!' })
            this.$router.push({ name: 'show-event', params: { id: newEventKey }})
          })
          .catch(error => {
            console.log(error)
            this.setError({ message: 'Unable to add event!' })
          })
      }
    } else {
      this.setError({ message: 'Invalid event!' })
    }
    this.form.isDisabled = this.form.isLoading = this.sending = false
  }
}
</script>

<style lang="scss">
  #image.column {
    max-width: 350px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    #form-tile {
      margin-top: -32px !important;
    }
  }

  .subtitle-icon {
    font-size: 20px !important;
    min-width: 16px;
    width: 16px;
    vertical-align: sub;
    margin: 0 5px;
  }

  // vue-material datepicer overrides
  strong.md-datepicker-dayname,
  strong.md-datepicker-monthname,
  strong.md-datepicker-day {
    color: white;
  }

  // vue-timepicker overrides
  .time-picker,
  .time-picker input.display-time {
    width: 100% !important;
    border: none !important;
  }

  .time-picker .dropdown ul li.active,
  .time-picker .dropdown ul li.active:hover {
    background: #4568dc !important;
    color: #fff !important;
  }

  .time-picker .dropdown {
    height: 16em !important;
    box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12) !important;
  }

  .time-picker .dropdown .select-list {
    height: 16em !important;
  }
</style>
