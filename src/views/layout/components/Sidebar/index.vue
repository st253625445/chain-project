<template>
  <el-aside>
    <div class="chainName">{{ $route.query.nodeName }}</div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :show-timeout="200"
        :default-active="defaultActive"
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
    defaultActive() {
      let pathList = this.$router.options.routes[3].children;
      let _return = "";
      for (let i = 0; i < pathList.length; i++) {
        if (this.$route.path === `/${pathList[i].path}`) {
          if (pathList[i].meta.activePath) {
            _return = `/${pathList[i].meta.activePath}`;
          } else {
            _return = this.$route.path;
          }
          break;
        }
      }
      return _return;
    },
    routes() {
      return this.$router.options.routes;
    },
    thisQuery() {
      return this.$route.query;
    }
  }
};
</script>
