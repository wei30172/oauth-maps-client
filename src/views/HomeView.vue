<template>
  <div class="home flex">
    <h1>新北市都市更新地點查詢</h1>
    <router-link v-if="user" to="/map">
      <h3>開始查詢</h3>
    </router-link>
    <router-link v-else to="/login">
      <h3>請先登入</h3>
    </router-link>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "HomeView",
  setup() {
    const store = useStore();
    return {
      user: computed(() => store.state.user),
    };
  },
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
