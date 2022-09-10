<template>
  <div class="loading-modal page-flex">
    <LoadingIcon class="loading_icon" />
    <h1>Loading...</h1>
  </div>
</template>

<script>
import LoadingIcon from "@/features/Icons/LoadingIcon.vue";

export default {
  components: { LoadingIcon },

  props: ["type"],
};
</script>

<style lang="scss" scoped>
@use "../styles/mixin/colors" as colors;
.loading-modal {
  flex-direction: column;
  z-index: 99;
  background-color: #16161695;
  position: absolute;
  width: 100%;
  height: 100vh;
  color: colors.$white;
  .loading_icon {
    width: 20%;
    height: 20%;
  }
}
</style>
