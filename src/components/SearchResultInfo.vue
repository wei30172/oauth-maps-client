<template>
  <div class="info flex box-shadow">
    <div class="info-item">
      <h3>{{ info.stop_name }}</h3>
      <span>【{{ info.latitude }}, {{ info.longitude }}】</span>
    </div>
    <div class="info-item flex distance">
      <h3>{{ info.distance }}</h3>
      <span>km</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["info"],
};
</script>

<style lang="scss" scoped>
@use "../styles/mixin/_colors.scss" as colors;
.info {
  width: 100%;
  justify-content: space-between;
  padding: 1rem;
  margin: 1rem auto;
  .distance {
    color: colors.$blue-700;
    h3 {
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }
  }
}
</style>
