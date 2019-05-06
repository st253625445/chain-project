<template>
  <div class="fundPage">
    <h1>暂未开发，敬请期待！</h1>
    <!-- <div class="itemBox fundTotalBox">
      <p class="title">产业基金投资概况</p>
      <p class="fundTotal">
        该产业链下的产业基金共<span class="blueSpan"> 13 </span
        >家，投资总额共计<span class="blueSpan"> 30851 </span
        >亿万元，共投资实体企业<span class="blueSpan"> 258 </span>家。
      </p>
    </div>
    <div class="itemBox fundMapChart">
      <p class="title">产业基金投资实体区域分布地图</p>
    </div>
    <div class="itemBox fundListBox">
      <p class="title">
        产业基金基本信息
        <span class="subTitle">
          北京区域共计
          <span class="blueSpan">5</span>
          支产业基金，投资实体
          <span class="blueSpan">
            10000
          </span>
          家
        </span>
      </p>
      <div class="tableBox">
        <el-table
          :data="tableData"
          stripe
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @sort-change="sortChange"
        >
          <el-table-column
            type="selection"
            width="85"
            label-class-name="selectLable"
          >
          </el-table-column>
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column label="产业基金名称">
            <template slot-scope="scope">
              <span
                @click="openInfoBox(scope.row)"
                class="blueSpan pointerHover"
                >{{ scope.row.data1 }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="data2" label="注册资本（万元）">
          </el-table-column>
          <el-table-column prop="data3" label="币种"> </el-table-column>
          <el-table-column prop="data3" label="直接投资实体企业数">
          </el-table-column>
          <el-table-column prop="data3" label="间接投资实体企业">
          </el-table-column>
          <el-table-column prop="data3" label="成立时间"> </el-table-column>
          <el-table-column label="投资谱系">
            <template slot-scope="scope">
              <span
                @click="linkFundChain(scope.row)"
                class="blueSpan pointerHover"
                >详情</span
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 20]"
          :page-size="100"
          layout="prev, pager, next, sizes, jumper"
          :total="400"
        >
        </el-pagination>
      </div>
    </div>
    <div class="fundInfoBox" v-if="infoBoxShow" v-clickoutside="closeInfoBox">
      <div class="title">张江高科技园区</div>
      <div class="infoCount">
        <div>
          <p>
            截止2012年底，园区累计注册企业9164家；从业人员27万，本科学历以上占比超过60%。实现经营总收入4200亿元，同比增长13.5%；工业总产值2084亿元，同比增长19.75%；固定资产投资206亿元，同比增长1.93%；税收收入189.15亿元，同比增长10.6%。成为浦东发展的重要增长极。根据“2012年上海市开发区综合评价”，张江高科技园区再度蝉联综合排名第一，同时在创新发展和投资环境指标上也排名第一。
          </p>
          <p>
            经过20年的开发，园区构筑了生物医药创新链和集成电路产业链的框架。目前，园区建有国家上海生物医药科技产业基地、国家信息产业基地、国家集成电路产业基地、
          </p>
          <p>
            国家半导体照明产业基地、国家863信息安全成果产业化（东部）基地、国家软件产业基地、国家软件出口基地、国家文化产业示范基地、国家网游动漫产业发展基地等多个国家级基地。在科技创新方面，园区拥有多模式、多类型的孵化器，建有国家火炬创业园、国家留学人员创业园，一批新经济企业实现了大踏步的飞跃。“自我设计、自主经营、自由竞争”和“鼓励成功、宽容失败”的园区文化和创业氛围正逐渐形成。
          </p>
        </div>
      </div>
      <div class="submit" @click="closeInfoBox">确 定</div>
    </div> -->
  </div>
</template>
<script>
import Clickoutside from "element-ui/src/utils/clickoutside";
export default {
  data() {
    return {
      infoBoxShow: false,
      tableData: [
        {
          data1: "xxx产业链",
          data2: "20",
          data3: "40"
        },
        {
          data1: "xxx产业链",
          data2: "20",
          data3: "40"
        },
        {
          data1: "xxx产业链",
          data2: "20",
          data3: "40"
        },
        {
          data1: "xxx产业链",
          data2: "20",
          data3: "40"
        },
        {
          data1: "xxx产业链",
          data2: "20",
          data3: "40"
        },
        {
          data1: "xxx产业链",
          data2: "20",
          data3: "40"
        }
      ]
    };
  },
  directives: { Clickoutside },
  methods: {
    // 勾选改变
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 排序改变
    sortChange(params) {
      console.log(params);
    },
    // 页码每页条数改变
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 页码跳转
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 显示园区信息
    openInfoBox() {
      this.infoBoxShow = true;
    },
    // 园区信息外部点击隐藏
    closeInfoBox() {
      this.infoBoxShow = false;
    },
    // 链接投资谱系
    linkFundChain(data) {
      console.log(data);
      let _query = {
        chainId: this.$route.query.chainId,
        nodeName: this.$route.query.nodeName
      };
      let routeData = this.$router.resolve({
        path: "/fundChain",
        query: _query
      });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>

<style lang="less">
.fundPage {
  width: 100%;
  padding: 20px;
  .fundTotalBox {
    .fundTotal {
      font-size: 14px;
      line-height: 40px;
      text-indent: 50px;
      font-family: "PingFangSC";
      color: rgb(51, 51, 51);
      margin-bottom: 15px;
    }
  }
  .tableBox {
    width: 100%;
    padding: 0 20px 20px;
  }
  .el-table .cell {
    text-align: center;
  }
  .el-table td,
  .el-table th.is-leaf {
    border-bottom: none;
  }
  .el-table th {
    background-color: #fbfbfb;
  }
  .cell.selectLable {
    > label {
      display: none;
    }
    &::before {
      content: "勾选";
    }
  }
  .el-pagination {
    text-align: center;
    padding-bottom: 20px;
  }
  .fundInfoBox {
    position: absolute;
    width: 600px;
    height: 400px;
    top: 50%;
    left: 50%;
    margin-left: -300px;
    margin-top: -200px;
    padding: 20px 40px 0;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.1);
    cursor: default;
    .title {
      width: 100%;
      line-height: 50px;
      font-size: 18px;
      text-align: center;
    }
    .infoCount {
      width: 100%;
      height: 270px;
      overflow: hidden;
      > div {
        width: calc(100% + 20px);
        height: 270px;
        padding-right: 20px;
        padding-bottom: 70px;
        overflow-y: scroll;
      }
      p {
        padding: 5px 0;
        font-size: 12px;
        line-height: 24px;
        text-indent: 2em;
        text-align: justify;
      }
    }
    .submit {
      position: absolute;
      width: 100%;
      height: 60px;
      left: 0;
      bottom: 0;
      font-size: 18px;
      color: rgb(75, 97, 231);
      line-height: 60px;
      text-align: center;
      box-shadow: 0px -40px 40px rgba(255, 255, 255);
    }
  }
}
</style>
