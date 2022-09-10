<template>
  <div class="searchresult cursor-pointer">
    <ul>
      <li v-for="info in urbanRenewalData" :key="info.id">
        <SearchResultInfo
          :info="info"
          @click="$emit('handleClick', [info.latitude, info.longitude])"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import SearchResultInfo from "@/components/SearchResultInfo";

export default {
  props: ["urbanRenewalData"],
  components: { SearchResultInfo },
};
</script>

<style lang="scss" scoped>
@use "../styles/mixin/_colors.scss" as colors;
.searchresult {
  width: 100%;
}
</style>
