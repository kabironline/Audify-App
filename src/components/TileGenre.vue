<template>
  <div class="genre-tiles">
    <v-skeleton-loader
      v-show="!genres.length"
      v-for="genre in 10"
      :key="genre"
      class="genre-tile"
      type="chip"
      color="var(--color-background-light)"
    />
    <v-chip
      v-for="genre in genres"
      :key="genre.id"
      class="genre-tile genre__link"
      color="background"
      :to="`/genre/${genre.id}/tracks`"
    >
      <div :style="{ backgroundColor: genre.color }" class="genre-tile__cover"></div>
      <p class="genre-tile__text">{{ genre.name }}</p>
    </v-chip>
  </div>
</template>

<script>
export default {
  name: 'TileGenre',
  props: {
    genres: {
      type: Array,
      default: () => []
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
