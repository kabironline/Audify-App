<template>
  <v-list-item
    class="sidebar__item"
    :class="{ 'sidebar__item--active': item.route_name === activeItem }"
    link
    color="primary"
    @click.prevent="navigateTo(item.link)"
  >
    <template v-slot:prepend>
      <span class="material-symbols-rounded"> {{ item.icon }}</span>
    </template>
    <v-list-item-title class="sidebar__item--text"> {{ item.title }}</v-list-item-title>
  </v-list-item>
</template>

<script>
export default {
  name: 'SidebarListItem',
  props: {
    item: Object
  },
  computed: {
    activeItem() {
      return this.$route.name
    }
  },
  methods: {
    navigateTo(link) {
      this.$router.push(link)
    }
  }
}
</script>

<style scoped>
.sidebar__item {
  width: 100%;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: white;
  transition: all 0.1s ease-out;
  border-radius: 5px;
  border: 1px solid transparent;
  padding: 1rem 1rem;

  margin-bottom: 1rem;

  &:hover {
    background-color: var(--color-hover);
    border: 1px solid var(--color-border-light);
  }
}

.sidebar__item--active {
  background-color: var(--color-hover);
}

.sidebar__item--icon {
  display: inline-block;
  padding: 0 1rem;
}

.sidebar__item--text {
  font-weight: 500;
  font-size: 2rem;
  margin-left: 2rem;
  line-height: normal;
}

.sidebar__link {
  cursor: pointer;
  text-decoration: none;
  display: grid;
  grid-template-columns: 5rem 1fr;
  color: var(--text-color);
  width: 100%;
  padding-left: 1rem;
  align-items: center;
}
</style>
