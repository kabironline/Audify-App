<template>
  <section id="section section-blacklisted">
    <div class="admin-dashboard__header mb-medium">
      <h1 class="heading-1">Whitelisted Users</h1>
    </div>
    <div class="admin-dashboard__table" v-if="channels.length">
      <table class="table">
        <thead>
          <tr>
            <th>Channel Name</th>
            <th>Channel ID</th>
            <th>Whitelisted By</th>
            <th>Whitelisted On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(channel, index) in channels" :key="channel.id">
            <td>{{ channel.name }}</td>
            <td>{{ channel.id }}</td>
            <td>
              <p @click="navigateTo(`/dashboard/${channel.id}`)">
                @{{ channel.whitelisted_by.username }}
              </p>
            </td>
            <td>{{ channel.last_modified_at }}</td>
            <td>
              <BtnAction
                text="Remove Whitelist"
                color="dark"
                @click="removeWhitelistChannelHandler(channel.id, index)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="admin-dashboard__empty" v-else>
      <p class="admin-dashboard__empty--text">No whitelisted channels.</p>
    </div>
  </section>
</template>

<script>
import { getWhitelistedChannels, removeWhitelistChannel } from '@/api/admin'
import BtnAction from '@/components/BtnAction.vue'

export default {
  name: 'WhitlistView',
  components: { BtnAction },
  data() {
    return {
      channels: []
    }
  },
  methods: {
    async removeWhitelistChannelHandler(channelId, index) {
      const response = await removeWhitelistChannel(channelId)
      if (response) {
        this.channels.splice(index, 1)
      }
    }
  },
  async mounted() {
    const response = await getWhitelistedChannels()
    console.log(response)
    this.channels = response
  }
}
</script>
