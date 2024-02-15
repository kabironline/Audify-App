<template>
  <div class="sidebar">
    <a href="/home">
      <div class="sidebar__top">
        <div class="sidebar-logo">&nbsp;</div>
      </div>
    </a>
    <hr class="sidebar__hr" />
    <div class="side-nav">
      <SidebarListItem v-for="item in items" :key="item.title" :item="item" />
    </div>

    <hr class="sidebar__hr" />
    <BtnAction icon="add" text="Create Playlist" color="white" />
    <ul class="side-nav"></ul>
  </div>
</template>

<script>
import BtnAction from './BtnAction.vue'
import SidebarListItem from './SidebarListItem.vue'
export default {
  name: 'AppSidebar',
  components: {
    SidebarListItem,
    BtnAction
  },
  data: () => ({
    drawer: false,
    items: [
      { title: 'Home', icon: 'home', link: '/', route_name: 'home' },
      { title: 'Explore', icon: 'explore', link: '/explore', route_name: 'explore' },
      { title: 'Dashboard', icon: 'dashboard', link: '/dashboard', route_name: 'dashboard' },
      { title: 'Upload Track', icon: 'upload', link: '/upload', route_name: 'upload' },
      { title: 'Create Album', icon: 'album', link: '/album/create', route_name: 'album-add' }
    ]
  })
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

.side-nav {
  list-style: none;
  width: 100%;
}
</style>
