<script>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import L from "leaflet";

export default {
  props: {
    maskStores: {
      type: Array,
      default: () => [],
    }
  },
  setup(props) {
    const store = useStore();
    const showStoreDistance = ref(false);
    let userLatlng = {};

    // 監聽父層的口罩資料是否有變動
    const stores = computed(() => {
      return props.maskStores;
    })

    // 儲存當前選擇的座標
    const flyToCoordinates = (lgn, lat) => {
      store.dispatch("setCoordinates", [lgn, lat]);
      store.dispatch("setCoordinatesSource", "store");
      store.dispatch("setSidebarStatus", false);
    };

    // 監聽 user經緯度
    const userCoordinates = computed(() => {
      return store.getters.getCoordinates;
    })

    // 當user經緯度 有變動時
    watch(userCoordinates, (nVal, oVal) => {
      if (nVal !== oVal && nVal !== []) {
        userLatlng.lat = userCoordinates.value[0];
        userLatlng.lng = userCoordinates.value[1];
        showStoreDistance.value = true;
      }
    })

    // 計算當前位置 與 藥局的距離
    const calculatedDistance = ({ latlng }) => {
      const distance = Math.round(L.CRS.Earth.distance(userLatlng, latlng));
      if (distance < 1000) return `${distance} 公尺`;
      return `${(distance / 1000).toFixed(1)} 公里`;
    }

    return {
      stores,
      flyToCoordinates,
      calculatedDistance,
      showStoreDistance
    };
  },
};
</script>

<template>
  <div
    class="
      container-fuild
      border
      store-card-box-shadow store-card-border-radius
      position-relative
      mb-4
    "
    v-for="store in stores"
    :key="store.properties.id"
  >
    <!-- 飛越地點的icon -->
    <span class="position-absolute top-1 end-1">
      <i
        class="bi bi-geo-alt-fill location-icon"
        @click="flyToCoordinates(
          store.geometry.coordinates[1],
          store.geometry.coordinates[0]
        )">
      </i>
    </span>

    <div class="row">
      <div class="col-12 px-4"></div>
      <!-- 藥局名稱 -->
      <div class="col-12 fs-3 text-store-name fw-bold px-4 pb-2 pt-3">
        {{ store.properties.name }}
      </div>
      <!-- 藥局的距離 -->
      <div class="col-12 px-4 pb-2" v-if="showStoreDistance">
        <i class="bi bi-cursor text-gray-600"></i>
        <span class="ms-2 text-gray-600 fs-7">
          {{ calculatedDistance({latlng: {lat: store.geometry.coordinates[1],lng: store.geometry.coordinates[0]} }) }}
        </span>
      </div>
      <!-- 藥局電話 -->
      <div class="col-12 px-4 pb-2">
        <i class="bi bi-telephone text-gray-600"></i>
        <span class="ms-2 text-gray-600 fs-7">{{ store.properties.phone }}</span>
      </div>
      <!-- 藥局地址 -->
      <div class="col-12 px-4 pb-2">
        <i class="bi bi-house-door text-gray-600"></i>
        <span class="ms-2 text-gray-600 fs-7">{{ store.properties.address }}</span>
      </div>
      <!-- 藥局口罩數 -->
      <div class="col-12">
        <div class="bg-mask-num store-card-bottom-border-radius">
          <span
            class="
              w-50
              fw-bold
              d-inline-block
              text-center
              store-card-bottom-padding
              border-end border-dark
              text-white
            "
            >成人 {{ store.properties.mask_adult }}</span
          >
          <span
            class="
              w-50
              fw-bold
              d-inline-block
              text-center
              store-card-bottom-padding
              text-white
            "
            >兒童 {{ store.properties.mask_child }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.store-card-box-shadow {
  box-shadow: 6px 6px 6px 1px #0000001a;
}
.store-card-border-radius {
  border-radius: 10px 10px 15px 15px;
}
.store-card-bottom-border-radius {
  border-radius: 0px 0px 15px 15px;
}
.store-card-bottom-padding {
  padding: 0.8rem 0;
}
.location-icon {
  font-size: 1.5rem;
  color: #ffc107;
  cursor: pointer;
}
</style>
