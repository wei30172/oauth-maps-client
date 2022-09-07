<template>
  <div class="profile flex">
    <h1>Profile</h1>
    <div v-if="user" class="profile_info flex">
      <a class="btn" :href="href">Bind Facebook</a>
      <img :src="user.picture" :alt="user.name" />
      <ul>
        <li>Gmail: {{ user.email }}</li>
        <li>Google name: {{ user.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import getFaceBookOAuthURL from "@/utils/getFaceBookUrl";
import { getFBInfo } from "@/api/auth";

export default {
  setup() {
    const store = useStore();
    const href = ref(getFaceBookOAuthURL());

    onMounted(async () => {
      const fbinfo = await getFBInfo();
      console.log(fbinfo);

      if (fbinfo) {
        const userInfo = {
          fbName: fbinfo.name,
          fbEmail: fbinfo.email,
          fbPicture: fbinfo.picture?.data?.url,
        };
        store.commit("setUser", userInfo);
      }
    });

    return {
      user: computed(() => store.state.user),
      href,
    };
  },
};
</script>

<style lang="scss" scoped>
.profile {
  flex-direction: column;
  gap: 2rem;
  .profile_info {
    flex-direction: column;
    gap: 1rem;
    .btn {
      background-color: #1778f2;
      width: 200px;
    }
    img {
      border-radius: 50%;
    }
  }
}
</style>
