<template>
  <div class="profile">
    <h1>Profile</h1>
    <div v-if="authIsReady && user">
      <div v-if="!user?.fbAvatar">
        <button class="btn" @click="handleFacebookLogin">Bind Facebook</button>
        <p v-if="error">Error: {{ error }}</p>
      </div>
      <div v-else>
        <img :src="user?.fbAvatar" :alt="user?.name" />
      </div>
      <ul>
        <li v-for="(objKey, index) in Object.keys(user)" :key="index">
          {{ objKey }}: {{ user[objKey] }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const error = ref(null);

    const handleFacebookLogin = async () => {
      try {
        await store.dispatch("facebookLogin");
      } catch (err) {
        error.value = err.message;
      }
    };

    return {
      user: computed(() => store.state.user),
      authIsReady: computed(() => store.state.authIsReady),
      error,
      handleFacebookLogin,
    };
  },
};
</script>

<style lang="scss" scoped>
.profile {
  .btn {
    background-color: #1778f2;
    width: 200px;
  }
  img {
    border-radius: 50%;
  }
}
</style>
