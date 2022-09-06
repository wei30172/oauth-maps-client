<template>
  <div class="profile">
    <h1>Profile</h1>
    <div v-if="authIsReady">
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
import { ref } from "vue";

export default {
  setup() {
    const error = ref(null);

    const handleFacebookLogin = async () => {
      try {
        // user bind
      } catch (err) {
        error.value = err.message;
      }
    };

    return {
      user: {
        email: "test@gmail.com",
        name: "claire",
      },
      authIsReady: true,
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
  .img {
  }
}
</style>
