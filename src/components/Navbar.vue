<template>
  <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

  <v-app-bar color="background" prominent :elevation="0">
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" :elevation="0"
      ><span class="material-symbols-rounded"> menu </span>
    </v-app-bar-nav-icon>
    <v-toolbar-title>Music Streaming App</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- Icon button for search  -->
    <v-btn icon>
      <span class="material-symbols-rounded"> search </span>
    </v-btn>

    <!-- Image Button -->
    <v-btn icon>
      <v-avatar size="36" class="avatar">
        <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
      </v-avatar>
    </v-btn>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" :elevation="10" temporary class="side-nav">
    <div class="mb-small"></div>
    <v-list-item
      link
      class="sidebar__item"
      v-for="item in items"
      :key="item"
      @click.stop="navigateTo(item.link)"
    >
      <a href="/" class="sidebar__link">
        <span class="material-symbols-rounded"> {{ item.icon }} </span>
        <span class="sidebar__item--text">{{ item.title }}</span>
      </a>
    </v-list-item>
    <v-divider />
    <div class="pa-4">
      <v-btn block size="large" rounded="xl" href="#playlist-modal" class="btn mb-small">
        <span class="material-symbols-rounded"> add </span> Create Playlist
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'AppNavbar',
  data: () => ({
    drawer: false,
    items: [
      { title: 'Home', icon: 'home', link: '/' },
      { title: 'Explore', icon: 'explore', link: '/explore' },
      { title: 'Library', icon: 'library_music', link: '/library' }
    ]
  }),
  methods: {
    navigateTo(link) {
      this.$router.push(link)
    }
  }
}
</script>

<style scoped>
.avatar {
  margin: 0 2rem;
}

.sidebar {
  overflow-y: auto;
  overflow-x: hidden;
  /* width: 100%; */
  /* padding: 2rem; */
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  border-right: 1px solid var(--color-border-light);
}

.sidebar__top {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 2.5rem;
}

.sidebar-logo {
  width: 15rem;
  height: 11rem;
  mask-image: url(../images/logo.svg);
  mask-size: contain;
  mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  -webkit-mask-image: url(../images/logo.svg);
  -webkit-mask-repeat: no-repeat;
  background-color: var(--color-primary);
}

.sidebar__hr {
  margin: 2rem 0;
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--color-border-light);
}

.sidebar__item {
  width: 100%;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: white;
  transition: all 0.1s ease-out;
  border-radius: 5px;
  border: 1px solid transparent;
  padding: 1rem;
  margin: 0 1rem;

  margin-bottom: 1rem;

  &:hover {
    background-color: var(--color-hover);
  }
}

.side-nav {
  list-style: none;
  width: 100%;
}

.sidebar__item--icon {
  display: inline-block;
  padding: 0 1rem;
}

.sidebar__item--text {
  /* font-weight: 500; */
}

.sidebar__link {
  text-decoration: none;
  display: grid;
  grid-template-columns: 5rem 1fr;
  color: var(--text-color);
  width: 100%;
  align-items: center;
}
</style>
