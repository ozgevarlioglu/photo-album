<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
import HeaderComponent from "@/components/HeaderComponent.vue";

export default {
  name: "App",
  components: {
    HeaderComponent,
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch("user/loadUser");
    });

    return {};
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
