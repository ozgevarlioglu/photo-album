<template>
  <Dialog
    v-model:visible="localVisible"
    modal
    :header="title"
    class="album-dialog"
    :style="{ width: '30rem' }"
  >
    <Tabs value="0">
      <TabList>
        <Tab value="0">Album Title</Tab>
        <Tab v-if="showTab" value="1">Delete Photos</Tab>
        <Tab v-if="showTab" value="2">Add Photo</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0" class="form-content">
          <div class="form-item">
            <label for="title" class="font-semibold w-24">Title</label>
            <InputText
              id="title"
              v-model="tempAlbum.title"
              class="input-box"
              autocomplete="off"
            />
          </div>
          <Button type="button" :label="buttonText" @click="handleSubmit" />
        </TabPanel>
        <TabPanel v-if="showTab" value="1" class="form-content">
          <MultiSelect
            v-model="selectedPhotos"
            class="multiselect"
            :options="albumPhotos"
            option-label="title"
            filter
            placeholder="Select Photos"
            :max-selected-labels="1"
            :overlay-style="{ width: '30%' }"
          />
          <Button type="button" label="Delete" @click="handleDeletePhotos" />
        </TabPanel>
        <TabPanel v-if="showTab" value="2" class="form-content">
          <div class="form-item">
            <label for="title" class="font-semibold w-24">Title</label>
            <InputText
              id="title"
              v-model="tempPhoto.title"
              class="input-box"
              autocomplete="off"
            />
          </div>
          <div class="form-item">
            <label for="url" class="font-semibold w-24">Url:</label>
            <InputText
              id="url"
              v-model="tempPhoto.url"
              class="input-box"
              autocomplete="off"
            />
          </div>
          <div class="form-item">
            <label for="thumbnailUrl" class="font-semibold w-24"
              >ThumbnailUrl:</label
            >
            <InputText
              id="thumbnailUrl"
              v-model="tempPhoto.thumbnailUrl"
              class="input-box"
              autocomplete="off"
            />
          </div>

          <Button
            type="button"
            label="Add"
            class="form-item"
            @click="handleAddPhoto"
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Dialog>
</template>

<script setup>
import { ref, defineProps, onMounted, defineEmits, watch, computed } from "vue";
import Dialog from "primevue/dialog";
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";
import { useStore } from "vuex";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import MultiSelect from "primevue/multiselect";

const store = useStore();

onMounted(async () => {
  tempAlbum.value = { ...props.album };
  await store.dispatch("photo/loadPhotosByAlbumId", props.album.id);
});

/* eslint-disable no-unused-vars */

const props = defineProps({
  album: {
    type: Object,
    default: () => ({}),
  },
  visible: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(["update:visible", "success-submit", "submit-error"]);

const dialogType = computed(() => {
  return props.album.id ? "edit" : "add";
});

const title = computed(() => {
  return dialogType.value === "edit" ? "Edit Album" : "Add Album";
});

const buttonText = computed(() => {
  return dialogType.value === "edit" ? "Update" : "Create";
});

const showTab = computed(() => {
  return dialogType.value === "edit";
});

const albumPhotos = computed(() => {
  return store.state.photo.photos;
});

const localVisible = ref(props.visible);
const selectedPhotos = ref([]);
const tempPhoto = ref({});
const tempAlbum = ref({});

watch(
  () => props.visible,
  (newValue) => {
    localVisible.value = newValue;
  },
);

watch(localVisible, (newValue) => {
  emits("update:visible", newValue);
});

const handleSubmit = async () => {
  if (dialogType.value === "add") {
    await handleCreateAlbum();
  } else {
    await handleUpdateAlbum();
  }
  handleClose();
};

const handleUpdateAlbum = async () => {
  const response = await store.dispatch("album/updateAlbum", tempAlbum.value);
  if (response) {
    emits("success-submit", "success", "updated album successfully");
  } else {
    emits("submit-error", "error", "error");
  }
};

const handleCreateAlbum = async () => {
  const response = await store.dispatch("album/addAlbum", tempAlbum.value);
  if (response) {
    emits("success-submit", "success", "created album successfully");
  } else {
    emits("submit-error", "error", "error");
  }
};

const handleAddPhoto = async () => {
  tempPhoto.value.albumId = props.album.id;
  const response = await store.dispatch("photo/addPhoto", tempPhoto.value);
  if (response) {
    emits("success-submit", "success", "added photo successfully");
  } else {
    emits("submit-error", "error", "error");
  }
};

const handleDeletePhotos = async () => {
  const selectedPhotosIds = selectedPhotos.value.map((photo) => photo.id);

  const response = await store.dispatch(
    "photo/deleteMultiplePhotos",
    selectedPhotosIds,
  );
  if (response) {
    emits("success-submit", "success", "deleted photos successfully");
  } else {
    emits("submit-error", "error", "error");
  }
};

const handleClose = () => {
  localVisible.value = false;
};
</script>

<style scoped>
.p-tabpanels {
  padding: 16px;
}
:deep(.form-content) {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.form-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  width: 100%;
}

.input-box {
  width: 100%;
}

:deep(.p-dialog-content) {
  min-height: 400px;
}
</style>
