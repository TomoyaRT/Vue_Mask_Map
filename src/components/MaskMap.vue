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

      L.marker([22.604799, 120.2976256]).addTo(map);
    });

    return {};
  },
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