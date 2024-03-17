<template>
  <section id="section section-statistics">
    <div class="admin-dashboard__header mb-medium">
      <h1 class="heading-1">Admin Dashboard</h1>
    </div>
    <div class="header-tiles">
      <div class="header-tile">
        <p class="header-tile--number">{{ users }}</p>
        <p class="header-tile--title">Total Users</p>
      </div>
      <div class="header-tile">
        <p class="header-tile--number">{{ channels }}</p>
        <p class="header-tile--title">Total Channels</p>
      </div>
      <div class="header-tile">
        <p class="header-tile--number">{{ playlists }}</p>
        <p class="header-tile--title">Total Playlists</p>
      </div>
      <div class="header-tile">
        <p class="header-tile--number">{{ albums }}</p>
        <p class="header-tile--title">Total Albums</p>
      </div>
      <div class="header-tile">
        <p class="header-tile--number">{{ genres }}</p>
        <p class="header-tile--title">Total Genres</p>
      </div>
      <div @click.prevent="navigateTo('/admin/tracks')">
        <div class="header-tile">
          <p class="header-tile--number">{{ tracks }}</p>
          <p class="header-tile--title">Total Tracks</p>
        </div>
      </div>
      <div>
        <div class="header-tile" @click.prevent="navigateTo('/admin/blacklist')">
          <p class="header-tile--number">{{ blacklisted_channels }}</p>
          <p class="header-tile--title">Blacklisted Channels</p>
        </div>
      </div>
      <a href="/admin/dashboard/whitelist">
        <div class="header-tile">
          <p class="header-tile--number">{{ whitelisted_channels }}</p>
          <p class="header-tile--title">Whitelisted Channels</p>
        </div>
      </a>
    </div>
    <h3 class="heading-3">Graphical Overview</h3>
    <div class="graph-container">
      <div class="graph-container__graph">
        <div id="genre_distribution_graph"></div>
      </div>
      <div class="graph-container__graph">
        <div id="user_channel_distribution_graph"></div>
      </div>
      <div class="graph-container__graph graph-container__graph-main">
        <div id="genre_listener_graph"></div>
      </div>
      <div class="graph-container__graph">
        <div id="viewership_graph"></div>
      </div>
    </div>
  </section>
</template>

<script>
import { getAdminDashboardGraphs, getAdminDashboardNumbers } from '@/api/admin'
import { toRaw } from 'vue'
export default {
  name: 'AdminDashboard',
  components: {},
  data() {
    return {
      tracks: 0,
      users: 0,
      channels: 0,
      genres: 0,
      playlists: 0,
      albums: 0,
      blacklisted_channels: 0,
      whitelisted_channels: 0,
      genre_distribution_graph: '',
      user_channel_distribution_graph: '',
      genre_listener_graph: '',
      viewership_graph: ''
    }
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path)
    }
  },
  async created() {
    getAdminDashboardNumbers().then((response) => {
      this.tracks = response.tracks
      this.users = response.users
      this.channels = response.channels
      this.playlists = response.playlists
      this.albums = response.albums
      this.genres = response.genres
      this.blacklisted_channels = response.blacklisted_channels
      this.whitelisted_channels = response.whitelisted_channels
      this.genre_distribution_graph = response.genre_distribution_graph
    })

    getAdminDashboardGraphs().then((response) => {
      let data = [toRaw(response.genre_distribution_graph)]
      let layout = { title: 'Genre Distribution' }
      Plotly.newPlot('genre_distribution_graph', data, layout)

      data = [toRaw(response.user_channel_distribution_graph)]
      layout = { title: 'User Channel Distribution' }
      Plotly.newPlot('user_channel_distribution_graph', data, layout)

      data = [toRaw(response.genre_listener_graph)]
      layout = { title: 'Genre Listener Graph' }
      Plotly.newPlot('genre_listener_graph', data, layout)

      data = [toRaw(response.viewership_graph)]
      console.log(data)
      layout = { title: 'Viewership Graph' }
      Plotly.newPlot('viewership_graph', data, layout)
    })
  }
}
</script>

<style>
.section-statistics {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.graph-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
}

.graph-container__graph-main {
  grid-column: 1 / -1;
  grid-row: 1/2;
}
</style>
