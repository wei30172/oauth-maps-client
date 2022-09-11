<template>
  <div class="loading-modal page-flex">
    <img src="@/assets/icon-loading.svg" class="loading_icon" />
    <h1>Loading...</h1>
  </div>
</template>

<script>
export default {
  props: ["type"],
};
</script>

<style lang="scss" scoped>
@use "../styles/mixin/colors" as colors;
.loading-modal {
  flex-direction: column;
  z-index: 99;
  background-color: colors.$background-dark-opacity;
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
