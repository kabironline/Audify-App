<template>
  <section class="section section-edit-profile">
    <div class="avatar-section">
      <h3 class="heading-3">Current Profile</h3>
      <br />
      <div class="avatar-container">
        <img src="https://via.placeholder.com/300" alt="Avatar" class="avatar-img" />
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
    <EditUserForm />
  </section>
</template>

<script>
import BtnAction from '@/components/BtnAction.vue'
import EditUserForm from '@/components/EditUserForm.vue'
import UserDeleteModal from '@/components/Modals/UserDeleteModal.vue'

export default {
  name: 'EditProfileView',
  data: () => ({
    deleteModalVisible: false,
    form: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    current_user: {
      nickname: 'John Doe',
      username: 'johndoe',
      bio: 'I am a music lover'
    },
    error: ''
  }),

  components: { BtnAction, UserDeleteModal, EditUserForm }
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
