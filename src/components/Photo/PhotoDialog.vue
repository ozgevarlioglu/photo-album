<template>
  <Dialog
    v-model:visible="localVisible"
    modal
    :header="title"
    class="photo-dialog"
    :style="{ width: '30rem' }"
  >
    <div value="0" class="form-content">
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
      <div v-if="showWarnMessage" class="warn-box">
        <span class="warn-text">* All fields are required</span>
      </div>
      <div class="dialog-footer">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="handleClose"
        />
        <Button type="button" label="Save" @click="handleSubmit" />
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import { ref, defineProps, onMounted, defineEmits, watch, computed } from "vue";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useStore } from "vuex";

const store = useStore();

/* eslint-disable no-unused-vars */

const props = defineProps({
  photo: {
    type: Object,
    default: () => ({}),
  },
  albumId: {
    type: Number,
    default: 1,
  },
  visible: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(["update:visible", "success-submit", "submit-error"]);

onMounted(() => {
  tempPhoto.value = { ...props.photo };
});

const dialogType = computed(() => {
  return props.photo.id ? "edit" : "add";
});

const title = computed(() => {
  return dialogType.value === "edit" ? "Edit Photo" : "Add Photo";
});

const isValidForm = computed(() => {
  return (
    tempPhoto.value.title && tempPhoto.value.url && tempPhoto.value.thumbnailUrl
  );
});

const localVisible = ref(props.visible);
const tempPhoto = ref({});
const showWarnMessage = ref(false);

watch(
  () => props.visible,
  (newValue) => {
    localVisible.value = newValue;
  },
);

watch(localVisible, (newValue) => {
  emits("update:visible", newValue);
});

watch(
  () => [
    tempPhoto.value.title,
    tempPhoto.value.url,
    tempPhoto.value.thumbnailUrl,
  ],
  () => {
    showWarnMessage.value = false;
  },
);

const handleSubmit = async () => {
  if (!isValidForm.value) {
    showWarnMessage.value = true;
    return;
  }
  if (dialogType.value === "add") {
    await handleCreate();
  } else {
    await handleUpdate();
  }
  handleClose();
};

const handleCreate = async () => {
  tempPhoto.value.albumId = props.albumId;
  const response = await store.dispatch("photo/addPhoto", tempPhoto.value);
  if (response) {
    emits("success-submit", "success", "created photo successfully");
  } else {
    emits("submit-error", "error", "error");
  }
};

const handleUpdate = async () => {
  const response = await store.dispatch("photo/updatePhoto", tempPhoto.value);
  if (response) {
    emits("success-submit", "success", "updated photo successfully");
  } else {
    emits("submit-error", "error", "error");
  }
};

const handleClose = () => {
  localVisible.value = false;
};
</script>

<style scoped>
.form-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.form-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
}

.input-box {
  width: 100%;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}
</style>
