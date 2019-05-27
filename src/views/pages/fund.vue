<template>
  <div class="fundPage">
    <div class="itemBox fundTotalBox">
      <p class="title">产业基金投资概况</p>
      <p class="fundTotal">
        该产业链下的产业基金共<span class="blueSpan">
          {{ baseStatics.fundCompanyCount }} </span
        >家，投资总额共计<span class="blueSpan">
          {{ baseStatics.investAmount | investAmountFilter }} </span
        >亿万元，共投资实体企业<span class="blueSpan">
          {{ baseStatics.investedCompanyCount }} </span
        >家。
      </p>
    </div>
    <div class="itemBox fundMapChart">
      <p class="title">产业基金投资实体区域分布地图</p>
      <fundMap :data.sync="fundMapData" :fundLoading="fundMapLoading" />
    </div>
    <div class="itemBox fundListBox">
      <p class="title">
        产业基金基本信息
      </p>
      <div class="tableBox">
        <el-table
          :data="tableData"
          stripe
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @sort-change="sortChange"
          v-loading="tableLoading"
        >
          <el-table-column
            type="selection"
            width="85"
            label-class-name="selectLable"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            label="产业基金名称"
            class-name="tableTextLeft"
            label-class-name="tableTextLeft"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span
                @click="openInfoBox(scope.row)"
                class="blueSpan pointerHover"
                >{{ scope.row.name }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="regCapital"
            label="注册资本（万元）"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="currency"
            label="币种"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="directInvestCount"
            label="直接投资实体企业数"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="indirectInvestCount"
            label="间接投资实体企业"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="establishDate"
            label="成立时间"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="投资谱系" :show-overflow-tooltip="true">
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
          :page-size="pageSize"
          layout="prev, pager, next, sizes, jumper"
          :total="listTotal"
          :current-page="page"
        >
        </el-pagination>
      </div>
    </div>
    <div class="fundInfoBox" v-if="infoBoxShow" v-clickoutside="closeInfoBox">
      <div class="title">{{ infoBoxData.title }}</div>
      <div class="infoCount" v-loading="infoLoading">
        <div v-if="infoBoxData.data">
          <p v-html="infoBoxData.data"></p>
        </div>
        <div class="noInfo" v-if="!infoLoading && !infoBoxData.data">
          无数据
        </div>
      </div>
      <div class="submit" @click="closeInfoBox">确 定</div>
    </div>
  </div>
</template>
<script>
import Clickoutside from "element-ui/src/utils/clickoutside";
import fundMap from "@/components/fundPage/fundMap";
import {
  getCbcBaseStatics,
  getCbcProfile,
  getCbcChain,
  getCompanyInfo
} from "@/api/getData";
export default {
  data() {
    return {
      chainId: "",
      baseStatics: {},
      infoBoxShow: false,
      fundMapData: null,
      fundMapLoading: true,
      tableData: [],
      page: 1,
      pageSize: 5,
      listTotal: 0,
      infoBoxData: {},
      infoLoading: true
    };
  },
  components: { fundMap },
  directives: { Clickoutside },
  created() {
    let _chainId = this.$route.query.chainId;
    if (_chainId) {
      this.chainId = _chainId;
      this.getData();
    } else {
      this.$router.push("/");
    }
  },
  filters: {
    investAmountFilter(val) {
      if (val) {
        return (val / 100000000).toFixed(2);
      } else {
        return "";
      }
    }
  },
  methods: {
    // 获取数据
    getData() {
      this.getCbcBaseStatics();
      this.getCbcProfile();
      this.getList();
    },
    // 获取投资统计
    getCbcBaseStatics() {
      let opt = {
        chainId: this.chainId || 6019
      };
      getCbcBaseStatics(opt)
        .then(res => {
          if (res.code === 200) {
            this.baseStatics = res.data;
          } else {
            this.baseStatics = {};
          }
        })
        .catch(rej => {
          console.log(rej);
          this.baseStatics = {};
        });
    },
    // 获取区域分布数据
    getCbcProfile() {
      let opt = {
        chainId: this.chainId || 6019,
        profileKeepNum: 4
      };
      getCbcProfile(opt)
        .then(res => {
          if (res.code === 200) {
            this.fundMapData = res.data;
            this.fundMapLoading = false;
          } else {
            this.fundMapData = {};
            this.fundMapLoading = false;
          }
        })
        .catch(rej => {
          console.log(rej);
          this.fundMapData = {};
          this.fundMapLoading = false;
        });
    },
    // 获取列表
    getList() {
      let opt = {
        chainId: this.chainId || 6019,
        page: this.page,
        pageSize: this.pageSize
      };
      this.tableLoading = true;
      getCbcChain(opt)
        .then(res => {
          if (res.code === 200) {
            this.tableData = res.data.cbcCompanyViewList;
            this.listTotal = res.data.chainMatchCount;
            this.tableLoading = false;
          } else {
            this.tableData = [];
            this.listTotal = 0;
            this.tableLoading = false;
          }
        })
        .catch(rej => {
          console.log(rej);
          this.tableData = [];
          this.listTotal = 0;
          this.tableLoading = false;
        });
    },
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
      this.page = 1;
      this.pageSize = val;
      this.getList();
    },
    // 页码跳转
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getList();
    },
    // 显示园区信息
    openInfoBox(data) {
      let id = data.id;
      let opt = {
        companyId: id
      };
      this.infoBoxData["title"] = data.name;
      this.infoLoading = true;
      this.infoBoxShow = true;
      getCompanyInfo(opt)
        .then(res => {
          if (res.code === 200) {
            this.infoBoxData["data"] = res.data;
            this.infoLoading = false;
          } else {
            this.infoBoxData["data"] = "";
            this.infoLoading = false;
          }
        })
        .catch(rej => {
          console.log(rej);
          this.infoBoxData["data"] = "";
          this.infoLoading = false;
        });
    },
    // 园区信息外部点击隐藏
    closeInfoBox() {
      this.infoBoxShow = false;
    },
    // 链接投资谱系
    linkFundChain(data) {
      let _query = {
        companyId: data.id,
        companyName: data.name
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
  .el-table td,
  .el-table th.is-leaf {
    text-align: center;
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
      .noInfo {
        text-align: center;
        line-height: 270px;
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
