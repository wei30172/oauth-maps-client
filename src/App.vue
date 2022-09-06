<template>
  <NavBar />
  <div class="container">
    <router-view />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding-top: 60px;
}
</style>
