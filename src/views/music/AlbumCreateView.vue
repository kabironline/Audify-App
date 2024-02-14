<template>
  <section class="section section-upload">
    <h2 class="heading-2">Create an Album</h2>
    <form
      class="form__container form__container--track"
      action="/album/add"
      method="post"
      enctype="multipart/form-data"
    >
      <div>
        <div class="form__group">
          <input
            type="text"
            minlength="1"
            maxlength="50"
            name="title"
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
              required
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
              :value="track.id"
            />
            <label :for="`track-tile-${track.id}`" class="track-tile-label">
              <div class="track-tile track-tile-small">
                <!-- Add postion of the track in the top charts -->
                <div class="track-tile__cover">
                  <div>
                    <img
                      :src="`https://picsum.photos/640/360?random=${track.id}`"
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
          {% endfor %}
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
  name: 'AlbumCreate',
  data: () => ({
    imageSrc: '',
    error: ''
  }),
  methods: {
    handleCoverImage(event) {
      const file = event.target.files[0]
      if (!file) {
        return
      }
      const src = URL.createObjectURL(file)
      this.imageSrc = src
      console.log(this.imageSrc)
    }
  },
  computed: {
    tracks() {
      let list = []
      for (let i = 0; i < 25; i++) {
        list.push({
          id: i,
          name: `Track ${i}`,
          channel: {
            name: `Channel ${i}`
          }
        })
      }
      return list
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
