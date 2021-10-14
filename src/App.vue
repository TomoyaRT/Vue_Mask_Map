<script>
import InstructionsForUse from "./components/InstructionsForUse.vue";
import UserLocation from "./components/UserLocation.vue";
import MaskMap from "./components/MaskMap.vue";
import Sidebar from "./components/Sidebar.vue";

export default {
  components: {
    InstructionsForUse,
    UserLocation,
    MaskMap,
    Sidebar,
  },
};
</script>

<template>
  <InstructionsForUse />
  <UserLocation />
  <MaskMap />
  <Sidebar />
</template>

<style lang="scss">
@import "assets/scss/main.scss";
* {
  font-family: "Noto Sans TC", sans-serif;
}
</style>