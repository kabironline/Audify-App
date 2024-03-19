<template>
  <section class="section section-edit-profile">
    <div class="avatar-section">
      <h3 class="heading-3">Current Profile</h3>
      <br />
      <div class="avatar-container">
        <img :src="channelAvatar(channel.id)" alt="Avatar" class="avatar-img" />
      </div>
      <h3 class="heading-3 avatar--title">{{ channel.name }}</h3>
      <p class="avatar-desc">
        {{ channel.description }}
      </p>
      <BtnAction
        color="dark"
        text="Delete Account"
        icon="delete"
        @click.prevent="deleteModalVisible = true"
      />
      <ChannelDeleteModal
        :visible="deleteModalVisible"
        @toggleVisible="deleteModalVisible = false"
      />
    </div>
    <EditChannelForm :channel="channel" :channelAvatar/>
  </section>
</template>

<script>
import BtnAction from '@/components/BtnAction.vue'
import EditChannelForm from '@/components/EditChannelForm.vue'
import ChannelDeleteModal from '@/components/Modals/ChannelDeleteModal.vue'
import { useUserStore } from '@/stores/user'
import { channelAvatar } from '@/utils/http'


export default {
  name: 'EditProfileView',
  data: () => ({
    deleteModalVisible: false,

    channel: {
      name: '',
      description: ''
    },
    error: ''
  }),
  components: { BtnAction, ChannelDeleteModal, EditChannelForm },
  methods: {
    channelAvatar,
  },
  mounted() {
    const store = useUserStore()
    const channel = store.getUserChannel
    if (!channel) {
      this.$router.push('/channel/create')
    }

    this.channel = channel
  }
}
</script>

<style scoped>
.section-edit-profile {
  display: grid;
  grid-template-columns: 50rem 1fr;
  gap: 2rem;
}

.avatar-section {
  background-color: var(--color-background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  padding: 4rem;
  border-radius: 1rem;
  border: 1px solid var(--color-border-light);
  box-shadow: 0 0 100px -29px var(--color-border-light);
  height: 75%;
}

.avatar-container {
  position: relative;
  width: fit-content;
  align-self: center;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.avatar-container--editable {
  /* display: flex;
  justify-content: center;
  align-items: center; */
  width: 100%;
  &:hover {
    cursor: pointer;

    .avatar-img {
      filter: blur(5px) brightness(0.5);
    }

    .avatar-edit {
      display: block;
      transform: translate(-50%, -50%) scale(1);
    }
  }
}

.avatar-img {
  border-radius: 50%;
  height: 20rem;
  width: 20rem;
  object-fit: cover;
  transition: all 0.1s ease-in-out;
}

.avatar-edit {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  transition: all 0.2s ease-in-out;
}

.form__container {
  padding: 0;
}

.page-content {
  padding-bottom: 0;
}

.btn {
  align-self: flex-start;
}
</style>
