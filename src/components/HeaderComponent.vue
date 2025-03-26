<template>
  <header class="header">
    <div class="header-left">
      <div class="title-area">
        <h1>memoria</h1>
        <img src="../assets/camera.png" alt="memoria logo" class="logo" />
      </div>
      <Button
        label="My Albums"
        text
        plain
        icon="pi pi-folder"
        class="add-button"
        @click="redirectAlbumPage"
      />
    </div>
    <div class="header-right">
      <Avatar
        :label="avatarLabel"
        class="mr-2"
        size="large"
        shape="circle"
        style="background-color: #ece9fc; color: #2a1261"
      />
    </div>
  </header>
</template>
<script setup>
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const avatarLabel = computed(() => {
  return store.state.user.user?.name?.charAt(0).toUpperCase();
});

const redirectAlbumPage = () => {
  router.push({ name: "albums" });
};
</script>
<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f8f9fa;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2500;
}
.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

:deep(.p-button-label) {
  font-weight: 600;
}

.title-area {
  display: flex;
  gap: 16px;
  align-items: center;
}
.logo {
  width: 64px;
  height: 64px;
}
@media (max-width: 480px) {
  .header-left {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    flex-direction: column;
  }
  h1 {
    font-size: 1.5rem;
    margin: 0;
  }
  .title-area {
    gap: 8px;
  }
  .logo {
    width: 24px;
    height: 24px;
  }
  .p-avatar {
    width: 32px;
    height: 32px;
  }
  .p-button {
    padding-left: 0;
  }
  :deep(.p-button-label) {
    font-size: 0.75rem;
  }
}
</style>
```
