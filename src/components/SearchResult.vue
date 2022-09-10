<template>
  <div class="searchresult">
    <ul v-if="paginatedData.length > 0">
      <li v-for="info in paginatedData" :key="info.id">
        <SearchResultInfo
          :info="info"
          @click="$emit('createUsermarker', [info.latitude, info.longitude])"
        />
      </li>
    </ul>
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
}
</style>
