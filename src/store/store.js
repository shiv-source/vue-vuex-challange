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
  },

  mutations: {
    SET_GET_POSTS_DATA(state, data) {
   
      state.posts = data.res;
      state.isPostsLoaded = data.isPostsLoaded;
      console.log(state.isPostsLoaded);
    },

    SET_GET_PROPERTIES_DATA(state, data) {
      console.log(data);
      state.properties = data.res;
      state.isPropertiesLoaded = data.isPropertiesLoaded;
      console.log(state.isPropertiesLoaded);

    },

    SET_GET_USER_DATA(state, data) {
      console.log(data);
      state.users = data.res;
      state.isUsersLoaded = data.isUsersLoaded;
      console.log(state.isUsersLoaded);

    },
  },

  actions: {
    getPostsData({ commit }) {
      return axios.get(baseURL + "/api/posts").then((res) => {
        console.log(res.data);
        let data = {
          res: res.data,
          isPostsLoaded: true,
        };
        commit("SET_GET_POSTS_DATA", data);
      });
    },

    getProperties({ commit }) {
      return axios.get(baseURL + "/api/properties").then((res) => {
        console.log(res.data);
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
        console.log(data);
        commit("SET_GET_USER_DATA", data);
      });
    },
  },
});

export default store;
