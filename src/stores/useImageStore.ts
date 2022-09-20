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
     * @type {'all', 'album-1' | 'album-2' | 'album-3'}
     */
    filter: "all",
    offset: 0,
    limit: 10
  }),
  actions: {
    async fetchImageData() {
      const res = await fetch("https://jsonplaceholder.typicode.com/photos");
      const imageData = await res.json();
      this.images = imageData;
    }
  },
  getters: {
    getImages(state): Array<Image> {
      return state.images;
    }
  },
});
