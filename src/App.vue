<script setup lang="ts">
import Gallery from "./components/Gallery.vue";
import Message from "./components/Message.vue";
</script>

<template>
  <div class="container mx-auto p-8 my-0 sm:my-10 sm:mx-auto min-h-[90%]">
    <h1 class="text-5xl text-gray-700 text-center font-bold mb-10">
      Image Gallery
    </h1>
    <Message />
    <Suspense>
      <Gallery />
    </Suspense>
  </div>
</template>
