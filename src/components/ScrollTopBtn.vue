<template>
  <div class="scrolltop-container">
    <div class="scrolltop-btn" @click="$emit('goToElement')">
      <div className="scrolltop-btn_icon">
        <i className="arrow-up"></i>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../styles/mixin/colors" as colors;
.scrolltop-btn {
  cursor: pointer;
  position: fixed;
  z-index: 99;
  right: 0.5rem;
  bottom: 0.5rem;
  .scrolltop-btn_icon {
    width: 35px;
    height: 35px;
    background: colors.$secondary;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    .arrow-up {
      margin-top: 6px;
      border: solid colors.$white;
      border-width: 0 3px 3px 0;
      display: inline-block;
      padding: 6px;
      transform: rotate(-135deg);
      -webkit-transform: rotate(-135deg);
    }
  }
}
</style>
