<template>
  <div class="map">
    <h1>Map</h1>
    <div v-if="authIsReady">
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
export default {
  setup() {
    return {
      user: {
        email: "test@gmail.com",
      },
      authIsReady: true,
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
