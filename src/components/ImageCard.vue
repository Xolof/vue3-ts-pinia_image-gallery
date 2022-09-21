<template>
  <div class="relative">
    <div v-if="state.isLoading" class="w-11/12 absolute top-0 h-56 text-center">
      <div class="absolute top-1/3 left-0 right-0">
        <p>Loading...</p>
      </div>
    </div>
    <img
      :src="image.thumbnailUrl"
      :alt="image.title"
      class="w-11/12 my-0 mx-auto block rounded"
      width="150"
      height="150"
      @load="setIsLoaded()"
    />
    <p class="w-11/12 my-0 mx-auto block">{{ image.title }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  image: {
    type: Object,
    required: true,
  },
});

const state = ref({
  isLoading: true,
});

function setIsLoaded() {
  state.value.isLoading = false;
}
</script>
