<template>
  <div class="genre-tiles">
    <!-- <a
      v-for="genre in 25"
      :key="genre"
      href="/genre/{{genre}}/tracks"
      class="genre-tile genre__link"
    >
      <div :style="{ backgroundColor: randomColor() }" class="genre-tile__cover"></div>
      <p class="genre-tile__text">Genre {{ genre }}</p>
    </a>
  </div> -->
    <v-chip
      v-for="genre in 20"
      :key="genre"
      variant=""
      class="genre-tile genre__link"
      color="white"
      href="/genre/{{genre}}/tracks"
    >
      <div :style="{ backgroundColor: randomColor() }" class="genre-tile__cover"></div>
      <p class="genre-tile__text">Genre {{ genre }}</p>
    </v-chip>
  </div>
</template>

<script>
export default {
  name: 'TileGenre',
  methods: {
    randomColor() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16)
    }
  }
}
</script>

<style scoped>
/* Genre Tiles */
.genre-tiles {
  display: flex;
  flex-wrap: wrap;
  padding: 2rem 0;
  gap: 2rem;
}

.genre-tile {
  font-size: 1.5rem;
  display: inline-flex;
  /* gap: 1rem; */
  align-items: center;
  background-color: var(--color-background-light);
  padding: 0 2rem;
  padding-left: 0;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  height: 5rem;
  padding: 2rem;
  text-decoration: none;

  &:hover {
    .genre-tile__cover {
      width: 1.5rem;
    }
  }
}

.genre-tile__cover {
  width: 0.7rem;
  height: 5rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.2s ease-out;
}

.genre-tile__text {
  font-size: 1.6rem;
  text-decoration: none;
  color: var(--color-text);
}
</style>
