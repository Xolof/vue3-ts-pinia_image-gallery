<template>
  <div
    v-if="largeImage"
    class="bg-slate-50 absolute left-0 right-0 flex flex-col items-center justify-center h-screen z-50"
    :style="{
      top: pageYOffset + 'px',
      bottom: '-' + pageYOffset + innerHeight + 'px',
    }"
  >
    <div class="absolute top-0 right-0">
      <button
        class="block w-28 h-28 cursor-pointer border-solid border-4 border-gray-600 rounded m-6 transition-all duration-300 hover:bg-slate-200"
        @click="handleClick()"
      >
        <img src="/closeBtn.svg" alt="Close" />
      </button>
    </div>
    <div
      v-if="state.isLoading"
      class="w-11/12 my-0 mx-auto block h-[590px] flex items-center justify-center h-screen"
    >
      <p class="text-center block text-gray-800">Loading...</p>
    </div>
    <div class="w-full">
      <img
        :src="largeImage.url"
        :alt="largeImage.title"
        class="my-0 mx-auto block rounded"
        @load="setIsLoaded()"
      />
      <p class="text-center text-xl p-4 text-gray-800">
        {{ largeImage.title }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, PropType } from "vue";
import { LargeImage } from "../types/index";

const props = defineProps({
  largeImage: {
    type: Object as PropType<LargeImage>,
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
