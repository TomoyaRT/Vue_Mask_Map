<script>
import { onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import L from "leaflet";
import "leaflet.markercluster";

import { iconFilter } from "../plugins/leaflet";

export default {
  setup() {
    const store = useStore();
    let geoJSONLayer = {};

    /**
     * 觸發 領口罩的藥局分布資料 API
     */
    const getMaskStores = () => {
      store.dispatch("getMaskStores").then(res => {
        if (res.status === 200) {
          setInitMaskStores();
        }
      });
    };

    /**
     * 初始化地圖 (預設經緯度地點)
     */
    const setInitMaskStores = () => {
      store.dispatch("searchMaskStores", "臺北市");
    };

    /**
     * 設定地圖
     */
    const setMaskStores = (data, map) => {
      map.setView([25.052043, 121.5552104], 18);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map
      );

      var markers = new L.MarkerClusterGroup().addTo(map);

      for (let i = 0; data.length > i; i++) {
        markers.addLayer(
          L.marker(
            [data[i].geometry.coordinates[1], data[i].geometry.coordinates[0]],
            { icon: iconFilter(data[i]) }
          ).bindPopup(
            `
              <h3 class="fs-4 fw-bold mb-2">${data[i].properties.name}</h3>
              <p class="fs-8 m-0 mb-1">地址 | ${data[i].properties.address}</p>
              <p class="fs-8 m-0 mb-1">連絡電話 | ${data[i].properties.phone}</p>
              <p class="fs-8 m-0 mb-1">備註 | ${data[i].properties.note}</p>
              <p class="fs-8 m-0 mb-2 text-gray-500">資訊更新於 ${data[i].properties.updated} 天前</p>
              <div class="d-flex mb-2 justify-content-between">
                <button type="button" class="btn btn-secondary me-1 text-white w-47.5">成人口罩 ${data[i].properties.mask_adult} 個</button>
                <button type="button" class="btn btn-secondary text-white w-47.5">兒童口罩 ${data[i].properties.mask_child} 個</button>
              </div>
              <a href="https://www.google.com/search?q=${data[i].properties.name}" target="_blank"
                class="btn btn-primary text-white w-100 mb-2"> Google 關鍵字搜尋
              <a href="https://www.google.com/maps/search/${data[i].properties.name}/@${data[i].geometry.coordinates[1]},${data[i].geometry.coordinates[0]}" target="_blank"
                class="btn btn-success text-white w-100"> Google Map 路線導航
              `
          )
        );
      }
      geoJSONLayer = markers;
      map.addLayer(markers);
    };

    onMounted(() => {
      getMaskStores();

      const map = L.map("map");

      const data = computed(() => {
        return store.getters.getOriginMaskStores;
      });

      watch(data, (nVal, oVal) => {
        if (nVal !== oVal) {
          setMaskStores(data.value, map);
        }
        return;
      });

      const data2 = computed(() => {
        return store.getters.getCoordinates;
      });

      watch(data2, (oVal, nVal) => {
        if (oVal !== nVal) {
          map.flyTo(data2.value, 18);

          map.once("moveend", () => {
            geoJSONLayer.eachLayer(layer => {
              if (
                layer._latlng.lat === data2.value[0] &&
                layer._latlng.lng === data2.value[1]
              )
                layer.openPopup();
            });
          });
        }
      });
    });

    return {};
  }
};
</script>

<template>
  <div id="map"></div>
</template>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100vh;
}
</style>
