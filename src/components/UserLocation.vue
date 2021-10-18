<script>
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const getUserLocaiton = () =>
      {
        if (navigator.geolocation)
        {
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            store.dispatch("setCoordinates", [lat, lng]);
            store.dispatch("setCoordinatesSource", "user");
          });
        }
        else
        {
          alert('當前瀏覽器不支援獲取地理位置的功能');
        }
      }

    return {
      getUserLocaiton
    }
  }
};
</script>

<template>
  <img
    @click="getUserLocaiton"
    src="../assets/icon/locate-icon.svg"
    width="60"
    class="location position-fixed top-1 end-1 top-sm-2 end-sm-2 end-md-3"
  />
</template>

<style lang="scss" scoped>
.location {
  z-index: 1000;
  cursor: pointer;
}
</style>