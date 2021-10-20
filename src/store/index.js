import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    data: {
      origin: [],
      current: [],
      render: [],
    },
    // 座標
    coordinates: [],
    // 座標來源
    coordinatesSource: "",
    // Sidebar 控制
    sidebarStatus: false,
  },
  mutations: {
    // 儲存 API 原始值資料
    setMaskStores(state, data) {
      state.data.origin = data;
    },
    // 篩選 口罩類型的資料
    filterMaskStores(state, status) {
      if (status === 'all') state.data.render = state.data.current;

      if (status === 'adult') state.data.render =
      state.data.current.filter(store => { return store.properties.mask_adult; })

      if (status === 'child') state.data.render =
      state.data.current.filter(store => { return store.properties.mask_child; })
    },
    // 搜尋 關鍵字的資料
    searchMaskStores(state, keyword) {
      const currentData = state.data.origin.filter((store) => {
        return store.properties.name.includes(keyword) || store.properties.address.includes(keyword);
      });
      state.data.current = currentData;
      state.data.render = currentData;
    },
    // 儲存 選擇的座標
    setCoordinates(state, coordinates) {
      state.coordinates = coordinates;
    },
    // 儲存 座標的來源
    setCoordinatesSource(state, source) {
      state.coordinatesSource = source;
    },
    // 更新 sidebar狀態
    setSidebarStatus(state, status) {
      state.sidebarStatus = status;
    },
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
    },
    // 篩選 口罩類型的資料
    filterMaskStores({commit}, status) {
      commit("filterMaskStores", status);
    },
    // 搜尋 關鍵字的資料
    searchMaskStores({commit}, keyword) {
      commit("searchMaskStores", keyword);
    },
    // 儲存 選擇的座標
    setCoordinates({commit}, coordinates) {
      commit("setCoordinates", coordinates);
    },
    // 儲存 座標的來源
    setCoordinatesSource({commit}, source) {
      commit("setCoordinatesSource", source);
    },
    // 變更 sidebar狀態
    setSidebarStatus({commit}, status) {
      commit("setSidebarStatus", status);
    },
  },
  getters: {
    // 所有資料
    getOriginMaskStores(state) {
      return state.data.origin;
    },
    // 當前資料
    getCurrentMaskStores(state) {
      return state.data.current;
    },
    // 篩選資料
    getRenderMaskStores(state) {
      return state.data.render;
    },
    // 選擇的座標
    getCoordinates(state) {
      return state.coordinates;
    },
    // 座標的來源
    getCoordinatesSource(state) {
      return state.coordinatesSource;
    },
    // sidebar狀態
    getSidebarStatus(state) {
      return state.sidebarStatus;
    },
  },
  modules: {
  }
})
