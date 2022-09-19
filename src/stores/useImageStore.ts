import { defineStore } from 'pinia'

type Image = {
  albumId: number,
  id: number,
  url: string,
  thumbnailUrl: string,
  title: string
};

export const useImageStore = defineStore('todos', {
  state: () => ({
    /**
     * @type {Image[]}
     */
    images: [],
    /**
     * @type {'all', 'album-1' | 'album-2' | 'album-3'}
     */
    filter: 'all',
    offset: 0,
    limit: 10,
  }),
  getters: {
    getImages (): Array<Image> {
      return this.images;
    }
  },
})
