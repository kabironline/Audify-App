<template>
  <section class="section section-upload">
    <h2 class="heading-2">Upload a track</h2>
    <form
      class="form__container form__container--track"
      action="/upload"
      method="post"
      enctype="multipart/form-data"
    >
      <div class="form__group">
        <input
          type="text"
          minlength="1"
          maxlength="50"
          name="title"
          id="title"
          placeholder="Track Name"
          class="form__input"
          required
        />
        <label for="title" class="form__label">Track Name</label>
      </div>
      <div class="form__group">
        <select aria-required="true" name="genre" id="genre" class="form__input" required>
          <option value="" disabled selected>Genre</option>

          <option v-for="genre in genres" :key="genre" value="{{genre.id}}">
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
          id="track"
          required
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
            ref="coverLarge"
            @change="handleCoverImage"
            required
          />
          <img
            :src="imageSrc"
            ref="coverImage"
            alt=""
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
    </form>
  </section>
</template>

<script>
export default {
  name: 'UploadView',
  data: () => ({
    imageSrc: '',
    genres: [
      { id: 1, name: 'Rock' },
      { id: 2, name: 'Pop' },
      { id: 3, name: 'Jazz' },
      { id: 4, name: 'Hip Hop' },
      { id: 5, name: 'Classical' },
      { id: 6, name: 'Country' },
      { id: 7, name: 'Blues' },
      { id: 8, name: 'Electronic' },
      { id: 9, name: 'Folk' },
      { id: 10, name: 'R&B' }
    ]
  }),
  methods: {
    handleCoverImage(event) {
      const file = event.target.files[0]
      if (!file) {
        return
      }
      const src = URL.createObjectURL(file)
      this.imageSrc = src
    }
  }
}
</script>

<style></style>
