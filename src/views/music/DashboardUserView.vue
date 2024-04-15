<template>
  <section class="section section-hero">
    <section class="hero">
      <div class="hero__avatar">
        <img :src="userAvatar(user.id)" alt="Avatar" class="hero__avatar--img" />
      </div>
      <div class="hero__details">
        <div class="hero__details--header">
          <div class="hero__details--header">
            <h2 class="heading-2 hero__details--title">
              {{ user.nickname }}
            </h2>
          </div>
        </div>
        <p class="hero__details--bio">
          {{ userBio }}
        </p>
      </div>
      <div class="hero__cta">
        <BtnNavigation to="/edit_profile" icon="edit" text="Edit Profile" v-if="isUserDashboard" />
      </div>
    </section>
    <hr class="hr" />
  </section>
  <section class="section section-recents" v-show="showRecents">
    <h2 class="heading-2 mb-medium">Recently Played</h2>
    <ListTracks :tracks="userRecents" @updateRating="updateRating" />
  </section>
  <section class="section section-playlists" v-show="showPlaylists">
    <h2 class="heading-2 mb-medium">User Playlists</h2>
    <TilePlaylist :playlists="userPlaylists" />
  </section>
  <section class="section section-playlists" v-show="noContent">
    <h2 class="heading-2 mb-medium">User hasn't been active!</h2>
  </section>
</template>

<script>
import BtnNavigation from '@/components/BtnNavigation.vue'
import ListTracks from '@/components/ListTracks.vue'
import TilePlaylist from '@/components/TilePlaylist.vue'
import { getUserPlaylists } from '@/api/playlist'
import { getUserRecents, getUser } from '@/helper/getters'
import { useUserStore } from '@/stores/user'
import { mapState } from 'pinia'
import { userAvatar } from '@/utils/http'
export default {
  name: 'DashboardUser',
  computed: {
    ...mapState(useUserStore, ['getUser']),
    userBio() {
      return this.user.bio ? this.user.bio : `Welcome to the channel of ${this.user.nickname}`
    },
    noContent() {
      return !this.userRecents.length && !this.userPlaylists.length && !this.isLoading
    },
    showRecents() {
      return this.isLoading ? true : this.userRecents.length
    },
    showPlaylists() {
      return this.isLoading ? true : this.userPlaylists.length
    },
    isUserDashboard() {
      return this.$route.params.userId == this.getUser.id
    }
  },
  data() {
    return {
      user: {
        nickname: '',
        username: '',
        bio: ''
      },
      userRecents: [],
      userPlaylists: [],
      isLoading: true
    }
  },
  methods: {
    userAvatar,
    updateRating(index, new_rating) {
      this.userRecents[index].rating = new_rating
    }
  },
  components: { BtnNavigation, ListTracks, TilePlaylist },
  async beforeMount() {
    const userId = this.$route.params.userId
    if (userId == this.getUser.id) {
      this.user = this.getUser
    } else {
      this.user = await getUser(userId)
      if (!this.user) {
        this.$router.push('/404')
      }
    }

    // Fetch user recents
    getUserRecents(userId, 10).then((recents) => {
      this.userRecents = recents
    })
    getUserPlaylists(userId, 10).then((userPlaylists) => {
      this.userPlaylists = userPlaylists
      this.isLoading = false
    })
  }
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
