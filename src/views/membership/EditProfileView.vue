<template>
  <section class="section section-edit-profile">
    <div class="avatar-section">
      <h3 class="heading-3">Current Profile</h3>
      <br />
      <div class="avatar-container">
        <img :src="current_user.avatar" alt="Avatar" class="avatar-img" />
      </div>
      <h3 class="heading-3 avatar--title">{{ current_user.nickname }}</h3>
      <h4 class="heading-4 avatar--subtitle">{{ current_user.username }}</h4>
      <p class="avatar-desc">
        {{ current_user.bio }}
      </p>
      <BtnAction
        color="dark"
        text="Delete Account"
        icon="delete"
        @click="deleteModalVisible = true"
      />
      <UserDeleteModal :visible="deleteModalVisible" @toggleVisible="deleteModalVisible = false" />
    </div>
    <EditUserForm :user="current_user"/>
  </section>
</template>

<script>
import BtnAction from '@/components/BtnAction.vue'
import EditUserForm from '@/components/EditUserForm.vue'
import UserDeleteModal from '@/components/Modals/UserDeleteModal.vue'
import { useUserStore } from '@/stores/user'
import { userAvatar } from '@/utils/http'
export default {
  name: 'EditProfileView',
  data: () => ({
    deleteModalVisible: false,
    current_user: {
      nickname: '',
      username: '',
      bio: '',
      avatar: '',
      id: '',
    },
    error: ''
  }),
  components: { BtnAction, UserDeleteModal, EditUserForm },
  created() {
    const store = useUserStore()
    this.current_user = store.getUser
    this.current_user.avatar = userAvatar(this.current_user.id)
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

.page-content {
  padding-bottom: 0;
}

.btn {
  align-self: flex-start;
}
</style>
