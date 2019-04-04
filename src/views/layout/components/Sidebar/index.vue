<template>
  <el-aside>
    <div class="chainName">产业链</div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :show-timeout="200"
        :default-active="$route.path"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.name"
          :item="route"
          :base-path="route.path"
          :query="thisQuery"
        />
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
import SidebarItem from "./SidebarItem";

export default {
  components: { SidebarItem },
  computed: {
    routes() {
      return this.$router.options.routes;
    },
    thisQuery() {
      return this.$route.query;
    }
  }
};
</script>
