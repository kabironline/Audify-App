<template>
  <section id="section section-blacklisted">
    <div class="admin-dashboard__header mb-medium">
      <h1 class="heading-1">Blacklisted Users</h1>
    </div>
    <div class="admin-dashboard__table" v-if="channels.length">
      <table class="table">
        <thead>
          <tr>
            <th>Channel Name</th>
            <th>Channel ID</th>
            <th>Blacklisted By</th>
            <th>Blacklisted On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(channel, index) in channels" :key="channel.id">
            <td>{{ channel.name }}</td>
            <td>{{ channel.id }}</td>
            <td>
              <p @click="navigateTo(`/dashboard/${channel.id}`)">
                @{{ channel.blacklisted_by.username }}
              </p>
            </td>
            <td>{{ channel.last_modified_at }}</td>
            <td>
              <BtnAction
                text="Remove Blacklist"
                color="dark"
                @click="removeBlacklistChannelHandler(channel.id, index)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="admin-dashboard__empty" v-else>
      <p class="admin-dashboard__empty--text">No blacklisted channels.</p>
    </div>
  </section>
</template>

<script>
import { getBlacklistedChannels, removeBlacklistChannel } from '@/api/admin'
import BtnAction from '@/components/BtnAction.vue'

export default {
  name: 'BlacklistView',
  components: { BtnAction },
  data() {
    return {
      channels: []
    }
  },
  methods: {
    async removeBlacklistChannelHandler(channelId, index) {
      const response = await removeBlacklistChannel(channelId)
      if (response) {
        this.channels.splice(index, 1)
      }
    },
    navigateTo(path) {
      this.$router.push(path)
    }
  },
  async mounted() {
    const response = await getBlacklistedChannels()
    console.log(response)
    this.channels = response
  }
}
</script>
