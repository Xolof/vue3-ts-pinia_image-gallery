<template>
  <section class="flex flex-wrap -mx-2 .justify-evenly">
    <div v-if="state.largeImageIsDisplayed">
      <LargeImageOverLay
        :largeImage="state.largeImage"
        :pageYOffset="state.pageYOffset"
        :innerHeight="state.innerHeight"
        @hideLargeImage="hideLargeImage()"
      />
    </div>

    <div class="block mt-0 mb-2 mx-auto w-full">
      <input
        type="number"
        :min="1"
        :max="state.albums.length"
        placeholder="Filter images by album id"
        class="w-full p-2 text-center border-solid border-2 border-gray-400"
        @input="handleFilter"
      />
    </div>

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

type Album = {
  userId: number;
  id: number;
  title: string;
};

const state = reactive<{
  limit: number;
  images: Image[];
  albums: Album[];
  errorMessage: string;
  largeImage: any;
  pageYOffset: number;
  innerHeight: number;
  filter: string;
  largeImageIsDisplayed: boolean;
}>({
  limit: 6,
  images: [],
  albums: store.albums,
  errorMessage: store.errorMessage,
  largeImage: false,
  pageYOffset: window.pageYOffset,
  innerHeight: window.innerHeight,
  filter: "",
  largeImageIsDisplayed: false,
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
  state.largeImageIsDisplayed = true;
  state.largeImage = {
    url,
    title,
  };
}

function hideLargeImage() {
  document.documentElement.style.overflow = "auto";
  state.largeImageIsDisplayed = false;
}

function handleFilter(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.value) {
    const value = target.value;
    state.filter = value;
  } else {
    state.filter = "";
  }
}
</script>
