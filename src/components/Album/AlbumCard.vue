<template>
  <Card
    style="width: 20rem; overflow: hidden; box-shadow: none; border-radius: 0"
  >
    <template #header>
      <Image
        v-if="hasCoverPhotoUrl"
        :src="coverPhotoUrl"
        alt="Image"
        width="250"
        preview
      >
        <template #preview>
          <div @click.stop>
            <Galleria
              :value="previewPhotos"
              :responsive-options="responsiveOptions"
              :num-visible="5"
              container-style="max-width: 640px"
            >
              <template #item="slotProps">
                <img
                  :src="slotProps.item.url"
                  :alt="slotProps.item.alt"
                  style="width: 100%"
                />
              </template>
              <template #thumbnail="slotProps">
                <img
                  :src="slotProps.item.thumbnailUrl"
                  :alt="slotProps.item.alt"
                />
              </template>
            </Galleria>
          </div>
        </template>
      </Image>
      <div v-else class="add-photo-box" @click="openAlbumDialog">
        <i class="pi pi-plus"></i>
        <span>add first photo</span>
      </div>
    </template>
    <template #title>{{ title }}</template>
    <template #footer>
      <div class="flex gap-4 mt-1">
        <Button
          icon="pi pi-trash"
          severity="help"
          variant="text"
          rounded
          @click="deleteAlbum"
        />
        <Button
          icon="pi pi-pencil"
          severity="help"
          variant="text"
          rounded
          @click="openAlbumDialog"
        />
        <Button
          icon="pi pi-eye"
          severity="help"
          variant="text"
          rounded
          @click="redirectToAlbum"
        />
      </div>
    </template>
  </Card>
</template>

<script setup>
import Button from "primevue/button";
import Card from "primevue/card";
import { defineProps, defineEmits, computed } from "vue";
import { useStore } from "vuex";
import Image from "primevue/image";
import Galleria from "primevue/galleria";
import { ref } from "vue";

const store = useStore();

const props = defineProps({
  title: {
    type: String,
    default: "Title",
  },
  id: {
    type: Number,
    default: 0,
  },
  coverPhotoUrl: {
    type: String,
    default: "",
  },
  previewPhotos: {
    type: Array,
    default: () => [],
  },
});

const emits = defineEmits(["open-album-dialog", "redirect-album"]);

const hasCoverPhotoUrl = computed(() => {
  return props.coverPhotoUrl !== "";
});

const responsiveOptions = ref([
  {
    breakpoint: "1300px",
    numVisible: 4,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
  },
]);

const deleteAlbum = () => {
  store.dispatch("album/deleteAlbum", props.id);
};

const openAlbumDialog = () => {
  emits("open-album-dialog");
};

const redirectToAlbum = () => {
  emits("redirect-album");
};
</script>
<style scoped>
.add-photo-box {
  height: 215px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  border: 1px dashed black;
  width: 250px;
  height: 180px;
  flex-direction: column;
  gap: 16px;
  cursor: pointer;
}
:deep(.p-card-header) {
  display: flex;
  justify-content: center;
}
</style>
