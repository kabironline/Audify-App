<template>
  <div class="sidebar">
    <a href="/home">
      <div class="sidebar__top">
        <div class="sidebar-logo">&nbsp;</div>
      </div>
    </a>
    <hr class="sidebar__hr" />
    <ul class="side-nav">
      <li
        v-for="item in items"
        :key="item"
        class="sidebar__item"
        :class="{ 'sidebar__item--active': item.route_name === activeItem }"
      >
        <div @click.prevent="navigateTo(item.link)" href="/" class="sidebar__link">
          <span class="material-symbols-rounded"> {{ item.icon }}</span>
          <span class="sidebar__item--text">{{ item.title }}</span>
        </div>
      </li>
    </ul>

    <hr class="sidebar__hr" />
    <a href="#playlist-modal" class="btn mb-small"> &plus; Create Playlist </a>
    <ul class="side-nav">
      <!-- {% with playlists = current_user.playlists %} {% include 'widgets/playlist_tile.html' %} {%
      endwith %} -->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppSidebar',
  data: () => ({
    drawer: false,
    items: [
      { title: 'Home', icon: 'home', link: '/', route_name: 'home' },
      { title: 'Explore', icon: 'explore', link: '/explore', route_name: 'explore' },
      { title: 'Dashboard', icon: 'dashboard', link: '/dashboard', route_name: 'dashboard' },
      { title: 'Upload Track', icon: 'upload', link: '/upload', route_name: 'upload' },
      { title: 'Create Album', icon: 'album', link: '/album/add', route_name: 'album-add' }
    ]
  }),
  computed: {
    activeItem() {
      return this.$route.name
    }
  },
  methods: {
    navigateTo(link) {
      this.$router.push(link)
    }
  }
}
</script>

<style scoped>
.sidebar {
  overflow-y: auto;
  overflow-x: hidden;
  width: 30rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  padding: 1rem 0;

  margin-bottom: 1rem;

  &:hover {
    background-color: var(--color-hover);
    border: 1px solid var(--color-border-light);
  }
}

.sidebar__item--active {
  background-color: var(--color-hover);
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
  font-weight: 500;
}

.sidebar__link {
  cursor: pointer;
  text-decoration: none;
  display: grid;
  grid-template-columns: 5rem 1fr;
  color: var(--text-color);
  width: 100%;
  padding-left: 1rem;
  align-items: center;
}
</style>
