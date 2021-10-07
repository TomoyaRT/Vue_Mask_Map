<script>
import { ref } from "vue";

export default {
  setup() {
    const overlayStatus = ref(true);

    return {
      overlayStatus,
    };
  },
};
</script>

<template>
  <div
    class="
      overlay-style
      bg-overlay
      position-fixed
      top-0
      left-0
      w-100
      vh-100
      d-flex
      justify-content-center
      align-items-center
    "
    :class="{ 'close-overlay': !overlayStatus }"
  >
    <div class="w-95 w-sm-85 d-flex flex-column align-items-center">
      <div class="mw-400px text-gray-400">
        <div class="text-center mb-3 fs-4 text-white">口罩地圖</div>
        <ul>
          <li>
            右上角
            <img src="../assets/icon/locate-icon.svg" width="30" />
            可以自動定位並搜尋附近藥局
          </li>
          <li>可以自動定位並搜尋附近藥局</li>
          <li>
            依照藥局的庫存量在地圖上顯示
            <span class="text-success me-1">不</span>
            <span class="text-danger me-1">同</span>
            <span class="text-warning me-1">顏</span>
            <span class="text-white-50 me-1">色</span>
            的標記
            <ul>
              <li>
                <img src="../assets/icon/more-icon.svg" width="16" /> 充足
              </li>
              <li>
                <img src="../assets/icon/average-icon.svg" width="16" /> 普通
              </li>
              <li>
                <img src="../assets/icon/less-icon.svg" width="16" /> 少量
              </li>
              <li>
                <img src="../assets/icon/soldout-icon.svg" width="16" /> 售完
              </li>
            </ul>
          </li>
          <li>略微改善了搜尋方式，以減少載入資料的時間</li>
          <li>支援手機介面</li>
        </ul>
        <div class="text-center mb-2">
          <button
            type="button"
            class="btn btn-primary text-white"
            @click="overlayStatus = false"
          >
            我知道了
          </button>
        </div>
      </div>
      <div class="text-white text-end w-100 mb-3">
        <svg
          viewBox="0 0 16 16"
          width="1em"
          height="1em"
          focusable="false"
          role="img"
          alt="icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi-code-slash b-icon bi"
          data-v-ac418284=""
        >
          <g data-v-ac418284="">
            <path
              fill-rule="evenodd"
              d="M4.854 4.146a.5.5 0 010 .708L1.707 8l3.147 3.146a.5.5 0 01-.708.708l-3.5-3.5a.5.5 0 010-.708l3.5-3.5a.5.5 0 01.708 0zm6.292 0a.5.5 0 000 .708L14.293 8l-3.147 3.146a.5.5 0 00.708.708l3.5-3.5a.5.5 0 000-.708l-3.5-3.5a.5.5 0 00-.708 0zm-.999-3.124a.5.5 0 01.33.625l-4 13a.5.5 0 01-.955-.294l4-13a.5.5 0 01.625-.33z"
              clip-rule="evenodd"
            ></path>
          </g>
        </svg>
        Roger
      </div>
      <div class="text-white text-end w-100">
        <svg
          viewBox="0 0 16 16"
          width="1em"
          height="1em"
          focusable="false"
          role="img"
          alt="icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi-brush b-icon bi"
          data-v-ac418284=""
        >
          <g data-v-ac418284="">
            <path
              d="M15.213 1.018a.572.572 0 01.756.05.57.57 0 01.057.746C15.085 3.082 12.044 7.107 9.6 9.55c-.71.71-1.42 1.243-1.952 1.596-.508.339-1.167.234-1.599-.197-.416-.416-.53-1.047-.212-1.543.346-.542.887-1.273 1.642-1.977 2.521-2.35 6.476-5.44 7.734-6.411z"
            ></path>
            <path
              d="M7 12a2 2 0 01-2 2c-1 0-2 0-3.5-.5s.5-1 1-1.5 1.395-2 2.5-2a2 2 0 012 2z"
            ></path>
          </g>
        </svg>
        K.T
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overlay-style {
  opacity: .75;
  visibility: visible;
  z-index: 2000;
}
.close-overlay {
  opacity: 0;
  visibility: hidden;
  z-index: 0;
  transition: all .5s;
}
</style>