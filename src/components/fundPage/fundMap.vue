<template>
  <div class="fundMapBox" v-loading="fundLoading">
    <div id="fundMap"></div>
    <div class="noData" v-if="!fundLoading && isNodata">无数据</div>
    <div class="typeSelect" v-if="!fundLoading && !isNodata">
      <el-select v-model="typeValue" placeholder="请选择" size="mini">
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts/map/js/china.js";
export default {
  props: ["data", "fundLoading"],
  data() {
    return {
      myCharts: {},
      typeOptions: [
        {
          label: "按区域统计",
          value: 1
        },
        {
          label: "按大区统计",
          value: 2
        }
      ],
      typeValue: 1,
      areaData: {
        华北: ["北京", "天津", "河北", "山西", "内蒙古"],
        华东: ["上海", "山东", "江苏", "安徽", "江西", "浙江", "福建", "台湾"],
        华中: ["湖北", "湖南", "河南"],
        华南: ["广东", "广西", "海南", "香港", "澳门"],
        西南: ["重庆", "四川", "贵州", "云南", "西藏"],
        西北: ["陕西", "甘肃", "宁夏", "新疆", "青海"],
        东北: ["黑龙江", "吉林", "辽宁"]
      },
      shortToName: [
        { name: "北京", area: "华北", short: "bj" },
        { name: "天津", area: "华北", short: "tj" },
        { name: "上海", area: "华东", short: "sh" },
        { name: "重庆", area: "西南", short: "cq" },
        { name: "河北", area: "华北", short: "hb" },
        { name: "河南", area: "华中", short: "hen" },
        { name: "云南", area: "西南", short: "yn" },
        { name: "辽宁", area: "东北", short: "ln" },
        { name: "黑龙江", area: "东北", short: "hlj" },
        { name: "湖南", area: "华中", short: "hun" },
        { name: "安徽", area: "华东", short: "ah" },
        { name: "山东", area: "华东", short: "sd" },
        { name: "新疆", area: "西北", short: "xj" },
        { name: "江苏", area: "华东", short: "js" },
        { name: "浙江", area: "华东", short: "zj" },
        { name: "江西", area: "华东", short: "jx" },
        { name: "湖北", area: "华中", short: "hub" },
        { name: "广西", area: "华南", short: "gx" },
        { name: "甘肃", area: "西北", short: "gs" },
        { name: "山西", area: "华北", short: "sx" },
        { name: "内蒙古", area: "华北", short: "nmg" },
        { name: "陕西", area: "西北", short: "snx" },
        { name: "吉林", area: "东北", short: "jl" },
        { name: "福建", area: "华东", short: "fj" },
        { name: "贵州", area: "西南", short: "gz" },
        { name: "广东", area: "华南", short: "gd" },
        { name: "青海", area: "西北", short: "qh" },
        { name: "西藏", area: "西南", short: "xz" },
        { name: "四川", area: "西南", short: "sc" },
        { name: "宁夏", area: "西北", short: "nx" },
        { name: "海南", area: "华南", short: "han" },
        { name: "台湾", area: "华东", short: "tw" },
        { name: "香港", area: "华南", short: "xg" },
        { name: "澳门", area: "华南", short: "am" }
      ],
      isNodata: false,
      maxValue1: 0,
      maxValue2: 0,
      optionData1: [],
      optionData2: []
    };
  },
  watch: {
    data: {
      handler: function(val) {
        if (this.myCharts.clear) {
          this.myCharts.clear();
        }
        this.optionData1 = [];
        this.optionData2 = [];
        this.splitData(val);
        this.$nextTick(() => {
          this.init();
        });
      },
      deep: true
    },
    typeValue: {
      handler: function() {
        if (this.myCharts.clear) {
          this.myCharts.clear();
        }
        this.$nextTick(() => {
          this.init();
        });
      }
    }
  },
  mounted() {
    this.myCharts = echarts.init(document.getElementById("fundMap"));
  },
  methods: {
    // 整理data
    splitData(data) {
      let keys = Object.keys(data);
      if (keys.length == 0) {
        this.isNodata = true;
        return false;
      }
      let baseData = data.baseStaticsMap;
      let areaData = data.areaStaticsMap;
      // type1
      this.maxValue1 = 0;
      for (let key in baseData) {
        this.optionData1.push({
          name: key,
          value: baseData[key] - 0
        });
        this.maxValue1 =
          this.maxValue1 < baseData[key] - 0
            ? baseData[key] - 0
            : this.maxValue1;
      }
      // type2
      this.maxValue2 = 0;
      for (let i = 0; i < this.shortToName.length; i++) {
        this.optionData2.push({
          name: this.shortToName[i].name,
          areaName: this.shortToName[i].area,
          value: areaData[this.shortToName[i].area]
        });
        this.maxValue2 =
          this.maxValue2 < areaData[this.shortToName[i].area] - 0
            ? areaData[this.shortToName[i].area] - 0
            : this.maxValue2;
      }
    },
    init() {
      if (this.isNodata) {
        return false;
      }
      let that = this;
      let myCharts = this.myCharts;
      let option = {
        tooltip: {
          trigger: "item",
          formatter: function(datas) {
            if (datas.data) {
              let _data = datas.data;
              if (_data.areaName) {
                let res = `${_data.areaName}<br/>占比：${
                  _data.value ? ((_data.value - 0) * 100).toFixed(2) : "0.00"
                }%`;
                return res;
              } else {
                let res = `${_data.name}<br/>占比：${
                  _data.value ? ((_data.value - 0) * 100).toFixed(2) : "0.00"
                }%`;
                return res;
              }
            }
          }
        },
        visualMap: [
          {
            type: "continuous",
            show: false,
            min: 0,
            max: this.typeValue === 1 ? this.maxValue1 : this.maxValue2,
            left: "left",
            top: "bottom",
            text: ["高", "低"], // 文本，默认为数值文本
            inRange: {
              color: ["#e3e3e3", "#9e9e9e"]
            },
            calculable: true
          }
        ],
        series: [
          {
            name: "产业分布",
            type: "map",
            mapType: "china",
            zoom: 1.1,
            roam: false,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: this.typeValue === 1
              }
            },
            data: this.typeValue === 1 ? this.optionData1 : this.optionData2
          }
        ]
      };
      myCharts.setOption(option);
      if (this.typeValue === 2) {
        myCharts.on("mouseover", function(target) {
          let areas = [];
          for (let key in that.areaData) {
            if (that.areaData[key].indexOf(target.name) !== -1) {
              areas = that.areaData[key];
              break;
            }
          }
          myCharts.dispatchAction({
            type: "downplay",
            seriesIndex: 0
          });
          myCharts.dispatchAction({
            type: "highlight",
            name: areas
          });
        });
        myCharts.on("mouseout", function() {
          myCharts.dispatchAction({
            type: "downplay",
            seriesIndex: 0
          });
        });
      } else {
        myCharts.off("mouseover");
        myCharts.off("mouseout");
      }
    }
  }
};
</script>

<style lang="less">
.fundMapBox {
  position: relative;
  width: 100%;
  height: 450px;
  .typeSelect {
    position: absolute;
    width: 120px;
    left: 20px;
    top: 10px;
  }
  .noData {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 400px;
  }
  #fundMap {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
}
</style>
