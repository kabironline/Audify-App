<template>
  <v-dialog v-model="dialog" max-width="450" persistent>
    <v-card
      style="
        background-color: transparent;
        backdrop-filter: blur(20px) brightness(0.5);
        border: 1px solid white;
        border-radius: 1rem;
        padding: 2rem;
      "
    >
      <v-card-title>
        <p class="heading-4">Add Track to Playlist</p>
      </v-card-title>
      <br />
      <div class="modal-form-group pb-2" v-for="playlist in playlists" :key="playlist.id">
        <input
          type="checkbox"
          name="playlist"
          :id="playlist.id"
          v-model="selectedPlaylists"
          :value="playlist.id"
          class="modal-form__checkbox checkbox-disable"
        />
        <label :for="playlist.id" class="modal-form__label">{{ playlist.name }} </label>
      </div>
      <br />
      <hr />
      <br />
      <div class="modal-form-group">
        <div class="modal-form__btn-extra" @click="openCreatePlaylistModal" >
          <label for="newPlaylist" class="modal-form__label"
            ><span class="material-symbols-rounded pa-2">add</span> Create New Playlist</label
          >
        </div>
      </div>
      <br />
      <div class="d-flex justify-end">
        <BtnAction text="Cancel" @click="updateVisible(false)" color="white" />
        <BtnAction text="Add" @click="addToPlaylist" color="primary" />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import BtnAction from '@/components/BtnAction.vue'
import { addPlaylistItem } from '@/api/playlist'
import { useModalStore } from '@/stores/modal'
import { useUserStore } from '@/stores/user'
import { mapActions } from 'pinia'
import { toRaw } from 'vue'
export default {
  name: 'PlaylistAddModal',
  components: {
    BtnAction
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    trackId: {
      type: Number,
      default: -1
    }
  },
  data: () => ({
    selectedPlaylists: [],
    playlists: [],
    dialog: false
  }),
  methods: {
    ...mapActions(useModalStore, ['openPlaylistModal']),
    openCreatePlaylistModal() {
      this.updateVisible(false)
      this.openPlaylistModal()
    },
    updateVisible(value) {
      this.$emit('toggleVisible', value)
    },
    addToPlaylist() {
      const playlists = toRaw(this.selectedPlaylists)
      for (const playlist of playlists) {
        addPlaylistItem(playlist, this.trackId)
      }
      this.updateVisible(false)
    }
  },
  mounted() {
    const store = useUserStore()
    store.$onAction((mutation) => {
      mutation.after(() => {
        this.playlists = store.getUserPlaylist
      })
    })

    this.$watch('visible', (value) => {
      this.dialog = value
    })
  }
}
</script>

<style scoped>
.modal-form-group {
  height: 5rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
}
.modal-form__label {
  height: 100%;
  width: 100%;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 5px;
  font-size: 2rem;
  transition: all 0.1s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: var(--color-hover);
  }
}
.modal-form__checkbox:checked + .modal-form__label {
  background-color: var(--color-white);
  color: var(--color-black);
}

.modal-form__btn-extra {
  height: 5rem;
  text-decoration: none;
  color: var(--color-white);
  display: flex;
}
</style>
