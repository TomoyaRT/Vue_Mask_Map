<script>
import { ref } from "vue";

import SidebarStoreCard from "../components/SidebarStoreCard.vue";

export default {
  components: {
    SidebarStoreCard,
  },
  setup() {
    const sidebarStatus = ref(false);
    const filterBtn = ref('all');

    return {
      sidebarStatus,
      filterBtn,
    };
  },
};
</script>

<template>
  <!-- Sidebar開啟按鈕 -->
  <div
    class="
      sidebar-btn
      position-fixed
      start-0
      btn-primary
      text-white
      border-primary
    "
    @click="sidebarStatus = true"
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
            <span class="fs-8 fw-normal text-gray-500">資料更新於 : 0 秒前</span>
          </div>
          <button
            type="button"
            class="btn-close fs-8"
            aria-label="Close"
            @click="sidebarStatus = false"
          ></button>
        </div>
        <div class="col-12 mt-1 d-flex mb-4">
          <img src="../assets/icon/doctor-icon.svg" alt="" />
          <div class="d-flex flex-column ms-4">
            <div class="text-primary fs-4 fw-bold mb-1">貼心小提醒</div>
            <div class="text-gray-700 mb-1">今天是身分證末一碼為</div>
            <div class="text-orange mb-1 fs-5">
              「<span class="text-orange-400 fw-bold"> 2、4、6、8、0</span>」
            </div>
            <div class="text-gray-700 mb-1">的民眾才能購買口罩哦 !</div>
          </div>
        </div>
        <!-- 搜尋與篩選 -->
        <div class="col-12">
          <!-- 搜尋框 -->
          <input
            type="text"
            class="form-control rounded-pill border-primary"
            placeholder="搜尋區域 , 地址 , 藥局"
            aria-label="search-key-words"
          >
          <!-- 篩選按鈕 -->
          <div class="d-flex mt-3 justify-content-around">
            <button
              type="button"
              class="btn border-primary"
              :class="{'btn-active': filterBtn === 'all'}"
              @click="filterBtn = 'all'"
            >
              所有口罩
            </button>
            <button
              type="button"
              class="btn border-primary"
              :class="{'btn-active': filterBtn === 'adult'}"
              @click="filterBtn = 'adult'"
            >
              成人口罩
            </button>
            <button
              type="button"
              class="btn border-primary"
              :class="{'btn-active': filterBtn === 'child'}"
              @click="filterBtn = 'child'"
            >
              兒童口罩
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- Sidebar 下半部 -->
    <div class="container-fuild p-3 store-group-container">
      <div class="row m-0">
        <div class="col-12">
          <SidebarStoreCard />
        </div>
        <div class="col-12">
          <SidebarStoreCard />
        </div>
        <div class="col-12">
          <SidebarStoreCard />
        </div>
        <div class="col-12">
          <SidebarStoreCard />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
  background-color: #139fb4;
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