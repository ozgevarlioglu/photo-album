<template>
  <div class="album-page">
    <h2 class="page-title">My Albums</h2>
    <Button
      label="Add Album"
      size="small"
      class="add-button"
      @click="openAlbumDialog({})"
    />

    <div v-if="albums.length > 0" class="albums-section">
      <AlbumCard
        v-for="album in albums"
        :id="album.id"
        :key="album.id"
        :title="album.title"
        :cover-photo-url="album.coverPhotoUrl"
        :preview-photos="album.previewPhotos"
        @open-album-dialog="openAlbumDialog(album)"
        @redirect-album="redirectToAlbum(album.id)"
      />
    </div>
    <div v-else class="no-albums">
      <h3>Let's create your first album to keep your memory alive :)</h3>
      <img src="../assets/no-result.webp" alt="No albums found" />
    </div>
    <AlbumDialog
      v-if="showAlbumDialog"
      v-model:visible="showAlbumDialog"
      :album="selectedAlbum"
      @success-submit="showMessage"
      @submit-error="showMessage"
    />
    <Toast />
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import AlbumCard from "@/components/AlbumCard.vue";
import AlbumDialog from "@/components/AlbumDialog.vue";
import Button from "primevue/button";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

/* eslint-disable no-unused-vars */

const store = useStore();
const router = useRouter();
const toast = useToast();

onMounted(async () => {
  await store.dispatch("album/loadAlbums");
});

const albums = computed(() => {
  return store.state.album.albums;
});

const showAlbumDialog = ref(false);
const selectedAlbum = ref(null);

const openAlbumDialog = (album) => {
  selectedAlbum.value = album;
  showAlbumDialog.value = true;
};

const redirectToAlbum = (id) => {
  router.push({ path: "/photos", query: { id } });
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

<style scoped>
.album-page {
  position: absolute;
  top: 100px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  text-align: center;
}
.albums-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 16px;
}

@media (max-width: 1200px) {
  .albums-section {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 1024px) {
  .albums-section {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .albums-section {
    grid-template-columns: repeat(1, 1fr);
  }
}

.page-title {
  margin-top: 2rem;
  margin-bottom: 0;
}
</style>
