import axios from "axios";

export default {
  namespaced: true, // Modülün namespaced olduğunu belirtir
  state: {
    albums: [],
    albumPhotos: [],
  },
  getters: {
    allAlbums(state) {
      return state.albums;
    },
    albumPhotos(state) {
      return state.albumPhotos;
    },
  },
  mutations: {
    setAlbums(state, albums) {
      state.albums = albums;
    },
    setAlbumPhotos(state, albumPhotos) {
      state.albumPhotos = albumPhotos;
    },
    updateAlbum(state, payload) {
      const index = state.albums.findIndex((album) => album.id === payload.id);
      if (index !== -1) {
        state.albums.splice(index, 1, payload);
      }
    },
  },
  actions: {
    async loadAlbums({ commit }) {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/albums?userId=1",
        );

        const albums = response.data.map((album) => ({
          ...album,
          coverPhotoUrl: `https://primefaces.org/cdn/primevue/images/galleria/galleria${album.id}.jpg`,
          previewPhotos: [
            {
              url: "https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg",
              thumbnailUrl:
                "https://primefaces.org/cdn/primevue/images/galleria/galleria1s.jpg",
            },
            {
              url: "https://primefaces.org/cdn/primevue/images/galleria/galleria2.jpg",
              thumbnailUrl:
                "https://primefaces.org/cdn/primevue/images/galleria/galleria2s.jpg",
            },
            {
              url: "https://primefaces.org/cdn/primevue/images/galleria/galleria3.jpg",
              thumbnailUrl:
                "https://primefaces.org/cdn/primevue/images/galleria/galleria3s.jpg",
            },
            {
              url: "https://primefaces.org/cdn/primevue/images/galleria/galleria4.jpg",
              thumbnailUrl:
                "https://primefaces.org/cdn/primevue/images/galleria/galleria4s.jpg",
            },

            {
              url: "https://primefaces.org/cdn/primevue/images/galleria/galleria5.jpg",
              thumbnailUrl:
                "https://primefaces.org/cdn/primevue/images/galleria/galleria5s.jpg",
            },

            {
              url: "https://primefaces.org/cdn/primevue/images/galleria/galleria6.jpg",
              thumbnailUrl:
                "https://primefaces.org/cdn/primevue/images/galleria/galleria6s.jpg",
            },
          ],
        }));

        commit("setAlbums", albums);

        return albums;
      } catch (error) {
        console.error("failed when load albums data", error);
        return [];
      }
    },
    async addAlbum({ state }, album) {
      try {
        const modifiedAlbum = {
          ...album,
          userId: 1,
        };
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/albums",
          modifiedAlbum,
        );

        state.albums.push(response.data);
        state.albumPhotos.push({
          id: response.data.id,
          title: response.data.title,
          photos: [],
        });
        return true;
      } catch (error) {
        console.error("failed when adding photo", error);
        return false;
      }
    },

    async updateAlbum({ commit }, updatedAlbum) {
      try {
        const response = await axios.put(
          `https://jsonplaceholder.typicode.com/albums/${updatedAlbum.id}`,
          updatedAlbum,
        );
        commit("updateAlbum", response.data);
        return true;
      } catch (error) {
        console.error("failed when updating photo", error);
        return false;
      }
    },

    async deleteAlbum({ state }, id) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/albums/${id}`);
        state.albums = state.albums.filter((album) => album.id !== id);
        return true;
      } catch (error) {
        console.error("Albüm silinirken bir hata oluştu:", error);
        return false;
      }
    },
  },
};
