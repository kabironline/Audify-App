<template>
  <ul class="track-list">
    <li v-for="track in 10" :key="track" class="track-item">
      <a href="/" class="track-item__link">
        <div class="track-item__cover">
          <v-img
            :src="`https://picsum.photos/200/300?random=${track}`"
            alt=""
            class="track-item__cover--img"
          />
          <i class="fas fa-play track-item__cover--playbutton"></i>
        </div>
        <span class="track-item__title">Name of Track {{ track }}</span>
        <span class="track-item__artist">Channel {{ track }}</span>
      </a>
      <div class="track-item__cta">
        <BtnIcon icon="thumb_up" class="track-item__cta" />
        <BtnIcon icon="thumb_down" class="track-item__cta" />
        <!-- <BtnIcon icon="remove" href="" class="track-item__cta-link track-item__cta--remove" /> -->
        <BtnIcon icon="add" class="track-item__cta-link track-item__cta--remove" />
      </div>
      <p class="track-item__timer">{{ track.duration }}</p>
    </li>
  </ul>
</template>

<script>
import BtnIcon from './BtnIcon.vue'

export default {
  name: 'ListTracks',
  props: {
    tracks: {
      type: Array,
      default: () => []
    },
    playlist_id: {
      type: Number,
      default: 0
    },
    author_id: {
      type: Number,
      default: 0
    }
  },
  components: { BtnIcon }
}
</script>

<style>
/* TRACK ITEM */
.track-list {
  list-style: none;
}

.track-item {
  width: 100%;
  border-bottom: 1px solid var(--color-border-light);
  display: grid;
  grid-template-columns: 1fr min-content min-content;
  align-items: center;
  text-decoration: none;
  grid-gap: 2.5rem;
  padding: 0 2rem;

  &:hover {
    background-color: var(--color-hover);
    .track-item__cover--img {
      filter: brightness(0.5);
    }

    .track-item__cover--playbutton {
      opacity: 1;
    }

    .track-item__cta .track-item__cta-link {
      opacity: 1;
    }
  }
}

.track-item__link {
  display: grid;
  grid-template-columns: 3rem 2fr max-content;
  grid-gap: 2.5rem;
  align-items: center;
  height: 5rem;
  text-decoration: none;
  color: white;
  font-size: 1.8rem;
}

.track-item__link-player {
  display: grid;
  grid-template-columns: 3rem 100fr max-content;
  grid-gap: 1rem;
}

.track-item-selected {
  background-color: var(--color-hover);
}

.track-item__cover {
  width: 3rem;
  height: 3rem;
  position: relative;
}

.track-item__cover-player {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.track-item__cover--playbutton {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  opacity: 0;
}

.track-selected {
  background-color: var(--color-hover);
}

.track-item__cover--img {
  width: 3rem;
  height: 3rem;
  object-fit: cover;
}

.track-item__title {
  text-wrap: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.track-item__artist {
  font-weight: lighter;
  color: var(--text-label-color);
}

.track-item__cta {
  display: flex;
  align-items: center;
  justify-content: center;
  /* opacity: 0; */
}

.track-item__cta-link {
  color: white;
  font-size: 1.8rem;
  opacity: 0;
}

.track-item__cta-link--active {
  opacity: 1;
}
</style>
