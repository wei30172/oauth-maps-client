<template>
  <div v-if="dataList.length" class="pagination flex">
    <!-- prev -->
    <button @click="prevPage">prev</button>

    <!-- pages -->
    <div class="flex pagination_page">
      <button
        v-for="(item, index) in Math.ceil(dataList.length / perPage)"
        :key="item"
        @click="goToPage(item)"
        :class="{ active: page === index + 1 }"
      >
        {{ item }}
      </button>
    </div>

    <!-- next -->
    <button @click="nextPage">next</button>
  </div>
</template>

<script>
import { ref, computed, watchEffect, watch } from "vue";

export default {
  props: ["dataList"],
  setup(props, { emit }) {
    let page = ref(1);
    const perPage = 100;

    // current paginated data
    const paginatedData = computed(() =>
      props.dataList.slice((page.value - 1) * perPage, page.value * perPage)
    );

    // go to the prev page
    const prevPage = () => {
      if (page.value !== 1) {
        page.value -= 1;
      }
    };

    // go to the next page
    const nextPage = () => {
      if (page.value < props.dataList.length / perPage) {
        page.value += 1;
      }
    };

    // go to the current page
    const goToPage = (numPage) => {
      page.value = numPage;
    };

    watch(
      () => props.dataList,
      () => (page.value = 1)
    );

    watchEffect(() => {
      emit("getPaginatedData", paginatedData.value);
    });
    return { perPage, page, nextPage, prevPage, goToPage };
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/mixin/colors" as colors;

.pagination {
  background-color: colors.$background-dark;
  color: colors.$white;
  padding: 0rem 1rem 0.5rem;
  gap: 1rem;
  button {
    font-size: 1rem;
    font-weight: bold;
    background-color: transparent;
    color: colors.$white;
    padding: 0.2rem 0.5rem;
    margin: 0.2rem;
    border: 1px solid colors.$white;
    border-radius: 10%;
    cursor: pointer;
    &.active {
      color: colors.$secondary;
    }
    &:hover {
      color: colors.$secondary;
    }
  }
  .pagination_page {
    flex-wrap: wrap;
    button {
      width: 2rem;
    }
  }
}
</style>
