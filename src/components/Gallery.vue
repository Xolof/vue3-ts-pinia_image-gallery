<template>
  <section class="flex flex-wrap -mx-2 .justify-evenly">
    <div
      v-for="image in state.images"
      :key="image.id"
      class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 px2"
    >
      <ImageCard :image="image" />
    </div>
  </section>
  <button
    v-if="state.errorMessage === ''"
    @click="increaseLimit()"
    class="border-solid border-4 border-gray-600 p-4 my-0 mx-auto block"
  >
    Load more
  </button>
</template>

<script setup lang="ts">
import ImageCard from "./ImageCard.vue";
import { reactive } from "vue";
import { useImageStore } from "../stores/imagestore";
const store = useImageStore();
await store.fetchImageData();

type Image = {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
};

const state = reactive<{
  limit: number;
  images: Image[];
  errorMessage: string;
  loading: boolean;
}>({
  limit: 6,
  images: [],
  errorMessage: store.errorMessage,
  loading: true,
});

const imageData = store.getImages;
state.images = imageData.slice(0, state.limit);

function increaseLimit() {
  state.limit += 6;
  state.images = imageData.slice(0, state.limit);
}
</script>
