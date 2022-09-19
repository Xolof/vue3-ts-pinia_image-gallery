<script setup lang="ts">
import { useImageStore } from "./stores/useImageStore";
import Gallery from "./components/Gallery.vue";

const store = useImageStore();
</script>

<template>
  <div class="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
    <p class="text-3xl text-gray-700 text-center font-bold mb-5">
      Image Gallery
    </p>
    <Suspense>
      <Gallery />
    </Suspense>
  </div>
</template>

<style scoped></style>
