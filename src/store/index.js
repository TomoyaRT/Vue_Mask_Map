import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    data: {
      origin: [],
      current: [],
    },
  },
  mutations: {
    // 儲存 API 原始值資料
    setMaskStores(state, data) {
      state.data.origin = data;
    },
    // 篩選 口罩類型的資料
    filterMaskStores(state, status) {
      switch (status) {
        case 'all':
          // return;
          break;
        case 'adult':
          state.data.current = state.data.current.filter((store) => {
            return store.properties.mask_adult;
          })
          break;
        case 'child':
          state.data.current = state.data.current.filter((store) => {
            return store.properties.mask_child;
          })
          break;
      }
    },
    // 搜尋 關鍵字的資料
    searchMaskStores(state, keyword) {
      state.data.current = state.data.origin.filter((store) => {
        return store.properties.name.includes(keyword) || store.properties.address.includes(keyword);
      })
    }
  },
  actions: {
    // 取得 API 原始值資料
    getMaskStores({commit}) {
      return axios
        .get("https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json")
        .then((res) => {
          commit("setMaskStores", res.data.features);
          return res;
        })
        .catch((err) => {
          console.error(err.response);
        })
    },
    // 篩選 口罩類型的資料
    filterMaskStores({commit}, status) {
      commit("filterMaskStores", status);
    },
    // 搜尋 關鍵字的資料
    searchMaskStores({commit}, keyword) {
      commit("searchMaskStores", keyword);
    },
  },
  getters: {
    // 取得當前 領口罩的藥局分布資料
    getMaskStores(state) {
      return state.data.current;
    },
  },
  modules: {
  }
})
