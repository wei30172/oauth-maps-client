<template>
  <div class="login flex">
    <h1>Login</h1>
    <!-- alert -->
    <ToastAlert v-if="errorMsg" type="error">
      <p>{{ errorMsg }}</p>
    </ToastAlert>

    <!-- login button -->
    <a class="btn" :href="href">Google Login</a>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import ToastAlert from "@/components/ToastAlert.vue";
import getGoogleOAuthURL from "@/utils/getGoogleUrl";

export default {
  components: { ToastAlert },
  setup() {
    const route = useRoute();
    const href = ref(getGoogleOAuthURL());
    const errorMsg = ref(route.query.errorMsg);

    watchEffect(() => {
      setTimeout(() => {
        errorMsg.value = null;
      }, 2000);
    });

    return { href, errorMsg };
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/mixin/colors" as colors;
.login {
  flex-direction: column;
  gap: 2rem;
  .btn {
    background-color: colors.$google-primary;
    width: 200px;
  }
}
</style>
