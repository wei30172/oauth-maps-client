<template>
  <div class="login flex">
    <h1>Login</h1>
    <a class="btn" :href="href">Google Login</a>
  </div>
</template>

<script>
import { ref } from "vue";
import getGoogleOAuthURL from "@/utils/getGoogleUrl";

export default {
  setup() {
    const href = ref(getGoogleOAuthURL());

    return { href };
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
