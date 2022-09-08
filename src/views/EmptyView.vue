<template>
  <div class="empty"></div>
</template>

<script>
export default {
  name: "EmptyView",
  components: {},
  created() {
    this.$router.go(-1);
  },
};
</script>
