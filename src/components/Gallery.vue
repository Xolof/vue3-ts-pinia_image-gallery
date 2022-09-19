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
    @click="increaseLimit()"
    class="border-solid border-4 border-gray-600 p-4 my-0 mx-auto block"
  >
    Load more
  </button>
</template>

<script setup lang="ts">
import ImageCard from "./ImageCard.vue";
import { ref } from "vue";

type Image = {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
};

const state = ref<{
  limit: number;
  images: Image[];
  loading: boolean;
}>({
  limit: 6,
  images: [],
  loading: true,
});

const res = await fetch("https://jsonplaceholder.typicode.com/photos");
const imageData = await res.json();
state.value.images = imageData.slice(0, state.value.limit);

function increaseLimit() {
  state.value.limit += 6;
  state.value.images = imageData.slice(0, state.value.limit);
}
</script>
