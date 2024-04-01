<template>
  <section class="section section-hero">
    <section class="hero" v-if="isLoading">
      <div class="hero__avatar">
        <v-skeleton-loader type="ossein" :height="200" :width="200" color="background" />
      </div>
      <div class="hero__details">
        <div class="hero__details--header">
          <div class="hero__details--header">
            <h2 class="heading-2 hero__details--title">
              <v-skeleton-loader type="text" :width="200" color="background" />
            </h2>
          </div>
        </div>
        <p class="hero__details--bio">
          <v-skeleton-loader type="paragraph" :width="400" color="background" />
        </p>
      </div>
      <div class="hero__cta">
        <v-skeleton-loader type="button" :width="100" color="background" />
      </div>
    </section>
    <section class="hero" v-else>
      <div class="hero__avatar">
        <img :src="channelAvatar(channel.id)" alt="Avatar" class="hero__avatar--img" />
      </div>
      <div class="hero__details">
        <div class="hero__details--header">
          <div class="hero__details--header">
            <h2 class="heading-2 hero__details--title">
              {{ channel.name }}
            </h2>
          </div>
        </div>
        <p class="hero__details--bio">
          {{ channel.description }}
        </p>
      </div>
      <div class="hero__cta">
        <BtnNavigation
          to="/channel/edit_profile"
          icon="edit"
          text="Edit Profile"
          v-if="isUserChannel"
        />
        <BtnAction
          text="Blacklist"
          color="dark"
          v-if="showBlacklist"
          @click="blacklistChannelHandler()"
        />
        <BtnAction
          text="Whitelist"
          color="white"
          v-if="showWhitelist"
          @click="whitelistChannelHandler()"
        />
        <BtnAction
          text="Remove Whitelist"
          color="dark"
          v-if="!showWhitelist"
          @click="removeWhitelistChannelHandler()"
        />
      </div>
    </section>
    <hr class="hr" />
  </section>
  <section class="section section-info">
    <div class="header-tiles" @click.prevent="this.$router.push(`/channel/${channel.id}/all_tracks`)">
      <div class="header-tile">
        <p class="header-tile--number">{{ info.tracks }}</p>
        <p class="header-tile--title">Total Tracks</p>
      </div>
      <div class="header-tile">
        <p class="header-tile--number">{{ info.albums }}</p>
        <p class="header-tile--title">Total Albums</p>
      </div>
      <div class="header-tile">
        <p class="header-tile--number">{{ info.views }}</p>
        <p class="header-tile--title">Total Views</p>
      </div>
    </div>
  </section>
  <section class="section section-tracks" v-show="trackIsEmpty">
    <h2 class="heading-2 mb-medium">Channel Tracks</h2>
    <CarouselTrack :tracks="tracks" />
    <BtnNavigation :to="`/channel/${channel.id}/tracks`" text="View More" v-if="moreTracks" />
  </section>
  <section class="section section-albums" v-show="albumIsEmpty">
    <h2 class="heading-2 mb-medium">Channel Albums</h2>
    <CarouselAlbum :albums="albums" />
    <BtnNavigation :to="`/channel/${channel.id}/albums`" text="View More" v-if="moreAlbums" />
  </section>
  <section class="section section-playlists" v-show="noContent">
    <h2 class="heading-2 mb-medium">Channel hasn't posted anything!</h2>
    <p>Be sure to be on the lookout.</p>
  </section>
</template>

<script>
import BtnNavigation from '@/components/BtnNavigation.vue'
import CarouselAlbum from '@/components/CarouselAlbum.vue'
import CarouselTrack from '@/components/CarouselTrack.vue'
import { useUserStore } from '@/stores/user'
import { getChannel } from '@/helper/getters'
import { channelAvatar } from '@/utils/http'
import BtnAction from '@/components/BtnAction.vue'
import { blacklistChannel, removeWhitelistChannel, whitelistChannel } from '@/api/admin'

export default {
  name: 'ChannelDashboard',
  components: { CarouselTrack, BtnNavigation, BtnAction, CarouselAlbum },
  data() {
    return {
      channel: {
        name: 'Channel Name',
        description: 'Channel Description',
        id: '0',
        blacklisted: false,
        whitelisted: false
      },
      info: {
        tracks: 0,
        albums: 0,
        views: 0
      },
      tracks: [],
      albums: [],
      moreTracks: false,
      moreAlbums: false,
      isLoading: true,
      isUserChannel: false,
      isUserAdmin: false
    }
  },
  methods: {
    channelAvatar,
    async blacklistChannelHandler() {
      const response = await blacklistChannel(this.channel.id)
      if (response) {
        this.$router.push('/')
      }
    },
    async whitelistChannelHandler() {
      const response = await whitelistChannel(this.channel.id)
      if (response) {
        this.channel.whitelisted = true
      }
    },
    async removeWhitelistChannelHandler() {
      const response = await removeWhitelistChannel(this.channel.id, true)
      if (response) {
        this.channel.whitelisted = false
      }
    }
  },
  computed: {
    albumIsEmpty() {
      return this.isLoading ? true : this.albums.length
    },
    trackIsEmpty() {
      return this.isLoading ? true : this.tracks.length
    },
    noContent() {
      return !this.albums.length && !this.tracks.length && !this.isLoading
    },
    showBlacklist() {
      return this.isUserAdmin && !this.channel.blacklisted && !this.channel.whitelisted
    },
    showWhitelist() {
      return this.isUserAdmin && !this.channel.whitelisted
    },
    showRemoveWhitelist() {
      return this.isUserAdmin && this.channel.whitelisted
    }
  },
  beforeMount() {
    // get the channel id from the route params
    const channelId = this.$route.params.channelId
    this.isUserAdmin = useUserStore().isAdmin
    getChannel(channelId, true).then((res) => {
      if (res.channel.blacklisted) {
        this.$router.push('/')
      }
      this.channel = res.channel
      this.info = res.info
      this.tracks = res.tracks.slice(0, 5)
      this.albums = res.albums.slice(0, 5)
      this.moreTracks = res.tracks.length > 5
      this.moreAlbums = res.albums.length > 5
      this.isLoading = false
    })

    const store = useUserStore()
    this.isUserChannel = store.getUserChannel?.id == channelId
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
