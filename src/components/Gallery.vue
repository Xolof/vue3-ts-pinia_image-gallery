<template>
  <section class="flex flex-wrap -mx-2 .justify-evenly">
    <LargeImageOverLay
      :largeImage="state.largeImage"
      :pageYOffset="state.pageYOffset"
      :innerHeight="state.innerHeight"
      @hideLargeImage="hideLargeImage()"
    />
    <div
      v-for="image in state.images"
      :key="image.id"
      class="w-full h-auto sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 rounded transition duration-300 hover:bg-slate-200 mb-6 pt-2 cursor-pointer"
      @click="showLargeImage(image.url, image.title)"
    >
      <div>
        <ImageCard :image="image" />
      </div>
    </div>
  </section>
  <button
    v-if="state.errorMessage === ''"
    @click="increaseLimit()"
    class="border-solid border-4 border-gray-600 p-4 rounded my-0 mx-auto block transition-all duration-300 hover:bg-slate-200"
  >
    Load more
  </button>
</template>

<script setup lang="ts">
import ImageCard from "./ImageCard.vue";
import { reactive } from "vue";
import { useImageStore } from "../stores/imagestore";
import LargeImageOverLay from "./LargeImageOverLay.vue";
const store = useImageStore();
await store.fetchImageData();
await store.fetchAlbumData();

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

const imageData = store.images;
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
