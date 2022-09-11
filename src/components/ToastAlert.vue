<template>
  <div class="toast-alert-container">
    <div
      class="toast-alert"
      :class="{
        success: type === 'success',
        error: type === 'error',
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ["type"],
};
</script>

<style lang="scss" scoped>
@use "../styles/mixin/colors" as colors;
.toast-alert-container {
  z-index: 99;
  width: 50%;
  position: relative;
  .toast-alert {
    width: 100%;
    top: -30px;
    position: absolute;
    padding: 0.5rem;
    border-radius: 0.5rem;
    text-align: center;
    color: colors.$white;
    background-color: colors.$secondary;
    &.success {
      background-color: colors.$success-primary;
    }
    &.error {
      background-color: colors.$danger-primary;
    }
  }
}
</style>
