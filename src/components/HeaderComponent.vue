<template>
  <header class="header">
    <div class="header-left">
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
    <div class="header-right">
      <Avatar
        label="V"
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
const router = useRouter();
const redirectAlbumPage = () => {
  router.push({ name: "albums" });
};
</script>
<style scoped>
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
  gap: 16px;
}
.logo {
  width: 64px;
  height: 64px;
}
</style>
```
