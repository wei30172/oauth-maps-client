<template>
  <div class="map flex">
    <h1>Map</h1>
    <router-link to="/profile">
      Please bind fb to see more content.
    </router-link>
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
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/mixin/colors" as colors;
.map {
  flex-direction: column;
  gap: 2rem;
  a {
    color: colors.$text-primary;
    &:hover {
      border-bottom: 2px solid colors.$text-primary;
    }
  }
}
</style>
