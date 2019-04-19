<template>
  <div class="app-wrapper">
    <div class="header">
      <Header />
    </div>
    <div class="main-container">
      <sidebar class="sidebar-container" />
      <app-main />
    </div>
  </div>
</template>

<script>
import { Header, Sidebar, AppMain } from "./components";

export default {
  name: "Layout",
  components: {
    Header,
    Sidebar,
    AppMain
  },
  methods: {}
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.app-wrapper {
  @clearfix();
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
  > .header {
    position: fixed;
    min-width: 1440px;
    width: 100%;
    top: 0;
    z-index: 1002;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
