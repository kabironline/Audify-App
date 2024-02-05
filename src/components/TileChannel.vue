<template>
  <div class="creator-tiles">
    <v-card
      v-for="n in 16"
      :key="n"
      color="transparent"
      class="creator-tile ma-1"
      :to="`/dashboard/channel/${n}`"
    >
      <v-card-title class="creator-tile__position">
        <p class="creator-tile__position--text">{{ n }}</p>
      </v-card-title>
      <v-card-media class="creator-tile__cover">
        <img
          :src="`https://picsum.photos/200?random=${n}`"
          alt="creator Image"
          class="creator-tile__cover--img"
        />
      </v-card-media>
      <v-card-title class="creator-tile__text">
        <p class="creator-tile__text--title">Channel name {{ n }}</p>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'TileChannel'
}
</script>

<style scoped>
/* creator Tile */
.creator-tiles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  padding: 2rem 0;
}
.creator-tile {
  display: grid;
  grid-template-columns: min-content min-content 1fr min-content;
  grid-gap: 2rem;
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
    .creator-tile__cover--playbutton {
      opacity: 1;
    }
  }
}

.creator-tile__position {
  font-size: 1.8rem;
  font-weight: bold;
}

.creator-tile__cover {
  width: 5rem;
  height: 5rem;
  position: relative;
  overflow: hidden;
  border-radius: 50px;
}

.creator-tile__cover--img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.creator-tile__cover--playbutton {
  font-size: 3rem;
  color: white;
  opacity: 0;
  transition: all 0.2s ease-out;
  /* transform: scale(0.8); */
  transform-origin: center;
}

.creator-tile__text {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;

  .creator-tile__text--title {
    font-weight: bold;
    font-size: 1.6rem;
    text-decoration: none;
    color: white;
    display: block;

    &:hover {
      text-decoration: underline;
    }
  }

  .creator-tile__text--artist {
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
