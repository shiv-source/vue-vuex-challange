import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const baseURL = "https://bcv-fe-interview-api.azapata.io";

const store = new Vuex.Store({
  state: {
    posts: null,
    properties: null,
    users: null,
    isPostsLoaded: false,
    isPropertiesLoaded: false,
    isUsersLoaded: false,
    isError: false,
  },

  mutations: {
    SET_GET_POSTS_DATA(state, data) {
      state.posts = data.res;
      state.isPostsLoaded = data.isPostsLoaded;
    },

    SET_GET_PROPERTIES_DATA(state, data) {
      state.properties = data.res;
      state.isPropertiesLoaded = data.isPropertiesLoaded;
    },

    SET_GET_USER_DATA(state, data) {
      state.users = data.res;
      state.isUsersLoaded = data.isUsersLoaded;
    },

    SET_ERROR_MESSAGE(state, data) {
      state.isError = data;
    },
  },

  actions: {
    getPostsData({ commit }) {
      return axios.get(baseURL + "/api/posts").then((res) => {
        let data = {
          res: res.data,
          isPostsLoaded: true,
        };
        commit("SET_GET_POSTS_DATA", data);
      });
    },

    getProperties({ commit }) {
      return axios.get(baseURL + "/api/properties").then((res) => {
        let data = {
          res: res.data,
          isPropertiesLoaded: true,
        };
        commit("SET_GET_PROPERTIES_DATA", data);
      });
    },

    getUser({ commit }) {
      return axios.get(baseURL + "/api/users").then((res) => {
        let data = {
          res: res.data,
          isUsersLoaded: true,
        };

        commit("SET_GET_USER_DATA", data);
      });
    },

    showError({ commit }) {
      setTimeout(() => {
        if (
          this.state.isPostsLoaded &&
          this.state.isPropertiesLoaded &&
          this.state.isUsersLoaded
        ) {
          return;
        } else {
          let data = true;
          return commit("SET_ERROR_MESSAGE", data);
        }
      }, 1000);
    },
  },
});

export default store;
