<template>
  <section class="section is-paddingless-touch">
    <div class="container">
      <div class="tile is-ancestor is-marginless">
        <div class="tile is-5 is-vertical is-parent is-paddingless-touch">
          <div class="tile is-child card">
            <div id="image" class="card-content">
              <b-field v-if="form.files.length === 0" class="has-text-centered" style="width: 100%;">
                <b-upload v-model="form.files" drag-drop>
                  <section class="section">
                    <div class="content has-text-centered">
                      <p>
                        <font-awesome-icon icon="image" size="4x"/>
                      </p>
                      <p>Drop your files here or click to upload</p>
                    </div>
                  </section>
                  <p class="help has-text-grey pl-5">Required. (max. 5MB)</p>
                </b-upload>
              </b-field>
              
              <div id="thumbnail"></div>

              <div class="tags">
                <span v-for="(file, index) in form.files"
                  :key="index"
                  class="tag is-primary" >
                  {{ file.name }}
                  <button class="delete is-small"
                    type="button"
                    @click="deleteFormFile()">
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div class="tile is-child is-hidden-touch"></div>
        </div>
        <div class="tile is-parent is-paddingless-touch">
          <div class="tile is-child card">
            <div class="card-content">
              <div class="field">
                <label class="label">Location</label>
                <div class="control has-icons-left">
                  <a v-if="!form.locationName" class="button is-fullwidth is-loading">Button</a>
                  <span v-else>
                    <div v-if="form.locationOptions" class="select is-fullwidth">
                      <select v-model="form.locationName">
                        <option v-for="(location, i) in form.locationOptions" :key="i" :value="location.formatted_address">{{ location.formatted_address }}</option>
                      </select>
                    </div>
                    <input v-else class="input" :value="form.locationName" disabled/>
                  </span>
                  <div class="icon is-small is-left">
                    <font-awesome-icon icon="map-marker"/>
                  </div>
                </div>
                <p class="help has-text-grey">
                  You are only allowed to post from your current location.
                </p>
              </div>

              <div class="field">
                <label class="label">Description</label>
                <div class="control">
                  <textarea
                    class="textarea"
                    placeholder="e.g. Hello world!"
                    v-model.trim="form.description"
                    @input="$v.form.description.$touch()"></textarea>
                </div>
                <p v-if="!$v.form.description.required || !$v.form.description.minLength" class="help has-text-grey">
                  Required &amp; must have at least {{ $v.form.description.$params.minLength.min }} characters.
                </p>
                <p v-else class="help is-success">
                  Required &amp; must have at least {{ $v.form.description.$params.minLength.min }} characters. ✓
                </p>
              </div>

              <div class="field">
                <label class="label">Type</label>
                <div class="control has-icons-left">
                  <div class="select is-fullwidth">
                    <select v-model="form.icon" :class="{ 'is-danger': $v.form.icon.$error }">
                      <option disabled value="">Please select one</option>
                      <template v-for="icon in iconList">
                        <option v-if="icon.divider" :key="icon.id" disabled value="">{{ icon.title }}</option>
                        <option v-else :key="icon.id" :value="icon.id">{{ icon.title }}</option>
                      </template>
                    </select>
                  </div>
                  <div class="icon is-small is-left">
                    <font-awesome-icon :icon="form.icon || 'question'"/>
                  </div>
                </div>
                <p v-if="!$v.form.icon.required" class="help has-text-grey">Required.</p>
                <p v-else class="help is-success">Required. ✓</p>
              </div>

              <div class="columns">
                <div class="column">
                  <b-field label="Date" style="margin-bottom: 0.25rem;">
                    <b-datepicker
                      v-model="form.date"
                      :min-date="form.minDate"
                      :max-date="form.maxDate">
                    </b-datepicker>
                  </b-field>
                  <p class="help has-text-grey">Must be within one week.</p>
                </div>
                <div class="column">
                  <b-field label="Time">
                    <b-timepicker v-model="form.time">
                      <button class="button is-primary"
                        @click="form.time = new Date()">
                        <font-awesome-icon icon="clock" size="xs" pull="left"/>
                        <span>Now</span>
                      </button>
                    </b-timepicker>
                  </b-field>
                </div>
                <div class="column">
                  <label class="label">Duration</label>
                  <div class="control">
                    <div class="select is-fullwidth">
                      <select v-model="form.duration">
                        <option v-for="i in 24" :key="i" :value="i">{{ i }} hour{{ (i > 1) ? 's' : '' }}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="columns is-mobile">
                <div class="column is-narrow">
                  <a
                    class="button is-primary is-outlined"
                    :class="{ 'is-loading': formIsLoading }"
                    @click="addPost()"
                    :disabled="formIsInvalid">
                    Submit
                  </a>
                </div>
                <div class="column">&nbsp;</div>
                <div class="column is-narrow">
                  <a class="button is-info is-outlined" @click="resetForm()" :disabled="!formIsResetable || formIsDisabled">
                    <font-awesome-icon icon="undo" size="xs" pull="left"/>
                    <span>Reset</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>


      <!-- <h1 class="title">New Event</h1>
      <div class="event">
        <div class="columns">
          <div id="image" class="column is-narrow">
            <b-field v-if="form.files.length === 0" class="has-text-centered" style="width: 100%;">
              <b-upload v-model="form.files" drag-drop>
                <section class="section">
                  <div class="content has-text-centered">
                    <p>
                      <font-awesome-icon icon="image" size="4x"/>
                    </p>
                    <p>Drop your files here or click to upload</p>
                  </div>
                </section>
                <p class="help has-text-grey pl-5">Required. (max. 5MB)</p>
              </b-upload>
            </b-field>
            
            <div id="thumbnail"></div>

            <div class="tags">
              <span v-for="(file, index) in form.files"
                :key="index"
                class="tag is-primary" >
                {{ file.name }}
                <button class="delete is-small"
                  type="button"
                  @click="deleteFormFile()">
                </button>
              </span>
            </div>
          </div>

          <div class="column">
            <div class="field">
              <label class="label">Location</label>
              <div class="control has-icons-left">
                <a v-if="!form.locationName" class="button is-fullwidth is-loading">Button</a>
                <span v-else>
                  <div v-if="form.locationOptions" class="select is-fullwidth">
                    <select v-model="form.locationName">
                      <option v-for="(location, i) in form.locationOptions" :key="i" :value="location.formatted_address">{{ location.formatted_address }}</option>
                    </select>
                  </div>
                  <input v-else class="input" :value="form.locationName" disabled/>
                </span>
                <div class="icon is-small is-left">
                  <font-awesome-icon icon="map-marker"/>
                </div>
              </div>
              <p class="help has-text-grey">
                You are only allowed to post from your current location.
              </p>
            </div>

            <div class="field">
              <label class="label">Description</label>
              <div class="control">
                <textarea
                  class="textarea"
                  placeholder="e.g. Hello world!"
                  v-model.trim="form.description"
                  @input="$v.form.description.$touch()"></textarea>
              </div>
              <p v-if="!$v.form.description.required || !$v.form.description.minLength" class="help has-text-grey">
                Required &amp; must have at least {{ $v.form.description.$params.minLength.min }} characters.
              </p>
              <p v-else class="help is-success">
                Required &amp; must have at least {{ $v.form.description.$params.minLength.min }} characters. ✓
              </p>
            </div>

            <div class="field">
              <label class="label">Type</label>
              <div class="control has-icons-left">
                <div class="select is-fullwidth">
                  <select v-model="form.icon" :class="{ 'is-danger': $v.form.icon.$error }">
                    <option disabled value="">Please select one</option>
                    <template v-for="icon in iconList">
                      <option v-if="icon.divider" :key="icon.id" disabled value="">{{ icon.title }}</option>
                      <option v-else :key="icon.id" :value="icon.id">{{ icon.title }}</option>
                    </template>
                  </select>
                </div>
                <div class="icon is-small is-left">
                  <font-awesome-icon :icon="form.icon || 'question'"/>
                </div>
              </div>
              <p v-if="!$v.form.icon.required" class="help has-text-grey">Required.</p>
              <p v-else class="help is-success">Required. ✓</p>
            </div>

            <div class="columns">
              <div class="column">
                <b-field label="Date" style="margin-bottom: 0.25rem;">
                  <b-datepicker
                    v-model="form.date"
                    :min-date="form.minDate"
                    :max-date="form.maxDate">
                  </b-datepicker>
                </b-field>
                <p class="help has-text-grey">Must be within one week.</p>
              </div>
              <div class="column">
                <b-field label="Time">
                  <b-timepicker v-model="form.time">
                    <button class="button is-primary"
                      @click="form.time = new Date()">
                      <font-awesome-icon icon="clock" size="xs" pull="left"/>
                      <span>Now</span>
                    </button>
                  </b-timepicker>
                </b-field>
              </div>
              <div class="column">
                <label class="label">Duration</label>
                <div class="control">
                  <div class="select is-fullwidth">
                    <select v-model="form.duration">
                      <option v-for="i in 24" :key="i" :value="i">{{ i }} hour{{ (i > 1) ? 's' : '' }}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div class="columns is-mobile">
              <div class="column is-narrow">
                <a
                  class="button is-primary is-outlined"
                  :class="{ 'is-loading': formIsLoading }"
                  @click="addPost()"
                  :disabled="formIsInvalid">
                  Submit
                </a>
              </div>
              <div class="column">&nbsp;</div>
              <div class="column is-narrow">
                <a class="button is-info is-outlined" @click="resetForm()" :disabled="!formIsResetable || formIsDisabled">
                  <font-awesome-icon icon="undo" size="xs" pull="left"/>
                  <span>Reset</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </section>
</template>

<script lang="ts">
import * as ColorThief from '@mariotacke/color-thief'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { maxLength, minLength, required  } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import firebase from 'firebase'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import geofire from 'geofire'

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
    description: { required, minLength: minLength(10), maxLength: maxLength(250) },
    icon: { required, maxLength: maxLength(100) },
    locationName: { required, maxLength: maxLength(250) }
  }
}

@Component({
  name: 'NewEvent',
  components: { FontAwesomeIcon },
  mixins: [ validationMixin ],
  validations: NewEventFormValidations
})
export default class NewEvent extends Vue {
  @Getter('user') user
  @Getter('getEventIconList') iconList

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
    time: new Date(),
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
      this.form.time.getHours(), this.form.time.getMinutes(), this.form.time.getSeconds()
    )

    let start = begins.getTime()
    let end = new Date(start + (this.form.duration * 60 * 60 * 1000)).getTime()

    return { created, start, end }
  }

  get formIsInvalid (): boolean {
    return !!(
      this.$v.$invalid ||
      this.form.files.length === 0 ||
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

  mounted () {
    this.getLocationName()
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
          vm.$toast.open({
            duration: 5000,
            message: 'No location results found!',
            position: 'is-bottom',
            type: 'is-danger'
          })
        }
      } else {
        if (vm.$store.state.geolocation.lat !== null || vm.$store.state.geolocation.lng !== null) {
          vm.$toast.open({
            duration: 5000,
            message: 'Unable to find location',
            position: 'is-bottom',
            type: 'is-danger'
          })
        }
      }
    })
  }

  // 
  deleteFormFile (index: number = 0) {
    this.form.files.splice(index, 1)
    this.form.theme = null
    document.getElementById('thumbnail').innerHTML = ''
  }
  
  // 
  resetForm () {
    if (this.formIsResetable) {
      this.form.description = this.form.icon = ''
      this.form.isDisabled = this.form.isLoading = false
      this.deleteFormFile()
      this.form.date = new Date()
      this.form.time = new Date()
      this.form.duration = 1
    }
  }

  // 
  @Watch('location')
  onLocationChanged(newVal: string, oldVal: string) {
    this.getLocationName()
  }

  @Watch('form.files')
  onFormFilesChanged(newVal: string, oldVal: string) {
    // Skip when the change is a reset of the file
    if (this.form.files.length === 0) return

    let file = this.form.files[0]
    let imageType = /image.*/

    // Reject non-images and those over 5MB
    if (!file.type.match(imageType) || file.size > 5242880) {
      this.$toast.open({
        duration: 5000,
        message: 'Please select an image file under 5MB!',
        position: 'is-bottom',
        type: 'is-danger'
      })

      this.deleteFormFile()
      return
    }

    let image = document.createElement('img')
    let thumbnail = document.getElementById('thumbnail')
    thumbnail.appendChild(image)

    let reader = new FileReader()
    reader.onload = (function(aImg){
      return function(e){
        aImg.src = e.target.result;
      };
    }(image))

    let ret = reader.readAsDataURL(file)
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')

    const vm = this

    image.onload = () => {
      ctx.drawImage(image, 100, 100)

      // grab the dominant color from the image and use as a theme
      let rgbArr = colorThief.getColor(image)
      let rgbStr = 'rgb(' + rgbArr[0] + ',' + rgbArr[1] + ',' + rgbArr[2] + ')'

      vm.form.theme = rgbStr
    }
  }

  // 
  async addPost () {
    if (this.formIsSubmitable) {
      // 1. upload image to firebase storage
      // 2. upload event to geofire with image ref

      this.form.isDisabled = this.form.isLoading = true
      this.form.users.created = this.user.id
      this.form.users.liked[this.user.id] = new Date().getTime()
      this.form.users.reported[this.user.id] = false

      const newEventKey = firebase.database().ref().child('events').push().key
      const imageRef = `images/events/${this.user.id}/${newEventKey}`
      
      await firebase.storage()
        .ref()
        .child(imageRef)
        .put(this.form.files[0])
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

          this.$toast.open({
            duration: 5000,
            message,
            position: 'is-bottom',
            type: 'is-danger'
          })
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

            this.$toast.open({
              duration: 5000,
              message: 'Event added!',
              position: 'is-bottom',
              type: 'is-success'
            })
            this.$router.push({ name: 'show-event', params: { id: newEventKey }})
          })
          .catch(error => {
            console.log(error)

            this.$toast.open({
              duration: 5000,
              message: 'Unable to add event!',
              position: 'is-bottom',
              type: 'is-danger'
            })
          })
      }
    } else {
      this.$toast.open({
        duration: 5000,
        message: 'Invalid event!',
        position: 'is-bottom',
        type: 'is-danger'
      })
    }
    this.form.isDisabled = this.form.isLoading = false
  }
}
</script>

<style lang="scss">
  #image.column {
    max-width: 350px;
    margin: 0 auto;
  }

  .upload-draggable {
    width: 100%;
  }

  // prevent dropdown date/timepickers not wrapping content
  .dropdown.is-active .dropdown-menu,
  .dropdown.is-hoverable:hover .dropdown-menu {
    min-width: 100% !important;
    width: auto !important;
  }
</style>
