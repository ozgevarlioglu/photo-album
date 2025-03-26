import { createStore } from "vuex";
import album from "./modules/album";
import photo from "./modules/photo";
import user from "./modules/user";

const store = createStore({
  modules: {
    album,
    photo,
    user,
  },
});

export default store;
