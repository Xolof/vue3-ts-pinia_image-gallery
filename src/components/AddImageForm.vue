<template>
  <div class="mb-4 flex flex-wrap items-end">
    <div>
      <label v-if="imageURLToAddIsInValid" for="URL" class="block"
        >Please enter a URL.</label
      >
      <input
        type="text"
        placeholder="URL"
        name="URL"
        :value="imageURLToAdd"
        class="mr-4 mb-2 p-2 text-center border-solid border-2 border-gray-400"
        :class="{
          'border-red-400 bg-red-100': imageURLToAddIsInValid,
        }"
        @input="$emit('setImageURLToAdd', $event)"
      />
    </div>
    <div>
      <label v-if="imageTitleToAddIsInValid" for="title" class="block"
        >Please enter a title.</label
      >
      <input
        type="text"
        placeholder="title"
        name="title"
        :value="imageTitleToAdd"
        class="mr-4 mb-2 p-2 text-center border-solid border-2 border-gray-400"
        :class="{
          'border-red-400 bg-red-100': imageTitleToAddIsInValid,
        }"
        @input="$emit('setImageTitleToAdd', $event)"
      />
    </div>

    <button
      class="h-11 mb-2 text-gray-800 border-solid border-4 border-gray-600 py-2 px-4 rounded transition-all duration-300 hover:bg-slate-200 hover:cursor"
      @click="$emit('submitImage', $event)"
    >
      Add image
    </button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const props = defineProps({
  imageURLToAddIsInValid: {
    type: Boolean,
    required: true,
  },
  imageTitleToAddIsInValid: {
    type: Boolean,
    required: true,
  },
  imageURLToAdd: {
    type: String,
    required: true,
  },
  imageTitleToAdd: {
    type: String,
    required: true,
  },
});

const state = reactive<{
  imageURLToAdd: string;
  imageURLToAddIsInValid: boolean;
  imageTitleToAdd: string;
  imageTitleToAddIsInValid: boolean;
}>({
  imageURLToAdd: props.imageURLToAdd,
  imageURLToAddIsInValid: props.imageURLToAddIsInValid,
  imageTitleToAdd: props.imageTitleToAdd,
  imageTitleToAddIsInValid: props.imageTitleToAddIsInValid,
});

const emits = defineEmits([
  "setImageURLToAdd",
  "setImageTitleToAdd",
  "submitImage",
  "setImageURLToAdd",
]);
</script>
