import Vue from 'vue';
import Vuex from 'vuex';
import { setCooikes, getUserCookies, removeUserCookies } from '@/utils/userCookies';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 导航的收放状态 false为展开  true为收起来
    collapsed: false,
    user: getUserCookies(),
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUserInfo(state, userInfo) {
      state.user = userInfo;
    },
    logout(state) {
      state.user = {
        appkey: '',
        email: '',
        role: '',
        username: '',
      };
    },
  },
  actions: {
    changeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
    setUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
      setCooikes(userInfo);
    },
    logout({ commit }) {
      commit('logout');
      removeUserCookies();
    },
  },
  modules: {},
});
