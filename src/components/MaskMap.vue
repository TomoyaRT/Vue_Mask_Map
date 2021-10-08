<script>
import { onMounted, inject } from "vue";
import L from "leaflet";
import "leaflet.markercluster";

export default {
  setup() {
    const axios = inject("axios");

    /**
     * 取得遠端API資料
     */
    const getMaskStores = () => {
      axios
        .get(
          "https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json"
        )
        .then((res) => {
          console.log(res.data.features);
          setMaskStores(res.data.features);

        })
        .catch((err) => {
          console.error(err.response);
        });
    };

    /**
     * 設定地圖
     */
    const setMaskStores = (data) => {
      let map = {};

      map = L.map("map", {
        center: [25.052137, 121.555235],
        zoom: 10,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
      }).addTo(map);

      let greenIcon = new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      var markers = new L.MarkerClusterGroup().addTo(map);

      for (let i = 0; data.length > i; i++) {
        markers.addLayer(
          L.marker([data[i].geometry.coordinates[1], data[i].geometry.coordinates[0]], { icon: greenIcon })
            .bindPopup(
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