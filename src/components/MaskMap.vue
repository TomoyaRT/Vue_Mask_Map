<script>
import { onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import L from "leaflet";
import "leaflet.markercluster";

import { createPopup, iconFilter } from "../plugins/leaflet";

export default {
  setup() {
    const store = useStore();
    let markerData;
    let userPositionSave = false;

    /**
     * 取得 藥局資料
     */
    const getMaskStores = map => {
      store.dispatch("getMaskStores").then(res => {
        if (res.status === 200) {
          initMap(map, res.data.features);
        }
      });
    };

    /**
     * 初始化地圖的設定
     */
    const initMap = (map, data) => {
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map
      ); // 圖層來源
      map.setView([25.052137, 121.555235], 13); // 地圖初始 位置&縮放大小
      let markers = new L.MarkerClusterGroup({
        disableClusteringAtZoom: 16
      }).addTo(map); // 將圖標彙整成群組型態

      // 創建每一個圖標&圖標模板
      for (let i = 0; data.length > i; i++) {
        const lat = data[i].geometry.coordinates[1];
        const lng = data[i].geometry.coordinates[0];

        markers.addLayer(
          L.marker([lat, lng], { icon: iconFilter(data[i]) }).bindPopup(
            createPopup(data[i])
          )
        );
      }
      markerData = markers;
      // 將圖標掛載在圖層上
      map.addLayer(markers);

      // 預設經緯度地點
      store.dispatch("searchMaskStores", "臺北市");
    };

    onMounted(() => {
      const map = L.map("map"); // 建立地圖、綁定目標DOM元素
      getMaskStores(map);

      // 取得 座標
      const coordinates = computed(() => {
        return store.getters.getCoordinates;
      });

      // 取得 座標來源
      const source = computed(() => {
        return store.getters.getCoordinatesSource;
      });

      watch([source, coordinates], (oVal, nVal) => {
        if (oVal === nVal) return;
        map.flyTo(coordinates.value, 16);

        // 藥局位置
        if (source.value === "store") {
          map.once("moveend", () => {
            markerData.eachLayer(layer => {
              const lat = layer._latlng.lat;
              const lng = layer._latlng.lng;
              if (lat === coordinates.value[0] && lng === coordinates.value[1])
                layer.openPopup();
            });
          });
          return;
        }

        // 使用者位置
        if (source.value === "user") {
          if (!userPositionSave) {
            markerData
              .addLayer(
                L.marker(coordinates.value, { icon: iconFilter('user') }).bindPopup(
                  "現在位置"
                )
              )
              .openPopup();
            userPositionSave = true;
          }
          markerData.eachLayer(layer => {
            const lat = layer._latlng.lat;
            const lng = layer._latlng.lng;
            map.once("moveend", () => {
              if (lat === coordinates.value[0] && lng === coordinates.value[1])
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
