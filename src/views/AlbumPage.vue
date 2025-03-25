<template>
  <div class="album-page">
    <h1>Albums Page</h1>
    <Button
      label="Add Album"
      size="large"
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
      <h2>Let's create your first album to keep your memory alive :)</h2>
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

const redirectToAlbum = (albumId) => {
  router.push({ path: "/photos", query: { albumId } });
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
}
.albums-section {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
