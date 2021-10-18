<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    maskStores: {
      type: Array,
      default: () => [],
    }
  },
  setup(props) {
    const store = useStore();
    const stores = computed(() => {
      return props.maskStores;
    })

    // 儲存當前選擇的座標
    const flyToCoordinates = (lgn, lat) => {
      store.dispatch("setCoordinates", [lgn, lat]);
      store.dispatch("setCoordinatesSource", "store");
      store.dispatch("setSidebarStatus", false);
    };

    return {
      stores,
      flyToCoordinates,
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
    <span class="position-absolute top-1 end-1">
      <svg
        @click="
          flyToCoordinates(
            store.geometry.coordinates[1],
            store.geometry.coordinates[0]
          )
        "
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="currentColor"
        class="bi bi-geo-alt-fill location-icon-color"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
        />
      </svg>
    </span>

    <div class="row">
      <div class="col-12 px-4"></div>
      <div class="col-12 fs-3 text-store-name fw-bold px-4 pb-2 pt-3">
        {{ store.properties.name }}
      </div>
      <div class="col-12 px-4 pb-2">
        <svg
          data-v-ca0da258=""
          viewBox="0 0 16 16"
          width="1em"
          height="1em"
          focusable="false"
          role="img"
          alt="icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi-phone align-middle b-icon bi text-gray-600"
        >
          <g data-v-ca0da258="">
            <path
              fill-rule="evenodd"
              d="M11 1H5a1 1 0 00-1 1v12a1 1 0 001 1h6a1 1 0 001-1V2a1 1 0 00-1-1zM5 0a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V2a2 2 0 00-2-2H5z"
              clip-rule="evenodd"
            ></path>
            <path
              fill-rule="evenodd"
              d="M8 14a1 1 0 100-2 1 1 0 000 2z"
              clip-rule="evenodd"
            ></path>
          </g>
        </svg>
        <span class="ms-2 text-gray-600 fs-7">{{ store.properties.phone }}</span>
      </div>
      <div class="col-12 px-4 pb-2">
        <svg
          data-v-ca0da258=""
          viewBox="0 0 16 16"
          width="1em"
          height="1em"
          focusable="false"
          role="img"
          alt="icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi-house align-middle b-icon bi text-gray-600"
        >
          <g data-v-ca0da258="">
            <path
              fill-rule="evenodd"
              d="M2 13.5V7h1v6.5a.5.5 0 00.5.5h9a.5.5 0 00.5-.5V7h1v6.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 13.5zm11-11V6l-2-2V2.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z"
              clip-rule="evenodd"
            ></path>
            <path
              fill-rule="evenodd"
              d="M7.293 1.5a1 1 0 011.414 0l6.647 6.646a.5.5 0 01-.708.708L8 2.207 1.354 8.854a.5.5 0 11-.708-.708L7.293 1.5z"
              clip-rule="evenodd"
            ></path>
          </g>
        </svg>
        <span class="ms-2 text-gray-600 fs-7">{{ store.properties.address }}</span>
      </div>
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
.location-icon-color {
  cursor: pointer;
  color: #ffc107;
}
</style>