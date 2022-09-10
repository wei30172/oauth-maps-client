<template>
  <nav class="navbar">
    <div class="navbar_menu flex">
      <!-- mobile or pc menu -->
      <ul
        :class="{
          navbar_menu_mobile: showMobMenu,
          navbar_menu_pc: !showMobMenu,
        }"
      >
        <!-- for all users -->
        <li class="cursor-pointer">
          <router-link to="/">Home</router-link>
        </li>

        <!-- for logged out users -->
        <div v-if="!user" class="flex">
          <li class="cursor-pointer">
            <router-link to="/login">Login</router-link>
          </li>
        </div>

        <!-- for logged in users -->
        <div v-if="user" :class="{ flex: !showMobMenu }">
          <li class="cursor-pointer">
            <router-link to="/map">Map</router-link>
          </li>
          <li class="cursor-pointer">
            <router-link to="/profile">Profile</router-link>
          </li>
          <li>
            <button @click="handleLogout" class="cursor-pointer">Logout</button>
          </li>
          <li>
            <span>Hi, {{ user.name }}</span>
          </li>
        </div>
      </ul>

      <!-- hamburger -->
      <div @click="toggleMenu" class="navbar_hamburger">
        <CloseIcon class="navbar_icon cursor-pointer" v-if="showMobMenu" />
        <MenuIcon class="navbar_icon cursor-pointer" v-else />
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import MenuIcon from "@/features/Icons/MenuIcon.vue";
import CloseIcon from "@/features/Icons/CloseIcon.vue";
import { userLogout } from "@/api/auth";

export default {
  components: { MenuIcon, CloseIcon },

  setup() {
    const store = useStore();
    const router = useRouter();
    const showMobMenu = ref(false);

    const handleLogout = async () => {
      await userLogout();
      store.commit("setUser", null);
      router.push("/");
    };

    const toggleMenu = () => {
      showMobMenu.value = !showMobMenu.value;
    };
    return {
      user: computed(() => store.state.user),
      showMobMenu,
      handleLogout,
      toggleMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/mixin/colors" as colors;
@use "../styles/mixin/screens" as screens;
.navbar {
  width: 100%;
  height: 60px;
  display: grid;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 20;
  padding: 0 2rem;
  background-color: colors.$primary;
  color: colors.$white;
  button {
    font-size: 1rem;
    font-weight: bold;
    background-color: transparent;
    color: colors.$white;
    &:hover {
      color: colors.$secondary;
    }
  }
  .navbar_menu_pc {
    display: none;
    ul {
      display: flex;
      li {
        padding: 0 1rem;
      }
    }
  }
  .navbar_menu_mobile {
    width: 66%;
    height: 100vh;
    position: absolute;
    top: 0;
    right: 0;
    padding-top: 5rem;
    background-color: colors.$background-dark-opacity;
    color: colors.$white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    li {
      text-align: center;
      padding: 1rem 0;
      line-height: 1.75rem;
    }
  }
  .navbar_hamburger {
    z-index: 20;
    display: block;
    .navbar_icon {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 20px;
      height: 20px;
      &:hover {
        color: colors.$secondary;
      }
    }
  }
  .navbar_hidden {
    display: none;
  }
}

@include screens.tablet {
  .navbar {
    .navbar_menu_pc {
      display: flex;
      li {
        padding: 0 1rem;
      }
    }
    .navbar_hamburger {
      display: none;
    }
    .navbar_menu_mobile {
      width: 33%;
    }
  }
}
</style>
