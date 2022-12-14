<template>
  <section class="flex flex-wrap mx-2 .justify-evenly">
    <div v-if="state.largeImageIsDisplayed">
      <LargeImageOverLay
        :largeImage="state.largeImage"
        :pageYOffset="state.pageYOffset"
        :innerHeight="state.innerHeight"
        @hideLargeImage="hideLargeImage()"
      />
    </div>

    <AddImageForm
      :imageURLToAddIsInValid="state.imageURLToAddIsInValid"
      :imageTitleToAddIsInValid="state.imageTitleToAddIsInValid"
      :imageURLToAdd="state.imageURLToAdd"
      :imageTitleToAdd="state.imageTitleToAdd"
      @setImageURLToAdd="setImageURLToAdd"
      @setImageTitleToAdd="setImageTitleToAdd"
      @submitImage="submitImage"
    />

    <div class="block mt-0 mb-2 mx-auto w-full">
      <input
        type="number"
        min="1"
        placeholder="Filter images by album id"
        class="w-full p-2 text-center border-solid border-2 border-gray-400"
        @input="handleFilter"
      />
    </div>

    <div
      v-if="imagesToDisplay.length"
      v-for="image in imagesToDisplay"
      :key="image.id"
      class="w-full h-auto sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 rounded transition duration-300 hover:bg-slate-200 mb-6 pt-2 cursor-pointer"
      @click="showLargeImage(image.url, image.title)"
    >
      <div>
        <ImageCard :image="image" />
      </div>
    </div>
    <p
      v-else
      class="text-xl text-gray-700 text-center font-bold my-5 block w-full"
    >
      Nothing found
    </p>
  </section>
  <button
    v-if="state.errorMessage === '' && thereIsMoreToLoad"
    @click="increaseLimit()"
    class="text-gray-800 border-solid border-4 border-gray-600 p-4 rounded my-0 mx-auto block transition-all duration-300 hover:bg-slate-200"
  >
    Load more
  </button>
</template>

<script setup lang="ts">
import { ImageObj } from "../types/index";
import { LargeImage } from "../types/index";
import { Album } from "../types/index";
import ImageCard from "./ImageCard.vue";
import { reactive, toRaw, computed } from "vue";
import { useImageStore } from "../stores/imagestore";
import LargeImageOverLay from "./LargeImageOverLay.vue";
import AddImageForm from "./AddImageForm.vue";
const store = useImageStore();
await store.fetchImageData();
await store.fetchAlbumData();

const state = reactive<{
  limit: number;
  allImages: ImageObj[];
  albums: Album[];
  errorMessage: string;
  largeImage: LargeImage;
  pageYOffset: number;
  innerHeight: number;
  filter: string;
  loading: boolean;
  largeImageIsDisplayed: boolean;
  imageURLToAdd: string;
  imageURLToAddIsInValid: boolean;
  imageTitleToAdd: string;
  imageTitleToAddIsInValid: boolean;
}>({
  limit: 6,
  allImages: store.images,
  albums: store.albums,
  errorMessage: store.errorMessage,
  largeImage: {
    title: "",
    url: "",
  },
  pageYOffset: window.pageYOffset,
  innerHeight: window.innerHeight,
  filter: "",
  loading: false,
  largeImageIsDisplayed: false,
  imageURLToAdd: "",
  imageURLToAddIsInValid: false,
  imageTitleToAdd: "",
  imageTitleToAddIsInValid: false,
});

const imagesToDisplay = computed((): ImageObj[] => {
  return getImagesToDisplay();
});

const thereIsMoreToLoad = computed((): boolean => {
  const imagesToDisplay = getImagesToDisplay();
  const filteredImages = getfilteredImages();

  if (state.filter) {
    if (imagesToDisplay.length >= filteredImages.length) {
      return false;
    }
  }

  if (imagesToDisplay.length >= state.allImages.length) {
    return false;
  }

  return true;
});

function getImagesToDisplay(): ImageObj[] {
  if (state.filter === "" || !isNumeric(state.filter)) {
    return state.allImages.slice(0, state.limit);
  }
  return getfilteredImages().slice(0, state.limit);
}

function getfilteredImages(): ImageObj[] {
  return toRaw(state.allImages).filter((image: ImageObj) => {
    return image.albumId === parseInt(state.filter);
  });
}

function increaseLimit(): void {
  state.limit += 6;
}

function showLargeImage(url: string, title: string): void {
  document.documentElement.style.overflow = "hidden";
  state.pageYOffset = window.pageYOffset;
  state.innerHeight = window.innerHeight;
  state.largeImageIsDisplayed = true;
  state.largeImage = {
    title,
    url,
  };
}

function hideLargeImage(): void {
  document.documentElement.style.overflow = "auto";
  state.largeImageIsDisplayed = false;
}

function handleFilter(event: Event): void {
  const target = event.target as HTMLInputElement;
  if (target.value) {
    const value = target.value;
    state.filter = value;
  } else {
    state.filter = "";
  }
}

function isNumeric(value: any): boolean {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

async function submitImage(event: Event): Promise<void> {
  if (state.imageTitleToAdd === "") {
    state.imageTitleToAddIsInValid = true;
  }
  if (state.imageURLToAdd === "") {
    state.imageURLToAddIsInValid = true;
  }
  if (state.imageURLToAdd === "" || state.imageTitleToAdd === "") {
    return;
  }
  state.imageURLToAddIsInValid = false;
  state.imageTitleToAddIsInValid = false;
  await store.addImage(state.imageURLToAdd, state.imageTitleToAdd);
  state.allImages = store.images;
  state.imageTitleToAdd = "";
  state.imageURLToAdd = "";
}

function setImageURLToAdd(event: Event): void {
  const target = event.target as HTMLInputElement;
  if (target) {
    const value = target.value;
    if (value !== "") {
      state.imageURLToAddIsInValid = false;
    }
    state.imageURLToAdd = value;
  }
}

function setImageTitleToAdd(event: Event): void {
  const target = event.target as HTMLInputElement;
  if (target) {
    const value = target.value;
    if (value !== "") {
      state.imageTitleToAddIsInValid = false;
    }
    state.imageTitleToAdd = value;
  }
}
</script>
