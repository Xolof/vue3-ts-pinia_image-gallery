<template>
  <div
    v-if="largeImage"
    class="bg-white absolute cursor-pointer left-0 right-0 flex items-center justify-center h-screen"
    :style="{
      top: pageYOffset + 'px',
      bottom: '-' + pageYOffset + innerHeight + 'px',
    }"
    @click="handleClick()"
  >
    <div class="w-full">
      <img
        :src="largeImage.url"
        :alt="largeImage.title"
        @load="setIsLoaded()"
      />
      <p class="text-center">{{ largeImage.title }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  largeImage: {
    type: Object,
    required: true,
  },
  pageYOffset: {
    type: Number,
    required: true,
  },
  innerHeight: {
    type: Number,
    required: true,
  },
});

const state = ref({
  isLoading: true,
});

function setIsLoaded() {
  state.value.isLoading = false;
}

function handleClick() {
  state.value.isLoading = true;
  emits("hideLargeImage");
}

const emits = defineEmits(["hideLargeImage"]);
</script>
