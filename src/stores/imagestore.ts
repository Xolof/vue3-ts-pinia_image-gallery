import { defineStore } from "pinia";

type Image = {
  albumId: number;
  id: number;
  url: string;
  thumbnailUrl: string;
  title: string;
};

export const useImageStore = defineStore("images", {
  state: () => ({
    /**
     * @type {Image[]}
     */
    images: [],
    /**
     * @type {String}
     */
    errorMessage: "",
    /**
     * @type {Boolean}
     */
    message: "",
  }),
  actions: {
    async fetchImageData() {
      try {
        this.message = "Loading...";
        const res = await fetch("https://jsonplaceholder.typicode.com/photos");
        const imageData = await res.json();
        this.images = imageData;
        this.message = "";
      } catch (e) {
        if (e instanceof Error) {
          console.error(e);
          this.errorMessage = e.message;
          this.message = "";
        }
      }
    },
  },
});
