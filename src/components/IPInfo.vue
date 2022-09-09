<template>
  <div class="ipinfo">
    <div class="ipinfo-item">
      <h3>IP Address</h3>
      <span>{{ ipInfo.address }}</span>
    </div>
    <div class="ipinfo-item">
      <h3>Location</h3>
      <span>{{ ipInfo.state }}</span>
    </div>
    <div class="ipinfo-item">
      <h3>Timezone</h3>
      <span>{{ ipInfo.timezone }}</span>
    </div>
    <div class="ipinfo-item">
      <h3>Isp</h3>
      <span>{{ ipInfo.isp }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["ipInfo"],
};
</script>

<style lang="scss" scoped>
@use "../styles/mixin/_colors.scss" as colors;
@use "../styles/mixin/screens" as screens;
.ipinfo {
  position: absolute;
  background-color: colors.$white;
  width: 100%;
  max-width: 760px;
  padding: 0.5rem;
  top: 2rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  z-index: 20;
  .ipinfo-item {
    display: flex;
    flex-direction: column;
    h3 {
      font-size: 0.6rem;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
    }
    span {
      font-size: 1.2rem;
    }
  }
}
</style>
