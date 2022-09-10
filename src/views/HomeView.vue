<template>
  <div class="home flex">
    <h1>新北市都市更新地點查詢</h1>
    <router-link to="/login">
      <h3>(請先登入)</h3>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
};
</script>

<style lang="scss" scoped>
@use "../styles/mixin/colors" as colors;
.home {
  flex-direction: column;
  a {
    color: colors.$text-primary;
    &:hover {
      color: colors.$google-primary;
    }
  }
}
</style>
