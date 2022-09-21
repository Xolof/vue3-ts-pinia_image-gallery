<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useImageStore } from "../stores/imagestore";
const store = useImageStore();
const { errorMessage, message } = storeToRefs(store);
</script>

<template>
  <div v-if="message || errorMessage" class="h-screen relative">
    <p
      v-if="message"
      class="text-xl text-green-700 text-center font-bold mb-5 absolute left-0 right-0 top-28"
    >
      {{ message }}
    </p>
    <p
      v-if="errorMessage"
      class="text-xl text-red-700 text-center font-bold mb-5 absolute left-0 right-0 top-28"
    >
      Error:<br />
      {{ errorMessage }}
    </p>
  </div>
</template>
