<template>
  <Card style="width: 20rem; overflow: hidden; box-shadow: none">
    <template #header>
      <Image :src="url" alt="Image" width="250" preview />
    </template>
    <template #title>
      <span class="card-title">
        {{ title }}
      </span>
    </template>
    <template #footer>
      <div class="flex gap-4 mt-1">
        <Button
          icon="pi pi-trash"
          severity="help"
          variant="text"
          rounded
          @click="deletePhoto"
        />
        <Button
          icon="pi pi-pencil"
          severity="help"
          variant="text"
          rounded
          @click="openEditDialog"
        />

        <Button
          :icon="favIcon"
          severity="help"
          variant="text"
          rounded
          @click="handleFavStatus"
        />
      </div>
    </template>
  </Card>
</template>

<script setup>
import Button from "primevue/button";
import Card from "primevue/card";
import { defineProps, defineEmits, computed, ref } from "vue";
import { useStore } from "vuex";
import Image from "primevue/image";

const store = useStore();

const props = defineProps({
  title: {
    type: String,
    default: "Title",
  },
  url: {
    type: String,
    default: "https://media.timeout.com/images/106034909/1920/1440/image.webp",
  },
  id: {
    type: Number,
    default: 0,
  },
  isFavourite: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["open-edit-dialog", "show-toast-message"]);

const isFavourite = computed(() => {
  return props.isFavourite;
});

const favIcon = computed(() => {
  return isFavourite.value ? "pi pi-heart-fill" : "pi pi-heart";
});

const favStatus = ref(isFavourite.value);

const deletePhoto = async () => {
  const response = await store.dispatch("photo/deletePhoto", props.id);
  if (response) {
    emits("show-toast-message", "success", "photo deleted successfully");
  } else {
    emits("show-toast-message", "error", "failed to delete photo");
  }
};

const handleFavStatus = async () => {
  favStatus.value = !favStatus.value;
  const response = await store.dispatch("photo/updateFavouriteStatus", {
    id: props.id,
    status: favStatus.value,
  });
  if (response) {
    emits("show-toast-message", "success", "added to fav list");
  } else {
    emits("show-toast-message", "error", "removed from fav list");
  }
};

const openEditDialog = () => {
  emits("open-edit-dialog");
};
</script>
<style scoped lang="scss">
:deep(.p-card-body) {
  gap: 0 !important;
  padding: 8px !important;
}

.card-title {
  font-size: 1rem;
  font-weight: 500;
}
</style>
