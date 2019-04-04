<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <router-view />
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {}
};
</script>

<style scoped>
.app-main {
  /*60 = navbar  */
  min-height: calc(100vh - 60px);
  background: #fafafa;
  position: relative;
  overflow: hidden;
}
</style>
