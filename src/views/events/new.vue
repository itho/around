<template>
  <section class="section has-background-white">
    <div class="container">
      <h1 class="title">New Event</h1>
      <div class="event">
        <div class="columns">
          <div id="image" class="column is-narrow">
            <b-field v-if="dropFiles.length === 0" class="has-text-centered" style="width: 100%;">
              <b-upload v-model="dropFiles" drag-drop>
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
              <span v-for="(file, index) in dropFiles"
                :key="index"
                class="tag is-primary" >
                {{ file.name }}
                <button class="delete is-small"
                  type="button"
                  @click="deleteDropFile()">
                </button>
              </span>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Title</label>
              <div class="control">
                <input
                  class="input"
                  :class="{ 'is-danger': $v.form.title.$error }"
                  type="text"
                  placeholder="e.g. Message #1"
                  v-model.trim="form.title"
                  @input="$v.form.title.$touch()"
                  autofocus>
              </div>
              <p v-if="!$v.form.title.required" class="help has-text-grey">Required.</p>
              <p v-else class="help is-success">Required. ✓</p>
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

            <div class="field">
              <label class="label">Description</label>
              <div class="control">
                <textarea
                  class="textarea"
                  :class="{ 'is-danger': (form.description.length === 0 && $v.form.description.$error) }"
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
  </section>
</template>

<script lang="ts">
import firebase from 'firebase'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { Getter } from 'vuex-class'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'

interface NewEventForm {
  title: string
  icon: string
  description: string
  imageRef: string
}

const NewEventFormValidations = {
  form: {
    title: { required },
    icon: { required },
    description: { required, minLength: minLength(10) }
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

  form: NewEventForm = {
    title: '',
    icon: '',
    description: '',
    imageRef: ''
  }
  formDisabled: boolean = false
  formLoading: boolean = false

  dropFiles: any = []

  // Computed form state methods
  get formIsInvalid () {
    return (this.$v.$invalid || this.dropFiles.length === 0 || this.formDisabled)
  }

  get formIsLoading () {
    return this.formLoading
  }

  get formIsDisabled () {
    return this.formDisabled
  }

  get formIsResetable () {
    return (
      this.form.title ||
      this.form.icon ||
      this.form.description ||
      this.form.imageRef ||
      this.dropFiles.length !== 0
    )
  }

  // 
  deleteDropFile (index: number = 0) {
    this.dropFiles.splice(index, 1)
    document.getElementById('thumbnail').innerHTML = ''
  }
  
  // 
  resetForm () {
    this.form.title = this.form.description = this.form.icon = ''
    this.formDisabled = this.formLoading = false
    this.deleteDropFile()
  }

  // 
  @Watch('dropFiles')
  onDropFilesChanged(newVal: string, oldVal: string) {
    // Skip when the change is a reset of the file
    if (this.dropFiles.length === 0) return

    let file = this.dropFiles[0]
    let imageType = /image.*/

    // Reject non-images and those over 5MB
    if (!file.type.match(imageType) || file.size > 5242880) {
      this.$toast.open({
        duration: 5000,
        message: 'Please select an image file under 5MB!',
        position: 'is-bottom',
        type: 'is-danger'
      })

      this.deleteDropFile()
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

    image.onload = () => {
      ctx.drawImage(image, 100, 100)
    }
  }

  // 
  async addPost () {
    if (!this.$v.$invalid) {
      // 1. upload image to firebase storage
      // 2. upload event to geofire with image ref

      this.formDisabled = this.formLoading = true

      // Get a timestamp to use as an image/event reference
      let ts = new Date().getTime()
      let imageRef = `images/events/${this.user.id}/${ts}`
      
      await firebase.storage()
        .ref()
        .child(imageRef)
        .put(this.dropFiles[0])
        .then(response => {
          // Although we had this, we set the imageRef from the response to
          // ensure we match up with firebase
          this.form.imageRef = response.metadata.fullPath

          this.$toast.open({
            duration: 5000,
            message: 'Event added!',
            position: 'is-bottom',
            type: 'is-success'
          })

          // Push the app to the newly created event page
          // this.$router.push({ name: 'show-event', params: { id: '123' }})
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

          this.formDisabled = this.formLoading = false

          this.$toast.open({
            duration: 5000,
            message,
            position: 'is-bottom',
            type: 'is-danger'
          })
        })
    } else {
      this.$toast.open({
        duration: 5000,
        message: 'Invalid event!',
        position: 'is-bottom',
        type: 'is-danger'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  #image.column {
    max-width: 350px;
    margin: 0 auto;
  }
</style>
