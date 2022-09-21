<template>
  <section class="flex flex-wrap -mx-2 .justify-evenly">
    <div
      v-if="state.largeImage"
      @click="hideLargeImage()"
      class="bg-white absolute cursor-pointer left-0 right-0 flex items-center justify-center h-screen"
      v-bind:style="{
        top: state.pageYOffset + 'px',
        bottom: '-' + state.pageYOffset + state.innerHeight + 'px',
      }"
    >
      <div>
        <img :src="state.largeImage.url" :alt="state.largeImage.title" />
        <p>{{ state.largeImage.title }}</p>
      </div>
    </div>
    <div
      v-for="image in state.images"
      :key="image.id"
      class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 px2"
    >
      <div
        @click="showLargeImage(image.url, image.title)"
        class="cursor-pointer"
      >
        <ImageCard :image="image" />
      </div>
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
  largeImage: any;
  pageYOffset: number;
  innerHeight: number;
}>({
  limit: 6,
  images: [],
  errorMessage: store.errorMessage,
  largeImage: false,
  pageYOffset: window.pageYOffset,
  innerHeight: window.innerHeight,
});

const imageData = store.getImages;
state.images = imageData.slice(0, state.limit);

function increaseLimit() {
  state.limit += 6;
  state.images = imageData.slice(0, state.limit);
}

function showLargeImage(url: string, title: string) {
  document.documentElement.style.overflow = "hidden";
  state.pageYOffset = window.pageYOffset;
  state.innerHeight = window.innerHeight;
  state.largeImage = {
    url,
    title,
  };
}

function hideLargeImage() {
  document.documentElement.style.overflow = "auto";
  state.largeImage = false;
}
</script>
