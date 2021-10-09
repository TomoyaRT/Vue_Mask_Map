<script>
import { onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import L from "leaflet";
import "leaflet.markercluster";
import { getIconColor } from "../methods/setIconColor";

export default {
  setup() {
    const store = useStore();

    /**
     * 觸發 領口罩的藥局分布資料 API
     */
    const getMaskStores = () => {
      store.dispatch("getMaskStores").then((res) => {
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
      map.setView([25.052137, 121.555235], 13);

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      ).addTo(map);

      var markers = new L.MarkerClusterGroup().addTo(map);

      for (let i = 0; data.length > i; i++) {
        markers.addLayer(
          L.marker(
            [data[i].geometry.coordinates[1], data[i].geometry.coordinates[0]],
            { icon: getIconColor("orange") }
          ).bindPopup(
            `
              <h3 class="fs-4 fw-bold mb-2">${data[i].properties.name}</h3>
              <p class="fs-8 m-0 mb-1">地址 | ${data[i].properties.address}</p>
              <p class="fs-8 m-0 mb-1">連絡電話 | ${data[i].properties.phone}</p>
              <p class="fs-8 m-0 mb-1">備註 | ${data[i].properties.note}</p>
              <p class="fs-8 m-0 mb-2 text-gray-500">資訊更新於 ${data[i].properties.updated} 天前</p>
              <div class="d-flex mb-2">
                <button type="button" class="btn btn-secondary me-1 text-white">成人口罩 ${data[i].properties.mask_adult} 個</button>
                <button type="button" class="btn btn-secondary text-white">兒童口罩 ${data[i].properties.mask_child} 個</button>
              </div>
              <button type="button" class="btn btn-primary w-100 mb-2 text-white"
                data-bs-toggle="modal" data-bs-target="#exampleModal">詳細資訊</button>
              <a href="https://www.google.com/maps/search/${data[i].properties.name}/@${data[i].geometry.coordinates[1]},${data[i].geometry.coordinates[0]}" target="_blank"
                class="btn btn-success text-white w-100"> Google 路線導航
              `
          )
        );
      }
      map.addLayer(markers);
    };

    onMounted(() => {
      getMaskStores();

      const map = L.map("map");

      const data = computed(() => {
        return store.getters.getMaskStores;
      });

      watch(data, (nVal, oVal) => {
        if (nVal !== oVal) {
          console.log(map);
          setMaskStores(data.value, map);
        }
        return;
      });
    });

    return {};
  },
};
</script>

<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">延吉大藥局</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">營業時間</th>
                <th scope="col">一</th>
                <th scope="col">二</th>
                <th scope="col">三</th>
                <th scope="col">四</th>
                <th scope="col">五</th>
                <th scope="col">六</th>
                <th scope="col">日</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">上午</th>
                <td>o</td>
                <td>o</td>
                <td>o</td>
                <td>o</td>
                <td>o</td>
                <td>o</td>
                <td>x</td>
              </tr>
              <tr>
                <th scope="row">下午</th>
                <td>o</td>
                <td>o</td>
                <td>o</td>
                <td>o</td>
                <td>o</td>
                <td>o</td>
                <td>x</td>
              </tr>
              <tr>
                <th scope="row">晚上</th>
                <td>o</td>
                <td>o</td>
                <td>o</td>
                <td>o</td>
                <td>o</td>
                <td>o</td>
                <td>x</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div id="map"></div>
</template>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100vh;
}
</style>