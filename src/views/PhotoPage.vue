<template>
  <div id="photo-page">
    <h2 class="album-title">{{ pageTitle }}</h2>
    <div class="search-container">
      <IconField class="icon-field">
        <InputIcon>
          <i class="pi pi-search" />
        </InputIcon>
        <InputText
          v-model="searchQuery"
          placeholder="Search photos by title"
          class="search-bar"
        />
      </IconField>
    </div>
    <div class="filter-container">
      <Button
        label="Add Photo"
        size="small"
        class="add-button"
        icon="pi pi-plus"
        @click="addPhoto"
      />
      <div class="checkbox-field">
        <Checkbox
          value="showFavPhotos"
          input-id="show-fav-photo"
          @change="onCheckboxChange()"
        />
        <label for="show-fav-photo">Favourite Photos </label>
      </div>

      <div class="switch-button-field">
        <label for="edit-mode">Edit Mode</label>
        <ToggleSwitch v-model="editMode" />
      </div>

      <Select
        v-model="selectedAlbum"
        :options="albums"
        option-label="title"
        placeholder="Select an Album"
        class="w-50"
      />
    </div>

    <div v-if="!editMode" class="gallery-mode-photos-section">
      <img
        v-for="photo in filteredPhotos"
        :key="photo.id"
        :src="photo.url"
        alt="photo.alt"
      />
    </div>

    <div v-else class="edit-mode-photos-section">
      <PhotoCard
        v-for="photo in filteredPhotos"
        :id="photo.id"
        :key="photo.id"
        :title="photo.title"
        :url="photo.url"
        :is-favourite="photo.isFavourite"
        @open-edit-dialog="handleOpenDialog(photo)"
        @show-toast-message="showMessage"
      />
    </div>
    <div v-if="showNoResult" class="no-photos">
      <h2>No photos found</h2>
      <img src="../assets/no-result.webp" alt="No photos found" />
    </div>
    <PhotoDialog
      v-if="showPhotoDialog"
      v-model:visible="showPhotoDialog"
      :photo="selectedPhoto"
      :album-id="selectedAlbum?.id"
      @show-toast-message="showMessage"
      @success-submit="showMessage"
      @submit-error="showMessage"
    />
    <Toast position="top-center" :base-z-index="2500" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import Select from "primevue/select";
import Button from "primevue/button";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import PhotoCard from "@/components/Photo/PhotoCard.vue";
import PhotoDialog from "@/components/Photo/PhotoDialog.vue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import Checkbox from "primevue/checkbox";
import ToggleSwitch from "primevue/toggleswitch";

const store = useStore();
const route = useRoute();
const router = useRouter();
const toast = useToast();

onMounted(async () => {
  await store.dispatch("album/loadAlbums");
  const albumId = Number(route.query.id);
  await initialize(albumId);
});

const albums = computed(() => {
  return store.state.album.albums;
});

const albumIds = computed(() => {
  return store.state.album.albums.map((album) => album.id);
});

const photos = computed(() => {
  return store.state.photo.photos;
});

const filteredPhotos = computed(() => {
  let result = photos.value;

  if (showFavPhotos.value) {
    result = result.filter((photo) => photo.isFavourite);
  }

  if (searchQuery.value) {
    result = result.filter((photo) =>
      photo.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
  }

  return result;
});

const searchQuery = ref("");
const showPhotoDialog = ref(false);
const selectedPhoto = ref(null);
const pageTitle = ref("");
const showNoResult = ref(false);
const selectedAlbum = ref(null);
const showFavPhotos = ref(false);
const editMode = ref(true);

watch(selectedAlbum, (newAlbum) => {
  if (newAlbum) {
    router.push({ query: { id: newAlbum.id } });
    const album = store.state.album.albums.find(
      (album) => album.id === newAlbum.id,
    );
    if (album) {
      pageTitle.value = album.title;
    }

    store.dispatch("photo/loadPhotosByAlbumId", newAlbum.id);
    searchQuery.value = "";
  }
});

const initialize = async (albumId) => {
  if (!albumId || !albumIds.value.includes(albumId)) {
    showNoResult.value = true;
    return;
  }

  const album = store.state.album.albums.find((album) => album.id === albumId);
  if (album) {
    selectedAlbum.value = album;
    pageTitle.value = album.title;
  }

  await store.dispatch("photo/loadPhotosByAlbumId", albumId);
};

const handleOpenDialog = (photo) => {
  selectedPhoto.value = photo;
  showPhotoDialog.value = true;
};

const addPhoto = async () => {
  selectedPhoto.value = { albumId: selectedAlbum.value?.id || null };
  showPhotoDialog.value = true;
};

const onCheckboxChange = () => {
  showFavPhotos.value = !showFavPhotos.value;
};

const showMessage = (status, message) => {
  toast.add({
    severity: status,
    summary: message,
    detail: "",
    life: 3000,
  });
};
</script>

<style scoped lang="scss">
#photo-page {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 150px;
  padding: 0 2rem;
}

.edit-mode-photos-section {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.gallery-mode-photos-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 16px;
}

@media (max-width: 1200px) {
  .edit-mode-photos-section {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1024px) {
  .edit-mode-photos-section {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .edit-mode-photos-section {
    grid-template-columns: repeat(1, 1fr);
  }
  #photo-page {
    margin-top: 120px;
  }
  .filter-container {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start !important;
  }
  .p-select {
    width: 100% !important;
    order: 2;
  }
  .checkbox-field {
    width: 100% !important;
  }
  .p-select {
    order: 1;
  }
  .switch-button-field {
    order: 2;
  }
  .checkbox-field {
    order: 3;
  }
  .p-button {
    order: 4;
  }
}

.gallery-mode-photos-section img {
  width: 100%;
  object-fit: cover;
}

.gallery-mode-photos-section img:hover {
  transform: scale(1.05);
}
.add-button {
  margin: 0 16px 16px 0;
}
.icon-field {
  width: 420px;
  display: flex;
  position: relative;
  input {
    width: 100%;
  }
}
.filter-container {
  display: flex;
  padding-bottom: 1rem;
  align-items: center;
  justify-content: space-around;
}
.search-container {
  display: flex;
  padding-bottom: 1rem;
  align-items: center;
  justify-content: center;
}
.checkbox-field {
  display: flex;
  width: 15%;
  gap: 8px;
}
.switch-button-field {
  display: flex;
  gap: 8px;
  align-items: center;
}
:deep(.p-select) {
  width: 320px;
  span {
    text-align: left;
  }
}
</style>
