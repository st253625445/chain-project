<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <div v-for="(item, index) in item.children" :key="index">
      <router-link
        v-if="!item.hidden"
        :to="{ path: resolvePath(item.path), query: query }"
      >
        <el-menu-item :index="resolvePath(item.meta.activePath)">
          <svg-icon
            v-if="item.meta && item.meta.icon"
            :icon-class="item.meta.icon"
          />
          <span v-if="item.meta && item.meta.title" slot="title">{{
            item.meta.title
          }}</span>
        </el-menu-item>
      </router-link>
    </div>
  </div>
</template>

<script>
import path from "path";

export default {
  name: "SidebarItem",
  props: {
    // route配置json
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ""
    },
    query: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    resolvePath(...paths) {
      return path.resolve(this.basePath, ...paths);
    }
  }
};
</script>
