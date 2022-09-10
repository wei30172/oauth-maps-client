<template>
  <div class="searchzone">
    <form @submit.prevent="handleSubmit" class="flex">
      <input
        class="search-input"
        type="text"
        placeholder="請輸入要查詢的站名"
        v-model="keyword"
      />
      <div class="search-icon cursor-pointer" @click="handleSubmit">
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
  setup(props, { emit }) {
    const keyword = ref(null);
    const handleSubmit = () => {
      emit("searchByKeyword", keyword.value);
      keyword.value = null;
    };

    return { keyword, handleSubmit };
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/mixin/_colors.scss" as colors;
@use "../styles/mixin/screens" as screens;
.searchzone {
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: 1rem;
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
@include screens.tablet {
  .searchzone {
    width: 60%;
  }
}
</style>
