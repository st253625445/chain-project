<template>
  <div class="cloudBarBox">
    <div id="cloudBar"></div>
    <div class="industryTable">
      <el-table
        :data="tableData"
        class="industryTable"
        border
        style="width: 100%"
      >
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
  props: ["data"],
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
      console.log(this.optionData);
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
            textStyle: {
              color: "#999"
            }
          }
        },
        yAxis: [
          {
            interval: totalValue / 10,
            max: totalValue,
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
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 50
          },
          {
            start: 0,
            end: 50,
            top: 380,
            bottom: 15,
            minSpan: 20,
            handleIcon:
              "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "20px",
            handleStyle: {
              color: "#fff",
              shadowBlur: 3,
              shadowColor: "rgba(0, 0, 0, 0.6)",
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            showDataShadow: false
          }
        ],
        grid: {
          top: 50
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
    margin-top: 20px;
    .el-table td,
    .el-table th {
      text-align: center;
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
