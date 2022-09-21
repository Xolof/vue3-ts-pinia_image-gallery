<script setup lang="ts">
import Gallery from "./components/Gallery.vue";
import Message from "./components/Message.vue";
</script>

<template>
  <div
    class="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10 min-h-[90%]"
  >
    <p class="text-3xl text-gray-700 text-center font-bold mb-5">
      Image Gallery
    </p>
    <Message />
    <Suspense>
      <Gallery />
    </Suspense>
  </div>
</template>

<style scoped></style>
