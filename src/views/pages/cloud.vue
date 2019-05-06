<template>
  <div class="cloudPage">
    <el-row class="itemBox cloudPageBarcunt">
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
  created() {
    let _name = this.$route.query.nodeName;
    if (_name) {
      this.getIndustryDistribution(_name);
    } else {
      this.$router.push("/");
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
}
</style>
