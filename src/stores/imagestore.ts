import { defineStore } from "pinia";

type Image = {
  albumId: number;
  id: number;
  url: string;
  thumbnailUrl: string;
  title: string;
};

type Album = {
  userId: number;
  id: number;
  title: string;
};

export const useImageStore = defineStore("images", {
  state: () => ({
    images: [] as Image[],
    albums: [] as Album[],
    errorMessage: "" as string,
    message: "" as string,
    loading: false as boolean,
  }),
  actions: {
    async fetchImageData() {
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
    async fetchAlbumData() {
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
  },
});
