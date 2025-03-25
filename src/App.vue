<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
export default {
  name: "App",
  components: {
    HeaderComponent, // Header bileşenini kaydet
  },
};
</script>

<template>
  <div id="app">
    <HeaderComponent />
    <RouterView />
    <footer>
      <p>&copy; 2025 Photo Album App</p>
    </footer>
  </div>
</template>

<style scoped></style>
