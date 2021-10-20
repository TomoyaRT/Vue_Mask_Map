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
      <div class="mw-400px text-gray-400 mb-4">
        <div class="text-center mb-3 fs-4 text-white">口罩地圖</div>
        <ul>
          <li>
            <span>右上角</span>
            <img src="../assets/icon/locate-icon.svg" width="30" />
            <span>自動定位當前位置並搜尋附近藥局</span>
          </li>
          <li class="mb-2">點開左方側邊欄，可自定義搜尋口罩的地點</li>
          <li class="mb-2">
            依照藥局的庫存量在地圖上顯示
            <span class="text-store-name me-1">不</span>
            <span class="text-warning me-1">同</span>
            <span class="text-danger me-1">顏</span>
            <span class="text-white-50 me-1">色</span>
            的標記
            <ul class="my-2 ps-4">
              <li class="mb-1">
                <img src="../assets/icon/more-icon.svg" width="16" /> 非常充足 (3000以上)
              </li>
              <li class="mb-1">
                <img src="../assets/icon/average-icon.svg" width="16" /> 普通 (2000-3000)
              </li>
              <li class="mb-1">
                <img src="../assets/icon/less-icon.svg" width="16" /> 少量 (1000-2000)
              </li>
              <li class="mb-1">
                <img src="../assets/icon/soldout-icon.svg" width="16" /> 稀少 (1000以下)
              </li>
            </ul>
          </li>
          <li class="mb-2">改善地圖圖標的顯示，優化使用者體驗與網頁效能</li>
          <li>此網站在電腦、平板、手機皆能正常顯示與使用</li>
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overlay-style {
  opacity: .8;
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