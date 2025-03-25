import axios from "axios";

/* eslint-disable no-unused-vars */

export default {
  namespaced: true,
  state: {
    photos: [],
    mockUrls: [
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

      {
        url: "https://primefaces.org/cdn/primevue/images/galleria/galleria7.jpg",
        thumbnailUrl:
          "https://primefaces.org/cdn/primevue/images/galleria/galleria7s.jpg",
      },
      {
        url: "https://primefaces.org/cdn/primevue/images/galleria/galleria8.jpg",
        thumbnailUrl:
          "https://primefaces.org/cdn/primevue/images/galleria/galleria8s.jpg",
      },
      {
        url: "https://primefaces.org/cdn/primevue/images/galleria/galleria9.jpg",
        thumbnailUrl:
          "https://primefaces.org/cdn/primevue/images/galleria/galleria9s.jpg",
      },
      {
        url: "https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg",
        thumbnailUrl:
          "https://primefaces.org/cdn/primevue/images/galleria/galleria10s.jpg",
      },
      {
        url: "https://primefaces.org/cdn/primevue/images/galleria/galleria11.jpg",
        thumbnailUrl:
          "https://primefaces.org/cdn/primevue/images/galleria/galleria11s.jpg",
      },
      {
        url: "https://primefaces.org/cdn/primevue/images/galleria/galleria12.jpg",
        thumbnailUrl:
          "https://primefaces.org/cdn/primevue/images/galleria/galleria12s.jpg",
      },
      {
        url: "https://primefaces.org/cdn/primevue/images/galleria/galleria13.jpg",
        thumbnailUrl:
          "https://primefaces.org/cdn/primevue/images/galleria/galleria13s.jpg",
      },
      {
        url: "https://primefaces.org/cdn/primevue/images/galleria/galleria14.jpg",
        thumbnailUrl:
          "https://primefaces.org/cdn/primevue/images/galleria/galleria14s.jpg",
      },
      {
        url: "https://primefaces.org/cdn/primevue/images/galleria/galleria15.jpg",
        thumbnailUrl:
          "https://primefaces.org/cdn/primevue/images/galleria/galleria15s.jpg",
      },
    ],
    favPhotos: [],
  },
  getters: {
    allPhotos(state) {
      return state.photos;
    },
    favPhotos(state) {
      return state.favPhotos;
    },
  },
  mutations: {
    setPhotos(state, photos) {
      state.photos = photos;
    },
    updatePhoto(state, updatedPhoto) {
      const index = state.photos.findIndex(
        (photo) => photo.id === updatedPhoto.id,
      );
      if (index !== -1) {
        state.photos.splice(index, 1, updatedPhoto);
      }
    },
  },
  actions: {
    async loadPhotosByAlbumId({ commit, state }, albumId) {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`,
        );
        const photosWithMockUrls = mapMockUrlsToPhotos(
          response.data,
          state.mockUrls,
        );
        commit("setPhotos", photosWithMockUrls);
        return photosWithMockUrls;
      } catch (error) {
        console.error("Fotoğraflar yüklenirken bir hata oluştu:", error);
        return [];
      }
    },

    async updateFavouriteStatus({ state }, { id, status }) {
      const index = state.photos.findIndex((photo) => photo.id === id);
      if (index !== -1) {
        const updatedPhoto = { ...state.photos[index], isFavourite: status };
        state.photos.splice(index, 1, updatedPhoto);
      }
      if (status) {
        state.favPhotos.push(state.photos[index]);
        return true;
      } else {
        state.favPhotos = state.favPhotos.filter((photo) => photo.id !== id);
        return false;
      }
    },

    async addPhoto({ state }, photo) {
      try {
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/photos",
          photo,
        );
        state.photos.push(response.data);
        return true;
      } catch (error) {
        console.error("Fotoğraf eklenirken bir hata oluştu:", error);
        return false;
      }
    },

    async updatePhoto({ commit }, updatedPhoto) {
      try {
        const response = await axios.put(
          `https://jsonplaceholder.typicode.com/photos/${updatedPhoto.id}`,
          updatedPhoto,
        );
        commit("updatePhoto", response.data);
        return true;
      } catch (error) {
        console.error("Fotoğraf güncellenirken bir hata oluştu:", error);
        return false;
      }
    },

    async deletePhoto({ state }, id) {
      try {
        await axios.delete(`https://jsonplaceholder.typicode.com/photos/${id}`);
        state.photos = state.photos.filter((photo) => photo.id !== id);
        return true;
      } catch (error) {
        console.error("Fotoğraf silinirken bir hata oluştu:", error);
        return false;
      }
    },

    async deleteMultiplePhotos({ state }, ids) {
      try {
        await Promise.all(
          ids.map((id) =>
            axios.delete(`https://jsonplaceholder.typicode.com/photos/${id}`),
          ),
        );
        state.photos = state.photos.filter((photo) => !ids.includes(photo.id));
        return true;
      } catch (error) {
        console.error("Fotoğraflar silinirken bir hata oluştu:", error);
        return false;
      }
    },
  },
};

function mapMockUrlsToPhotos(photos, mockUrls) {
  return photos.map((photo, index) => {
    const mockUrl = mockUrls[index % mockUrls.length];
    return {
      ...photo,
      isFavourite: false,
      url: mockUrl.url,
      thumbnailUrl: mockUrl.thumbnailUrl,
    };
  });
}
