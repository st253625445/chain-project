<template>
  <div class="cloudPage">
    <el-row class="cloudPageBarcunt">
      <p class="title">产业链全国区域分布帕累托图</p>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12" class="cloudPageMapcunt">
        <p class="title">产业链全国区域分布地图</p>
      </el-col>
      <el-col :span="12" class="cloudPageTablecunt">
        <p class="title">大区分布统计</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import cloudBar from "@/components/cloudPage/cloudBar";
// import cloudMap from "@/components/cloudPage/cloudMap";
export default {
  data() {
    return {};
  },
  components: {
    // cloudBar,
    // cloudMap
  }
};
</script>

<style lang="less">
.cloudPage {
  width: 100%;
  padding: 20px;
  .cloudPageBarcunt {
    width: 100%;
    background: #fff;
    border: 1px solid #eeeeee;
    margin-bottom: 20px;
  }
}
</style>
