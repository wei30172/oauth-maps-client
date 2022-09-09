<template>
  <div class="profile flex">
    <h1>Profile</h1>
    <!-- error alert -->
    <ToastAlert v-if="errorMsg">
      <p>{{ errorMsg }}</p>
    </ToastAlert>
    <!-- profile info -->
    <div class="profile_info flex">
      <img
        v-show="fbUserID"
        :src="`https://graph.facebook.com/${fbUserID}/picture?type=large`"
        alt="userpicture"
      />
      <button v-if="fbUserID" class="btn" @click="handleUnbind">
        Unbind Facebook
      </button>
      <a v-else class="btn" :href="href">Bind Facebook</a>
    </div>

    <div v-if="user" class="profile_info flex">
      <ul>
        <li>Gmail: {{ user.email }}</li>
        <li>Google name: {{ user.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import ToastAlert from "@/components/ToastAlert.vue";
import getFaceBookOAuthURL from "@/utils/getFaceBookUrl";
import { getFBInfo, userUnbind } from "@/api/auth";

export default {
  components: { ToastAlert },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const href = ref(getFaceBookOAuthURL());
    const fbUserID = ref(null);
    const errorMsg = ref(route.query.errorMsg);

    const getId = async () => {
      const info = await getFBInfo();
      if (info) fbUserID.value = info.id;
    };
    getId();

    const handleUnbind = async () => {
      await userUnbind();
      router.push({
        name: "empty",
      });
    };

    watchEffect(() => {
      setTimeout(() => {
        errorMsg.value = null;
      }, 2000);
    });

    return {
      user: computed(() => store.state.user),
      fbUserID,
      href,
      errorMsg,
      handleUnbind,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/mixin/colors" as colors;
.profile {
  flex-direction: column;
  gap: 2rem;
  .btn {
    background-color: colors.$facebook-primary;
    width: 200px;
  }
  img {
    border-radius: 50%;
  }
  .profile_info {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
