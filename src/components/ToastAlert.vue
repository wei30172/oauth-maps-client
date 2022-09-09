<template>
  <div class="toast-alert-container">
    <div class="toast-alert">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../styles/mixin/colors" as colors;
.toast-alert-container {
  width: 60%;
  position: relative;
  .toast-alert {
    width: 100%;
    top: -30px;
    position: absolute;
    padding: 0.5rem;
    border-radius: 0.5rem;
    text-align: center;
    color: colors.$white;
    background-color: colors.$danger-primary;
  }
}
</style>
