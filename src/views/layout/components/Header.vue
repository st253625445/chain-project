<template>
  <Header />
</template>

<script>
import Header from "@/components/common/headerNav";

export default {
  components: {
    Header
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style lang="less">
.navbar {
  height: 50px;
  border-radius: 0px !important;
  position: sticky;
  top: 0;
  z-index: 2;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
