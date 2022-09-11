<template>
  <div class="profile flex">
    <h1>Profile</h1>

    <!-- alert -->
    <ToastAlert v-if="errorMsg" type="error">
      <p>{{ errorMsg }}</p>
    </ToastAlert>

    <!-- profile info (facebook) -->
    <div class="profile_info">
      <div v-if="fbUserID">
        <img :src="getFaceBookPicture(fbUserID)" alt="userpicture" />
        <button class="btn" @click="handleUnbind">Unbind Facebook</button>
      </div>
      <div v-else><a class="btn" :href="href">Bind Facebook</a></div>
    </div>

    <!-- profile info (google) -->
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
import { getFBInfo, userUnbind } from "@/api/auth";
import getFaceBookOAuthURL from "@/utils/getFaceBookUrl";
import getFaceBookPicture from "@/utils/getFaceBookPicture";

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
      getFaceBookPicture,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/mixin/colors" as colors;
.profile {
  flex-direction: column;
  gap: 2rem;
  .profile_info {
    flex-direction: column;
    gap: 1rem;
    img {
      border-radius: 50%;
    }
    .loading {
      .loading_icon {
        width: 30px;
        height: 30px;
      }
    }
    .btn {
      background-color: colors.$facebook-primary;
      width: 200px;
    }
  }
}
</style>
