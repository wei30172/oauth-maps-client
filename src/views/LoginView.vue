<template>
  <div class="login">
    <h1>Login</h1>
    <button class="btn" @click="handleGoogleLogin">Google Login</button>
    <p v-if="error">Error: {{ error }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const error = ref(null);

    const handleGoogleLogin = async () => {
      try {
        await store.dispatch("googleLogin");
        router.push("/profile");
      } catch (err) {
        error.value = err.message;
      }
    };

    return {
      error,
      handleGoogleLogin,
    };
  },
};
</script>

<style lang="scss" scoped>
.login {
  .btn {
    background-color: #de5246;
    width: 200px;
  }
}
</style>
