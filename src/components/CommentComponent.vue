<template>
  <div class="comment-container">
    <div class="comment-header">
      <div class="comment-user-info">
        <img :src="userAvatar(comment.user.id)" class="comment-user-img" />
        <p class="comment-user-name">{{ comment.user.nickname }}</p>
      </div>
      <div>
        <BtnIcon icon="delete" :action="deleteComment" v-if="comment.user.id == userId" />
      </div>
    </div>
    <div class="comment-body">
      <p>
        {{ comment.comment }}
      </p>
    </div>
  </div>
</template>

<script>
import BtnIcon from './BtnIcon.vue'
import { userAvatar } from '@/utils/http'
export default {
  name: 'CommentComponent',
  components: {
    BtnIcon
  },
  props: {
    comment: {
      type: Object
    },
    userId: {
      type: Number
    }
  },
  methods: {
    userAvatar,
    deleteComment() {
      this.$emit('deleteComment', this.comment.id)
    }
  }
}
</script>

<style>
.comment-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.comment-header {
  display: flex;
  justify-items: space-between;
  align-items: center;
}

.comment-user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.comment-user-img {
  height: 4rem;
  width: 4rem;
  object-fit: cover;
  border-radius: 50%;
}
.comment-user-name {
  font-size: 2rem;
}
.comment-body {
  padding: 0.5rem;

  p {
    font-size: 1.5rem;
  }
}
</style>
