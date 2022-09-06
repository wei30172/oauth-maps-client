<template>
  <div class="map">
    <h1>Map</h1>
    <div v-if="authIsReady && user">
      <div v-if="!user.fbAvatar">
        <router-link to="/profile">
          Please bind fb to see more content.
        </router-link>
      </div>
      <div v-else><p>Search</p></div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    return {
      user: computed(() => store.state.user),
      authIsReady: computed(() => store.state.authIsReady),
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/mixin/colors" as colors;
.map {
  a {
    color: colors.$text-primary;
  }
}
</style>
