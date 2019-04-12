<template>
  <div class="cloudBarBox" v-loading="cloudLoading">
    <div id="cloudBar"></div>
    <div class="industryTable">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column
          prop="title"
          label="排名"
          width="170"
        ></el-table-column>
        <el-table-column prop="region" label="入围区域"></el-table-column>
        <el-table-column
          prop="value"
          label="总集中度"
          width="150"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
// import { dateFormat } from '@/config/filter.js'
export default {
  props: ["data", "cloudLoading"],
  data() {
    return {
      dataAxis: [],
      optionData: [],
      title: "",
      totalValue: 0,
      tableData: []
    };
  },
  watch: {
    data: {
      handler: function(val) {
        this.dataAxis = [];
        this.optionData = [];
        this.tableData = [];
        this.splitData(val);
        this.$nextTick(() => {
          this.init();
        });
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {},
  methods: {
    // 整理data
    splitData(data) {
      let allData = data.barGraph;
      if (!allData) return false;
      let _tableData = data.hotCounts;
      this.totalValue = data.totalCount;
      for (let i = 0; i < allData.length; i++) {
        this.dataAxis.push(allData[i].base);
        this.optionData.push({
          name: allData[i].base,
          value: allData[i].count - 0,
          sacle: allData[i].percent,
          total: allData[i].accuPercent - 0
        });
      }
      for (let i = 0; i < _tableData.length; i++) {
        this.tableData.push({
          title: _tableData[i].name,
          region: _tableData[i].locations.join("、"),
          value: `${_tableData[i].sumPercent}%`
        });
      }
    },
    init() {
      let myCharts = echarts.init(document.getElementById("cloudBar"));
      let dataAxis = this.dataAxis;
      let optionDatas = this.optionData;
      let barData = [];
      let lineData = [];
      let totalValue = this.totalValue;
      optionDatas.forEach(item => {
        barData.push(item.value);
        lineData.push(item.total);
      });

      let option = {
        xAxis: {
          data: dataAxis,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: "#999"
            },
            formatter: function(value) {
              let _len = value.length;
              let tempStr = "";
              for (let i = 0; i < _len; i++) {
                tempStr += value[i] + "\n";
              }
              return tempStr;
            }
          }
        },
        yAxis: [
          {
            interval: totalValue / 10,
            max: totalValue,
            name: "成员数(个)",
            nameTextStyle: {
              color: "#999"
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 1,
              textStyle: {
                color: "#999"
              },
              formatter: function(value) {
                return `${Math.floor(value)}`;
              }
            }
          },
          {
            max: 100,
            name: "累计占比",
            nameTextStyle: {
              color: "#999"
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 1,
              textStyle: {
                color: "#999"
              },
              formatter: function(value) {
                return `${value}%`;
              }
            }
          }
        ],
        grid: {
          containLabel: true,
          top: 50,
          left: 20,
          right: 20,
          bottom: 0
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: function(datas) {
            let _index = datas[0].dataIndex;
            let res = `${datas[0].name}<br/>${datas[0].marker}成员数量：${
              optionDatas[_index].value
            }<br/>${datas[0].marker}集中度：${optionDatas[_index].sacle}%<br/>${
              datas[1].marker
            }累计占比：${datas[1].value}%`;
            return res;
          }
        },
        series: [
          {
            name: "成员数量",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#6475e2"
              },
              emphasis: {
                color: "#6475e2"
              }
            },
            data: barData
          },
          {
            name: "累计占比",
            yAxisIndex: 1,
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 10,
            itemStyle: {
              normal: {
                color: "#f6a85c"
              },
              emphasis: {
                color: "#f6a85c"
              }
            },
            data: lineData
          }
        ]
      };
      myCharts.setOption(option);
      myCharts.resize();
    }
  }
};
</script>

<style lang="less">
.cloudBarBox {
  position: relative;
  width: 100%;
  height: 100%;
  .title {
    width: 100%;
    height: 30px;
    text-align: center;
    color: #3851f6;
    font-size: 16px;
    line-height: 30px;
    margin-top: 15px;
  }
  #cloudBar {
    width: 100%;
    height: 400px;
  }
  .industryTable {
    padding: 20px;
    .el-table td,
    .el-table th {
      text-align: center;
      border-bottom: none;
    }
    .el-table td {
      padding: 16px 0;
    }
    .el-table th {
      background: #6475e2;
      border-color: #6475e2;
    }
    .el-table thead {
      color: #fff;
    }
  }
}
</style>
