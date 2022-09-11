<template>
  <div class="searchzone">
    <form @submit.prevent="handleSubmit" class="flex">
      <!-- input -->
      <input
        class="search-input"
        type="text"
        placeholder="Please enter the name of the station."
        v-model="keyword"
      />

      <!-- search icon -->
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
  padding: 0.5rem;
  form {
    width: 100%;
  }
  .search-input {
    width: 100%;
    max-width: 760px;
    display: flex;
    flex: 1 1 0%;
    padding: 0.8rem;
    background-color: colors.$white;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  .search-icon {
    background-color: colors.$primary;
    color: colors.$white;
    width: 2.7rem;
    height: 2.7rem;
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
