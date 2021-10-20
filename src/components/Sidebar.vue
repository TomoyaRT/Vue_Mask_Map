<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";

import SidebarStoreCard from "../components/SidebarStoreCard.vue";

export default {
  components: {
    SidebarStoreCard
  },
  setup() {
    const store = useStore();
    const filterBtnStatus = ref("all");
    const searchValue = ref("");
    const errorMsg = ref("");
    const searchResult = ref(false);
    let renderStoresData = ref([]);
    let renderStoresNum = 0;
    let loadingStatus = ref(false);
    const today = ref(
      `
      今天日期是 ${new Date().getFullYear()}
      年 ${new Date().getMonth() + 1}
      月 ${new Date().getDate()}
      日
    `
    );

    /**
     * 取得 sidebar狀態
     */
    const sidebarStatus = computed(() => {
      return store.getters.getSidebarStatus;
    });

    /**
     * sidebar控制器
     */
    const sidebarController = status => {
      store.dispatch("setSidebarStatus", status);
    };

    /**
     * 取得 口罩藥局的資料
     */
    const maskStores = computed(() => {
      return store.getters.getRenderMaskStores;
    });

    // 監聽 口罩藥局的資料
    watch(maskStores, () => {
      // 若查無資料
      searchResult.value = maskStores.value.length === 0 ? true : false;
      renderStoresNum = 0; // 重置呈現藥局數量的極限值
      renderStoresData.value = maskStores.value.slice(0, renderStoresNum); // 資料狀態改變時，顯示Loading
      infiniteScroll();
    });

    /**
     * 可以買口罩的身分證末一碼
     */
    const canBuyMaskNum = computed(() => {
      const today = new Date().getDay();
      return today % 2 === 0 ? "2、4、6、8、0" : "1、3、5、7、9";
    });

    // 無限下拉選單的功能
    const infiniteScroll = () => {
      const listEnd = document.getElementsByClassName("list-end")[0]; // 監聽對象
      const options = { threshold: 0 }; // 觸發時機

      const callback = (entries, observer) => {
        // 觸發時的事件
        entries.forEach(entry => {
          // 監聽每一個目標元素
          const stores = store.getters.getCurrentMaskStores; // 口罩藥局的原始資料
          // 資料長度 > 10
          if (
            entry.isIntersecting &&
            stores.length - renderStoresNum > 10 &&
            loadingStatus.value === false
          ) {
            loadingStatus.value = true;
            setTimeout(() => {
              renderStoresNum += 10;
              renderStoresData.value = stores.slice(0, renderStoresNum);
              loadingStatus.value = false;
            }, 500);
          }

          // 資料長度 < 10
          if (
            entry.isIntersecting &&
            stores.length - renderStoresNum < 10 &&
            loadingStatus.value === false
          ) {
            loadingStatus.value = true;
            setTimeout(() => {
              renderStoresData.value = stores.slice(
                0,
                stores.length - renderStoresNum
              );
              observer.unobserve(listEnd);
              loadingStatus.value = false;
            }, 500);
          }
        });
      };

      const observer = new IntersectionObserver(callback, options); // 建立監聽者
      observer.observe(listEnd); // 綁定監聽對象
    };

    /**
     * 篩選口罩類型
     */
    const filterMaskStores = status => {
      filterBtnStatus.value = status;
      store.dispatch("filterMaskStores", status);
    };

    /**
     * 搜尋關鍵字
     */
    const searchMaskStores = () => {
      let value = searchValue.value;
      const regex = /^[0-9\uFF10-\uFF19\u4e00-\u9fa5]*$/g;

      if (value === "") { errorMsg.value = "搜尋框不可為空"; return; }
      if (!regex.test(value)) { errorMsg.value = "搜尋框只可填入數字、中文，不包含空格"; return; }

      errorMsg.value = "";

      if (value.includes("台")) value = value.replace("台", "臺");
      value = halfToFull(value);

      store.dispatch("searchMaskStores", value);
    };

    /**
     * 將字串從半型轉全型
     */
    const halfToFull = str => {
      let len = str.length;
      let res = [];
      for (let i = 0; i < len; i++) {
        let c = str.charCodeAt(i);
        if (c >= 0x21 && c <= 0x7e) {
          res.push(String.fromCharCode(c + 65248));
        } else {
          res.push(str[i]);
        }
      }
      return res.join("");
    };

    return {
      sidebarStatus,
      sidebarController,
      filterBtnStatus,
      searchValue,
      filterMaskStores,
      searchMaskStores,
      renderStoresData,
      loadingStatus,
      today,
      canBuyMaskNum,
      errorMsg,
      searchResult
    };
  }
};
</script>

<template>
  <!-- Sidebar開啟按鈕 -->
  <div
    class="
      sidebar-btn
      cursor-pointer
      position-fixed
      start-0
      btn-primary
      text-white
      border-primary
    "
    @click="sidebarController(true)"
  >
    側邊欄
  </div>
  <!-- Sidebar本體 -->
  <div
    class="sidebar position-fixed top-0 bg-white mw-400px vh-100"
    :class="{ 'close-sidebar': !sidebarStatus }"
  >
    <!-- Sidebar 上半部 -->
    <div class="container-fuild">
      <div class="row px-3 py-2">
        <div
          class="col-12 d-flex justify-content-between align-items-center mb-4"
        >
          <div class="fs-4 fw-bold">
            口罩地圖
            <span class="fs-8 fw-normal text-gray-500 ms-2">{{ today }}</span>
          </div>
          <button
            type="button"
            class="btn-close fs-8"
            aria-label="Close"
            @click="sidebarController(false)"
          ></button>
        </div>
        <div class="col-12 mt-1 d-flex mb-4">
          <img src="../assets/icon/doctor-icon.svg" alt="" />
          <div class="d-flex flex-column ms-4">
            <div class="text-primary fs-4 fw-bold mb-1">貼心小提醒</div>
            <div class="text-gray-700 mb-1">今天是身分證末一碼為</div>
            <div class="text-orange mb-1 fs-5">
              「<span class="text-orange-400 fw-bold">{{ canBuyMaskNum }}</span
              >」
            </div>
            <div class="text-gray-700 mb-1">的民眾才能購買口罩哦 !</div>
          </div>
        </div>
        <!-- 搜尋與篩選 -->
        <div class="col-12">
          <!-- 搜尋框 -->
          <div class="input-group flex-nowrap my-2">
            <input
              type="text"
              class="form-control"
              v-model.trim="searchValue"
              @keyup.enter="searchMaskStores"
              placeholder="搜尋區域 , 地址 , 藥局"
              aria-describedby="addon-wrapping"
            />
            <span
              class="input-group-text bg-secondary text-white cursor-pointer"
              id="addon-wrapping"
              @click="searchMaskStores"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                />
              </svg>
            </span>
          </div>
          <div
            class="alert alert-warning d-flex align-items-center py-2"
            role="alert"
            v-if="errorMsg !== ''"
          >
            <div class="fs-7 text-danger">
              {{ errorMsg }}
            </div>
          </div>
          <!-- 篩選按鈕 -->
          <div class="d-flex mt-3 justify-content-around">
            <button
              type="button"
              class="btn border-secondary"
              :class="{ 'btn-active': filterBtnStatus === 'all' }"
              @click="filterMaskStores('all')"
            >
              所有口罩
            </button>
            <button
              type="button"
              class="btn border-secondary"
              :class="{ 'btn-active': filterBtnStatus === 'adult' }"
              @click="filterMaskStores('adult')"
            >
              成人口罩
            </button>
            <button
              type="button"
              class="btn border-secondary"
              :class="{ 'btn-active': filterBtnStatus === 'child' }"
              @click="filterMaskStores('child')"
            >
              兒童口罩
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Sidebar 下半部 -->
    <div class="container-fuild p-3 store-group-container">
      <div class="row">
        <div class="col-12">
          <SidebarStoreCard :maskStores="renderStoresData" />
          <div class="text-center" v-show="loadingStatus">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">loadingStatus...</span>
            </div>
          </div>
          <div v-if="searchResult && !loadingStatus">
            這個區域現在沒有資料 (^～^;)
          </div>
          <div class="list-end"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cursor-pointer {
  cursor: pointer;
}
.sidebar-btn {
  top: 6em;
  z-index: 1000;
  writing-mode: vertical-lr;
  border-radius: 0 8px 8px 0;
  padding: 0.65em 0.7em;
}
.sidebar {
  z-index: 1500;
  transform: translateX(0%);
  transition: transform 0.35s;
}
.close-sidebar {
  transform: translateX(-100%);
}
.btn-active {
  background-color: #fd9843;
  color: #ffffff;
}

.store-group-container {
  height: calc(100vh - 330px);
  overflow-y: auto;

  /* width */
  &::-webkit-scrollbar {
    width: 8px;
    margin-left: 1rem;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #0c8da1;
    border-radius: 8px;
    transition: all 0.3s;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: lighten(#0c8da1, 10%);
    border-radius: 8px;
  }

  /* Handle on active */
  &::-webkit-scrollbar-thumb:active {
    background: darken(#0c8da1, 10%);
    border-radius: 8px;
  }
}
</style>
