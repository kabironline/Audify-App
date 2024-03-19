<template>
  <section class="section section-upload">
    <h2 class="heading-2">{{ editingMode ? 'Edit the album' : 'Create an album' }}</h2>
    <form
      class="form__container form__container--track"
      method="post"
      @submit.prevent="submit"
      enctype="multipart/form-data"
    >
      <div>
        <div class="form__group">
          <input
            type="text"
            minlength="1"
            maxlength="50"
            name="title"
            v-model="form_data.album_name"
            id="title"
            placeholder="Album Name"
            class="form__input"
            required
          />
          <label for="title" class="form__label">Album Name</label>
        </div>
        <br />
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
        <br />
        <div class="form__group">
          <textarea
            name="description"
            id="description"
            class="form__input form__input--textarea"
            v-model="form_data.description"
            placeholder="Description (Optional)"
          ></textarea>
          <label for="description" class="form__label">Description (Optional)</label>
        </div>
        <br />
        <div class="form__group form__group--reverse">
          <label class="form__label" for="cover">Album Cover</label>
          <div class="form__input--img-container">
            <input
              class="form__input form__input--file cover-large"
              type="file"
              accept=".png"
              name="cover"
              id="cover"
              @change="handleCoverImage"
              :required="!editingMode"
            />
            <img
              :src="imageSrc"
              alt=""
              class="form__input--img"
              :style="{ display: imageSrc ? 'block' : 'none' }"
            />
          </div>
        </div>
        <p class="error">{{ error }}</p>
      </div>
      <div>
        <div class="track-tiles">
          <div v-for="track in tracks" :key="track">
            <input
              type="checkbox"
              name="tracks"
              class="checkbox-disable track-tile-checkbox"
              :id="`track-tile-${track.id}`"
              v-model="selectedTracks"
              :value="track.id"
            />
            <label :for="`track-tile-${track.id}`" class="track-tile-label">
              <div class="track-tile track-tile-small">
                <div class="track-tile__cover">
                  <div>
                    <img
                      :src="trackImage(track.id)"
                      alt="track Image"
                      class="track-tile__cover--img selectable"
                    />
                  </div>
                </div>
                <div class="track-tile__text">
                  <p class="track-tile__text--title">{{ track.name }}</p>
                  <p class="track-tile__text--artist">{{ track.channel.name }}</p>
                </div>
              </div>
            </label>
          </div>
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
import { createAlbum, updateAlbum } from '@/api/album'
import { getAlbum, getChannelTracks } from '@/helper/getters'
import { useUserStore } from '@/stores/user'
import { albumImage, trackImage } from '@/utils/http'
export default {
  name: 'AlbumCreate',
  data: () => ({
    imageSrc: '',
    error: '',
    tracks: [],
    selectedTracks: [],
    form_data: {
      album_name: '',
      release_date: '',
      description: ''
    },
    editingMode: false
  }),
  methods: {
    trackImage,
    handleCoverImage(event) {
      const file = event.target.files[0]
      if (!file) {
        return
      }
      const src = URL.createObjectURL(file)
      this.imageSrc = src
    },
    async submit() {
      const formData = new FormData()
      formData.append('album_name', this.form_data.album_name)
      formData.append('release_date', this.form_data.release_date)
      formData.append('album_description', this.form_data.description)
      formData.append('album_art', document.getElementById('cover').files[0])
      formData.append('album_tracks', this.selectedTracks)
      if (this.editingMode) {
        const response = await updateAlbum(this.$route.params.id, formData)
        if (response === '') {
          this.$router.push(`/album/${this.$route.params.id}`)
        } else {
          this.error = response
        }
      } else {
        this.error = await createAlbum(formData)
      }
    }
  },
  async mounted() {
    const channel = useUserStore().getUserChannel
    const channel_info = await getChannelTracks(channel.id)
    if (!channel_info.tracks.length) {
      this.$router.push('/upload')
    }
    this.tracks = channel_info.tracks

    if (this.$route.params.id) {
      this.editingMode = true
      const album = await getAlbum(this.$route.params.id)
      this.form_data.album_name = album.name
      this.form_data.description = album.description
      this.selectedTracks = album.tracks.map((track) => track.id)
      let date = new Date(Date.parse(album.release_date)).toISOString().slice(0, 10)
      console.log(date)
      this.form_data.release_date = date
      this.imageSrc = albumImage(album.id)
    }
  }
}
</script>

<style scoped>
/* track Tile */
.track-tiles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 1rem;
  padding: 2rem 0;
}
.track-tile {
  display: grid;
  grid-template-columns: min-content min-content 1fr;
  grid-gap: 0 1rem;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 1.8rem;
  padding: 1rem 2rem;
  border-radius: 5px;
  transition: all 0.2s ease-out;

  &:hover {
    background-color: var(--color-hover);
  }

  &:hover {
    .track-tile__cover--playbutton {
      opacity: 1;
      font-size: 5rem;
    }

    .track-tile__cover--img {
      filter: brightness(0.5);
    }
    .track-tile__cover--img.selectable {
      filter: brightness(1);
    }
  }
}

.track-tile-small {
  grid-template-columns: min-content 1fr;
}

.track-tile-checkbox:checked + .track-tile-label .track-tile {
  background-color: var(--color-hover);
}

.track-tile__position {
  font-size: 1.8rem;
  font-weight: bold;
  /* color: var(--text-label-color); */
}

.track-tile__cover {
  /* width: 8.9rem; */
  height: 6rem;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  aspect-ratio: 16/9;
}

.track-tile__cover--img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.track-tile__cover--playbutton {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  color: white;
  opacity: 0;
  transition: all 0.2s ease-out;
  /* transform: scale(0.8); */
  transform-origin: center;
}

.track-tile__text {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: flex-start;
  text-overflow: ellipsis;
  overflow: hidden;

  .track-tile__text--title {
    font-weight: bold;
    font-size: 1.6rem;
    text-decoration: none;
    color: white;
    display: block;
    text-wrap: nowrap;
    text-overflow: ellipsis;

    &:hover {
      text-decoration: underline;
    }
  }

  .track-tile__text--artist {
    font-weight: lighter;
    font-size: 1.4rem;
    text-decoration: none;
    color: var(--text-subtitle-color);
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
