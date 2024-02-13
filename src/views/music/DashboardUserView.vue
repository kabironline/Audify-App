<template>
  <section class="section section-hero">
    <section class="hero">
      <div class="hero__avatar">
        <!-- TODO: Add Avatar in the databases -->
        <img src="https://www.picsum.photos/200/200" alt="Avatar" class="hero__avatar--img" />
      </div>
      <div class="hero__details">
        <div class="hero__details--header">
          <div class="hero__details--header">
            <h2 class="heading-2 hero__details--title">
              {{ user.nickname }}
            </h2>
            <p class="hero__details--subtitle">@{{ user.username }}</p>
          </div>
        </div>
        <p class="hero__details--bio">
          {{ userBio }}
        </p>
      </div>
      <div class="hero__cta">
        <BtnNavigation to="/edit_profile" icon="edit" text="Edit Profile" />
      </div>
    </section>
    <hr class="hr" />
  </section>
  <section class="section section-recents">
    <h2 class="heading-2 mb-medium">Recently Played</h2>
    <ListTracks />
  </section>
  <section class="section section-playlists">
    <h2 class="heading-2 mb-medium">User Playlists</h2>
    <TilePlaylist />
  </section>
</template>

<script>
import BtnNavigation from '@/components/BtnNavigation.vue'
import ListTracks from '@/components/ListTracks.vue'
import TilePlaylist from '@/components/TilePlaylist.vue'

export default {
  name: 'DashboardUser',
  computed: {
    userBio() {
      return this.user.bio ? this.user.bio : `Welcome to the channel of ${this.user.nickname}`
    }
  },
  data() {
    return {
      user: {
        nickname: 'John Doe',
        username: 'johndoe',
        bio: 'Welcome to the channel of John Doe'
      }
    }
  },
  components: { BtnNavigation, ListTracks, TilePlaylist }
}
</script>

<style>
.hero {
  display: grid;
  grid-template-columns: 20rem 1fr max-content;
  grid-template-rows: 1fr;
  grid-gap: 2rem;
  align-items: center;
  margin-bottom: 3rem;
}
.hero__avatar {
  height: 20rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  font-size: 12rem;
}

.hero__avatar--img {
  height: 100%;
  border-radius: 100%;
  width: 100%;
  object-fit: cover;
}

.hero__details {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content min-content;
  grid-gap: 1rem;
}

.hero__details--header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.hero__details--title {
  font-size: 5rem;
  font-weight: bold;
}

.hero__details--subtitle {
  font-size: 1.8rem;
  font-weight: lighter;
  color: var(--text-subtitle-color);
}

.hero__cta {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: flex-start;
}
</style>
