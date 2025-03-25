<template>
  <Card style="width: 25rem; overflow: hidden">
    <template #header>
      <Image
        v-if="hasCoverPhotoUrl"
        :src="coverPhotoUrl"
        alt="Image"
        width="250"
        preview
      >
        {{ previewPhotos }}
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
      <div v-else class="add-photo-box">add first photo</div>
    </template>
    <template #title>{{ title }}</template>
    <template #footer>
      <div class="flex gap-4 mt-1">
        {{ id }}
        <Button
          label="Delete"
          severity="secondary"
          outlined
          class="w-full"
          @click="deleteAlbum"
        />
        <Button
          label="Actions"
          severity="secondary"
          outlined
          class="w-full"
          @click="openAlbumDialog"
        />
        <Button
          label="go to album"
          severity="secondary"
          outlined
          class="w-full"
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
}
</style>
