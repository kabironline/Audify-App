<template>
  <section class="section section-hero">
    <section class="hero">
      <div class="hero__avatar">
        <!-- TODO: Add Avatar in the databases -->
        <img src="https://www.picsum.photos/200/200" alt="Avatar" class="hero__avatar--img" />
      </div>
      <div class="hero__details">
        <div class="hero__details--header">
          <div class="hero__details--header">
            <h2 class="heading-2 hero__details--title">
              {{ user.nickname }}
            </h2>
            <p class="hero__details--subtitle">@{{ user.username }}</p>
          </div>
        </div>
        <p class="hero__details--bio">
          {{ userBio }}
        </p>
      </div>
      <div class="hero__cta">
        <BtnNavigation to="/edit-profile" icon="edit" text="Edit Profile" />
      </div>
    </section>
    <hr class="hr" />
  </section>
  <section class="section section-tracks">
    <h2 class="heading-2 mb-medium">Channel Tracks</h2>
    <CarouselTrack />
    <BtnNavigation to="/channel/dashboard/tracks" text="View More" />
  </section>
  <section class="section section-albums">
    <h2 class="heading-2 mb-medium">Channel Albums</h2>
    <CarouselTrack />
    <BtnNavigation to="/channel/dashboard/albums" text="View More" />
  </section>
</template>

<script>
import BtnNavigation from '@/components/BtnNavigation.vue'
import CarouselTrack from '@/components/CarouselTrack.vue'

export default {
  name: 'ChannelDashboard',
  data() {
    return {
      user: { nickname: 'Jhon Denver Offical', username: 'jhondenver_1' },
      userBio: 'This is the official account of jhon denver'
    }
  },
  components: { CarouselTrack, BtnNavigation }
}
</script>

<style></style>
