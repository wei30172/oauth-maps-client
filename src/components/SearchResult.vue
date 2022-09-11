<template>
  <div class="searchresult">
    <!-- search result info -->
    <ul v-if="paginatedData.length">
      <li v-for="info in paginatedData" :key="info.id">
        <SearchResultInfo
          :info="info"
          @click="$emit('createUsermarker', [info.latitude, info.longitude])"
        />
      </li>
    </ul>

    <!-- no data -->
    <p v-else class="searchresult_none">No data to display.</p>
  </div>
</template>

<script>
import SearchResultInfo from "@/components/SearchResultInfo";

export default {
  props: ["paginatedData"],
  components: { SearchResultInfo },
};
</script>

<style lang="scss" scoped>
@use "../styles/mixin/_colors.scss" as colors;
.searchresult {
  width: 100%;
  .searchresult_none {
    width: 100%;
    text-align: center;
    padding: 1rem;
    margin: 1rem auto;
  }
}
</style>
