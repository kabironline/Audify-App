<template>
  <nav class="navbar">
    <form action="/search" method="get" class="search-container">
      <div class="search">
        <input
          type="text"
          name="q"
          placeholder="Enter Search Terms"
          value=""
          class="search--bar"
          autocomplete="off"
        />
        <button type="submit" value="Search" class="search--button">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </form>
    <div class="profile-icon-container">
      <v-menu location="start" activator="#main-menu-activator">
        <v-list>
          <v-list-item
            link
            v-for="item in menuItems"
            :key="item.title"
            class="dropdown-item"
            @click.prevent="navigateTo(item.link)"
          >
            <v-list-item-title class="dropdown-item--link">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn icon transparent id="main-menu-activator" for="profile" class="navbar__profile">
        <v-img
          src="https://via.placeholder.com/100
        "
          alt="Profile Image"
          class="navbar__profile--image"
        />
      </v-btn>
    </div>
    <a class="navbar__profile" href="/dashboard"> </a>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  data: () => ({
    menuItems: [
      { title: 'Dashboard', link: '/dashboard' },
      { title: 'Channel Dashboard', link: '/channel/dashboard' },
      { title: 'Admin Dashboard', link: '/admin/dashboard' },
      { title: 'Edit Profile', link: '/edit_profile' },
      { title: 'Register as Creator', link: '/register_channel' },
      { title: 'Edit Channel', link: '/channel/edit_profile' },
      { title: 'Logout', link: '#logout-modal' }
    ]
  }),
  methods: {
    logout() {
      this.$router.push('/login')
      console.log('Logging out')
    },
    navigateTo(route) {
      this.$router.push(route)
    }
  }
}
</script>

<style>
.v-menu > .v-overlay__content > .v-card,
.v-menu > .v-overlay__content > .v-sheet,
.v-menu > .v-overlay__content > .v-list {
  background: transparent !important;
  backdrop-filter: blur(20px) brightness(0.5) !important;
  border: 1px solid var(--color-border-light) !important;
}

.navbar {
  display: grid;
  grid-template-columns: 1fr 7rem;
  grid-template-rows: 1fr;
  align-items: center;
  grid-column: 2;
  position: sticky;
  height: 7rem;
  top: 0;
  z-index: 100;
}

.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  backdrop-filter: blur(20px) brightness(0.5);
}

.search {
  border: 1px solid var(--color-border-light);
  border-radius: 3rem;
}

.search--bar {
  height: 3.5rem;
  max-width: 50rem;
  min-width: 20rem;
  width: 20vw;
  background-color: transparent;
  border: none;
  padding: 0 2rem;
  margin: 0;
  font: inherit;
  transition: all 0.2s ease-out;
  color: white;

  &:active,
  &:focus,
  &:hover:focus {
    outline: none;
    width: 25vw;
  }

  &:hover {
    width: 22vw;
  }

  &::placeholder {
    color: var(--text-placeholder-color);
  }
}

.profile-icon-container {
  background-color: var(--color-background);
}

.search--button {
  margin: 0;
  height: 3.5rem;
  font: inherit;
  background-color: transparent;
  border: none;
  color: white;
  padding: 0 2rem;
}

.profile-icon__checkbox {
  display: none;

  &:checked ~ .profile-dropdown-container {
    display: block;
    height: auto;
  }
}

.profile-dropdown-container {
  display: none;
  position: absolute;
  top: 4rem;
  right: 4rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border-light);
  padding: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  z-index: 101;
  height: 0%;
  transition: all 0.2s ease-out;
  background-color: transparent;
  backdrop-filter: blur(20px) brightness(0.5);
}

.dropdown-list {
  list-style: none;
}

.dropdown-item {
  padding: 1rem;
  color: white;

  cursor: pointer;
  border-radius: 5px;
  transition: all 0.2s ease-out;
  margin-bottom: 1rem;

  &:hover .dropdown-item--link {
    color: var(--color-primary);
  }
}

.dropdown-item--link {
  font-size: 1.5rem !important;
  text-decoration: none;
  color: white;
  transition: all 0.2s ease-out;
}

.navbar__profile {
  text-decoration: none;
  color: white;
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar__profile--image {
  width: 4rem;
  height: 4rem;
  margin: 0;
  border-radius: 50%;
  outline-offset: 0px;
  outline: 3px solid transparent;
  transition: all 0.2s ease-out;

  &:hover {
    outline: 3px solid white;
    outline-offset: 5px;
  }
}
</style>
