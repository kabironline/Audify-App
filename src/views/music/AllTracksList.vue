<template>
  <section class="section section-new-tracks">
    <h2 class="heading-2 mb-medium">
      {{ title }}
    </h2>
    <table class="table">
      <thead>
        <tr>
          <th>Track Name</th>
          <th>Track ID</th>
          <th>Published On</th>
          <th>Channel Name, Channel ID</th>
          <th>Duration</th>
          <th>Views</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(track, index) in all_tracks" :key="track">
          <td>
            <p @click="playIndividualTrack(track)">{{ track.name }}</p>
          </td>
          <td>{{ track.id }}</td>
          <td>{{ track.created_at }}</td>
          <td>
            <p @click="navigate(`/channel/${track.channel.id}/dashboard`)">
              {{ track.channel.name }}, {{ track.channel.id }}
            </p>
          </td>
          <td>{{ formatDuration(track.duration) }}</td>
          <td>{{ track.views }}</td>
          <td>
            <BtnIcon
              v-if="flag"
              icon="flag"
              :variant="track.flagged ? 'flat' : 'text'"
              :color="track.flagged ? 'primary' : 'white'"
              @click="
                track.flagged
                  ? unflagTrackHandler(track.id, index)
                  : flagTrackHandler(track.id, index)
              "
            />
            <BtnIcon v-if="edit" icon="edit" @click="editTrack(track.id)" />
            <BtnIcon
              v-if="del"
              icon="delete"
              class="btn btn--secondary"
              @click="(trackDeleteModalVisible = true), (selectedTrackId = track.id)"
            />
            <TrackDeleteModal
              :trackId="selectedTrackId"
              :visible="trackDeleteModalVisible"
              @deleteTrack="trackDeleted(trackid)"
              @toggleVisible="trackDeleteModalVisible = $event"
            />
          </td>
        </tr>
      </tbody>
      <p v-if="!all_tracks.length" class="no-tracks">No tracks found</p>
    </table>
  </section>
</template>

<script>
import { getAdminAllTracks, unflagTrack } from '@/api/admin'
import BtnIcon from '@/components/BtnIcon.vue'
import { formatDuration } from '@/helper/format'
import { usePlayerStore } from '@/stores/player'
import { mapActions } from 'pinia'
import { flagTrack } from '@/api/admin'
import { getAllChannelTracks } from '@/api/channel'
import { useUserStore } from '@/stores/user'
import TrackDeleteModal from '@/components/Modals/TrackDeleteModal.vue'
export default {
  name: 'AllTracksList',
  components: {
    BtnIcon,
    TrackDeleteModal
  },
  data: () => ({
    title: '',
    all_tracks: [],
    edit: false,
    del: false,
    flag: false,
    selectedTrackId: null,
    trackDeleteModalVisible: false
  }),
  methods: {
    ...mapActions(usePlayerStore, ['playIndividualTrack']),
    formatDuration,
    navigate(path) {
      this.$router.push(path)
    },
    async flagTrackHandler(trackId, index) {
      const response = await flagTrack(trackId)
      if (response) {
        this.all_tracks[index].flagged = true
      }
    },
    async unflagTrackHandler(trackId, index) {
      const response = await unflagTrack(trackId)
      if (response) {
        this.all_tracks[index].flagged = false
      }
    },
    trackDeleted(trackId) {
      this.trackDeleteModalVisible = true
      // remove the track from the list
      this.all_tracks = this.all_tracks.filter((track) => track.id !== trackId)
    },
    editTrack(trackId) {
      this.$router.push(`/track/${trackId}/edit`)
    }
  },
  async mounted() {
    const store = useUserStore()
    if (this.$route.name === 'admin-tracks') {
      if (!store.isAdmin) {
        this.$router.push('/')
      }
      this.title = 'All Tracks'
      this.edit = false
      this.del = false
      this.flag = true
      const response = await getAdminAllTracks()
      // sort the tracks by trackid and if it is flagged
      response.sort((a, b) => {
        if (a.flagged && !b.flagged) {
          return -1
        }
        if (!a.flagged && b.flagged) {
          return 1
        }
        return a.id - b.id
      })
      this.all_tracks = response
    } else if (this.$route.name === 'channel-all-tracks') {
      if (store.getUserChannel.id != this.$route.params.channelId) {
        this.$router.push('/')
      }
      this.title = 'All Tracks'
      this.edit = true
      this.del = true
      this.flag = false
      const channelId = this.$route.params.channelId
      const response = await getAllChannelTracks(channelId)
      this.all_tracks = response
    }
  }
}
</script>
