<template>
  <div class="comment-container">
    <div class="comment-header">
      <div class="comment-user-info">
        <img src="https://picsum.photos/200" class="comment-user-img" />
        <p class="comment-user-name">Comment User Name</p>
      </div>
      <div>
        <BtnIcon icon="delete" />
      </div>
    </div>
    <div class="comment-body">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </div>
  </div>
</template>

<script>
import BtnIcon from './BtnIcon.vue'
export default {
  name: 'CommentComponent',
  components: {
    BtnIcon
  },
  props: {
    comment: {
      type: Object
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
