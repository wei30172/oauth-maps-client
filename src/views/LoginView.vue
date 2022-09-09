<template>
  <div class="login flex">
    <h1>Login</h1>
    <!-- error alert -->
    <ToastAlert v-if="errorMsg">
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
.login {
  flex-direction: column;
  gap: 2rem;
  .btn {
    background-color: #de5246;
    width: 200px;
  }
}
</style>
