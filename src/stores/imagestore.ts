import { defineStore } from "pinia";
import { toRaw } from "vue";
import { ImageObj } from "../types/index";
import { Album } from "../types/index";

export const useImageStore = defineStore("images", {
  state: () => ({
    images: [] as ImageObj[],
    albums: [] as Album[],
    errorMessage: "" as string,
    message: "" as string,
    loading: false as boolean,
  }),
  actions: {
    async fetchImageData(): Promise<void> {
      try {
        this.loading = true;
        this.message = "Loading...";
        const res = await fetch("https://jsonplaceholder.typicode.com/photos");
        const imageData = await res.json();
        this.images = imageData;
        this.message = "";
        this.loading = false;
      } catch (e) {
        if (e instanceof Error) {
          console.error(e);
          this.errorMessage = e.message;
          this.loading = false;
          this.message = "";
        }
      }
    },
    async fetchAlbumData(): Promise<void> {
      try {
        this.loading = true;
        this.message = "Loading...";
        const res = await fetch("https://jsonplaceholder.typicode.com/albums");
        const albumData = await res.json();
        this.albums = albumData;
        this.message = "";
      } catch (e) {
        if (e instanceof Error) {
          console.error(e);
          this.errorMessage = e.message;
          this.loading = false;
          this.message = "";
        }
      }
    },
    async addImage(URL: string, title: string): Promise<void> {
      const newImage = <ImageObj>{
        albumId: this.getIdOfLastAlbum + 1,
        id: this.getIdOfLastImage + 1,
        url: URL,
        thumbnailUrl: URL,
        title: title,
      };
      this.images.unshift(newImage);
    },
  },
  getters: {
    getIdOfLastAlbum(state): number {
      return Math.max(...state.albums.map((album) => album.id));
    },
    getIdOfLastImage(state): number {
      return Math.max(...state.images.map((image) => image.id));
    },
  },
});
