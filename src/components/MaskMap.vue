<script>
import { onMounted } from "vue";
import L from "leaflet";

export default {
  setup() {
    onMounted(() => {
      let map = {};

      map = L.map("map", {
        center: [22.604799, 120.2976256],
        zoom: 16,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
      }).addTo(map);

      L.marker([22.604799, 120.2976256])
        .addTo(map)
        .bindPopup(
          `
        <h3 class="fs-4 fw-bold mb-2">延吉大藥局</h3>
        <p class="fs-8 m-0 mb-1">臺北市大安區延吉街 1 5 3 號 1 樓</p>
        <p class="fs-8 m-0 mb-1">營業時間 | 09:00 - 22:30</p>
        <p class="fs-8 m-0 mb-1">連絡電話 | (02)2781-9227</p>
        <p class="fs-8 m-0 mb-2 text-gray-500">資訊更新於 12 天前</p>
        <div class="d-flex mb-2">
          <button type="button" class="btn btn-secondary me-2 text-white">成人口罩 600 個</button>
          <button type="button" class="btn btn-secondary text-white">兒童口罩 1980 個</button>
        </div>
        <button type="button" class="btn btn-primary w-100 mb-2 text-white"
          data-bs-toggle="modal" data-bs-target="#exampleModal">詳細資訊</button>
        <a href="http://maps.google.com/?q=22.604799, 120.2976256" target="_blank"
          class="btn btn-success text-white w-100"> Google 路線導航
        `
        );
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
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">...</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
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