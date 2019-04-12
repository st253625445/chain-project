<template>
  <div class="cloudPage">
    <el-row class="cloudPageBarcunt">
      <p class="title">产业链全国区域分布帕累托图</p>
      <cloudBar
        :data.sync="cloudBarData"
        :cloudLoading="thisLoading"
      ></cloudBar>
    </el-row>
    <cloudMap :data.sync="cloudBarData" :cloudLoading="thisLoading"></cloudMap>
  </div>
</template>

<script>
import cloudBar from "@/components/cloudPage/cloudBar";
import cloudMap from "@/components/cloudPage/cloudMap";
import { getDistribution } from "@/api/getData";
export default {
  data() {
    return {
      cloudBarData: {},
      thisLoading: true
    };
  },
  components: {
    cloudBar,
    cloudMap
  },
  mounted() {
    let _name = this.$route.query.nodeName;
    if (_name) {
      this.getIndustryDistribution(_name);
    }
  },
  methods: {
    // 获取产业云图数据
    async getIndustryDistribution(name) {
      let _opt = {
        name: name,
        type: 1
      };
      let _data = await getDistribution(_opt);
      if (_data.code === 200 && _data.data) {
        this.cloudBarData = _data.data;
      }
      this.thisLoading = false;
    }
  }
};
</script>

<style lang="less">
.cloudPage {
  width: 100%;
  padding: 20px;
  .cloudPageBarcunt,
  .cloudPageMapcunt,
  .cloudPageTablecunt {
    width: 100%;
    background: #fff;
    border: 1px solid #eeeeee;
    margin-bottom: 20px;
  }
  .title {
    text-indent: 20px;
    font-size: 16px;
    line-height: 60px;
    color: #1027ad;
  }
}
</style>
