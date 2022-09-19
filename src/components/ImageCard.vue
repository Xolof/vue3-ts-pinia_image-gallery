<template>
  <a :href="image.url">
    <div v-if="state.isLoading" class="w-11/12 my-0 mx-auto block h-48">
      <p>Loading...</p>
    </div>
    <img
      :src="image.thumbnailUrl"
      :alt="image.title"
      class="w-11/12 my-0 mx-auto block"
      @load="setIsLoaded()"
    />
  </a>
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
