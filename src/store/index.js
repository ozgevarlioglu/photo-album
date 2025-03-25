import { createStore } from "vuex";
import album from "./modules/album";
import photo from "./modules/photo";

const store = createStore({
  modules: {
    album,
    photo,
  },
});

export default store;
