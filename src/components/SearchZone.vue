<template>
  <div class="searchzone">
    <form @submit.prevent="$emit('handleClick', queryIp)" class="flex">
      <input
        class="search-input"
        type="text"
        placeholder="Enter the address or leave it empty to get your current position."
        v-model="queryIp"
      />
      <div
        class="search-icon cursor-pointer"
        @click="$emit('handleClick', queryIp)"
      >
        <SearchIcon />
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import SearchIcon from "@/features/Icons/SearchIcon.vue";

export default {
  components: { SearchIcon },
  setup() {
    const queryIp = ref("");
    return { queryIp };
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/mixin/_colors.scss" as colors;
.searchzone {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: 1rem;
  background-color: colors.$background-dark;
  form {
    width: 100%;
  }
  .search-input {
    width: 100%;
    max-width: 760px;
    display: flex;
    flex: 1 1 0%;
    padding: 1rem;
    background-color: colors.$white;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  .search-icon {
    background-color: colors.$primary;
    color: colors.$white;
    width: 3rem;
    height: 3rem;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
}
</style>
