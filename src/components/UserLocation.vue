<script>
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const getUserLocaiton = () => {

      // 先確認使用者裝置能不能抓地點
      if(navigator.geolocation) {

        // 使用者不提供權限，或是發生其它錯誤
        const error = () => {
          alert('無法取得您的位置，請先確認是否開啟地理定位功能');
        }

        // 使用者允許抓目前位置，回傳經緯度
        const success = (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          store.dispatch("setCoordinates", [lat, lng]);
          store.dispatch("setCoordinatesSource", "user");
        }

        // 跟使用者拿所在位置的權限
        navigator.geolocation.getCurrentPosition(success, error);

      } else {
        alert('很抱歉, 您的裝置不支援地理位置功能。')
      }
    };

    return {
      getUserLocaiton
    };
  }
};
</script>

<template>
  <img
    @click="getUserLocaiton"
    src="@/assets/icon/locate-icon.svg"
    width="60"
    class="location position-fixed top-1 end-1 top-sm-2 end-sm-2 end-md-3"
    alt="取得使用者地理位置的圖示"
  />
</template>

<style lang="scss" scoped>
.location {
  z-index: 1000;
  cursor: pointer;
}
</style>
