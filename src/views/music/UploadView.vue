<template>
  <section class="section section-upload">
    <h2 class="heading-2">{{ heading }}</h2>
    <form
      class="form__container form__container--track"
      @submit.prevent="handleUpload"
      enctype="multipart/form-data"
    >
      <div class="form__group">
        <input
          type="text"
          minlength="1"
          maxlength="50"
          name="title"
          v-model="form_data.name"
          id="title"
          placeholder="Track Name"
          class="form__input"
          required
        />
        <label for="title" class="form__label">Track Name</label>
      </div>
      <div class="form__group">
        <select
          aria-required="true"
          name="genre"
          id="genre"
          class="form__input"
          required
          v-model="form_data.genre"
        >
          <option value="" disabled selected>Genre</option>

          <option v-for="genre in genres" :key="genre" :value="genre.id">
            {{ genre.name }}
          </option>
        </select>
        <label for="genre" aria-autocomplete="list" class="form__label">Genre</label>
      </div>
      <div class="form__group">
        <input
          type="date"
          name="release_date"
          id="release_date"
          v-model="form_data.release_date"
          placeholder="Release Date"
          class="form__input"
          required
        />
        <label for="release_date" class="form__label">Release Date</label>
      </div>
      <div class="form__group">
        <textarea
          name="lyrics"
          id="lyrics"
          class="form__input form__input--textarea"
          placeholder="Lyrics"
          v-model="form_data.lyrics"
        ></textarea>
        <label for="lyrics" class="form__label">Lyrics (Optional)</label>
      </div>
      <div class="form__group form__group--reverse">
        <label class="form__label" for="track">Track</label>
        <input
          class="form__input form__input--file"
          type="file"
          accept=".mp3"
          name="track"
          :required="!editMode"
          id="track"
          ref="track"
        />
        <img src="" alt="" class="form__input--img" />
      </div>
      <div class="form__group form__group--reverse">
        <label class="form__label" for="cover">Cover Large</label>
        <div class="form__input--img-container">
          <input
            class="form__input form__input--file cover-large"
            type="file"
            accept=".png"
            name="cover"
            id="cover"
            required="!editMode"
            ref="coverLarge"
            @change="handleCoverImage"
          />
          <img
            :src="imageSrc"
            ref="coverImage"
            class="form__input--img"
            :style="{ display: imageSrc != '' ? 'block' : 'none' }"
          />
        </div>
      </div>
      <input
        class="form__button form__button--track btn btn-primary"
        type="submit"
        value="Upload"
      />
      <p>{{ this.error }}</p>
    </form>
  </section>
</template>

<script>
import { getTrack, uploadTrack, editTrack } from '@/api/track'
import { getGenres } from '@/helper/getters'
import { useUserStore } from '@/stores/user'
import { trackImage } from '@/utils/http'

export default {
  name: 'UploadView',
  data: () => ({
    imageSrc: '',
    genres: [],
    form_data: {
      name: '',
      genre: '',
      release_date: '',
      lyrics: ''
    },
    error: '',
    heading: 'Upload Track',
    editMode: false
  }),
  methods: {
    handleCoverImage(event) {
      const file = event.target.files[0]
      if (!file) {
        return
      }
      const src = URL.createObjectURL(file)
      this.imageSrc = src
    },
    async handleUpload() {
      let response
      const formData = new FormData()
      formData.append('track_name', this.form_data.name)
      formData.append('track_genre', this.form_data.genre)
      formData.append('release_date', this.form_data.release_date)
      formData.append('track_lyrics', this.form_data.lyrics)
      formData.append('track_media', this.$refs.track.files[0])
      formData.append('track_cover', this.$refs.coverLarge.files[0])
      if (this.editMode) {
        const trackId = this.$route.params.trackId
        formData.append('track_id', trackId)
        response = await editTrack(trackId, formData)
      } else {
        response = await uploadTrack(formData)
      }
      if (response) {
        this.$router.go(-1)
      } else {
        this.error = 'Error uploading track. Please try again.'
      }
    }
  },
  mounted() {
    getGenres().then((response) => {
      this.genres = response
    })
    if (this.$route.name === 'track-edit') {
      const trackId = this.$route.params.trackId
      this.heading = 'Edit Track'
      getTrack(trackId).then((response) => {
        const store = useUserStore()
        if (store.getUserChannel.id !== response.track.channel_id) {
          this.$router.go(-1)
        }
        this.form_data.name = response.track.name
        this.form_data.genre = response.track.genre_id
        this.form_data.release_date = new Date(Date.parse(response.track.release_date))
          .toISOString()
          .slice(0, 10)
        this.form_data.lyrics = response.track.lyrics
        this.imageSrc = trackImage(response.track.id)
        this.editMode = true
      })
    }
  }
}
</script>
