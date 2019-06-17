<template>
  <div class="membersPage">
    <div class="itemBox membersList" v-loading="longTouLoading">
      <p class="title">
        产业链龙头成员
        <span class="subTitle"
          >{{ nodeName }}产业链中，龙头成员{{ longTouTotal }}名</span
        >
      </p>
      <el-table
        ref="multipleTable"
        :data="longTouData"
        stripe
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @sort-change="
          val => {
            sortChange(val, 1);
          }
        "
      >
        <el-table-column
          :show-overflow-tooltip="true"
          type="selection"
          width="85"
          label-class-name="selectLable"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          type="index"
          label="序号"
        >
          <template slot-scope="scope">
            <span>
              {{
                scope.$index +
                  (longTouParams.page - 1) * longTouParams.pageNum +
                  1
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="企业名称"
          class-name="tableTextLeft"
          label-class-name="tableTextLeft"
        >
          <template slot-scope="scope">
            <span @click="linkToCompanyInfo(scope.row)" class="blueSpan">{{
              scope.row.companyName
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="产业链板块"
          class-name="tableTextLeft"
          label-class-name="tableTextLeft"
        >
          <template slot-scope="scope">
            <span v-for="(item, index) in scope.row.chainItemList" :key="index">
              {{ item.chainName }}
              <span v-if="index < scope.row.chainItemList.length - 1">,</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="mainProducts"
          label="主要产品"
        >
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="所在集团">
          <template slot-scope="scope" @click="click1Fn(scope.row)">
            详情
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="企业关联方">
          <template slot-scope="scope" @click="click1Fn(scope.row)">
            详情
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="sharePriceNewest"
          label="最新股价(元)"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.sharePriceNewest | numberToFiexd }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="市值(亿元)"
          prop="totalMarketValue"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.totalMarketValue | numberToFiexd(10000) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="市盈"
          prop="issuePERation"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.issuePERation | numberToFiexd }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="去年总收入"
          prop="totalIncome"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.totalIncome | numberToFiexd }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="去年净利润"
          prop="netProfit"
          sortable="custom"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.netProfit | numberToFiexd }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="
          val => {
            handleSizeChange(val, 1);
          }
        "
        @current-change="
          val => {
            handleCurrentChange(val, 1);
          }
        "
        :page-sizes="[5, 10, 20]"
        :page-size="longTouParams.pageNum"
        layout="prev, pager, next, sizes, jumper"
        :total="longTouTotal"
        :current-page="longTouParams.page"
      >
      </el-pagination>
    </div>
    <div class="itemBox membersList" v-loading="heXinLoading">
      <p class="title">
        产业链核心成员
        <span class="subTitle"
          >{{ nodeName }}产业链中，核心成员{{ heXinTotal }}名</span
        >
      </p>
      <el-table
        ref="multipleTable2"
        :data="heXinData"
        stripe
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @sort-change="
          val => {
            sortChange(val, 2);
          }
        "
      >
        <el-table-column
          :show-overflow-tooltip="true"
          type="selection"
          width="85"
          label-class-name="selectLable"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          type="index"
          label="序号"
        >
          <template slot-scope="scope">
            <span>
              {{
                scope.$index + (heXinParams.page - 1) * heXinParams.pageNum + 1
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="企业名称"
          class-name="tableTextLeft"
          label-class-name="tableTextLeft"
        >
          <template slot-scope="scope">
            <span @click="linkToCompanyInfo(scope.row)" class="blueSpan">{{
              scope.row.enterName
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="产业链板块"
          class-name="tableTextLeft"
          label-class-name="tableTextLeft"
        >
          <template slot-scope="scope">
            <span v-for="(item, index) in scope.row.relateChains" :key="index">
              {{ item.chainName }}
              <span v-if="index < scope.row.relateChains.length - 1">,</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="mainProducts"
          label="主要产品"
        >
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="所在集团">
          <template slot-scope="scope" @click="click1Fn(scope.row)">
            详情
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="企业关联方">
          <template slot-scope="scope" @click="click1Fn(scope.row)">
            详情
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="regLocation"
          label="注册省市"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="enterScale"
          label="企业规模"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="lifeSpan"
          label="生存年限"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="enterType"
          label="企业类型"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="currency"
          label="注册资金币种"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="注册资金(万)"
          sortable="custom"
          prop="regCapital"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.regCapital | numberToFiexd }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="establishTime"
          label="成立时间"
          sortable="custom"
        ></el-table-column>
      </el-table>
      <el-pagination
        @size-change="
          val => {
            handleSizeChange(val, 2);
          }
        "
        @current-change="
          val => {
            handleCurrentChange(val, 2);
          }
        "
        :page-sizes="[5, 10, 20]"
        :page-size="heXinParams.pageNum"
        layout="prev, pager, next, sizes, jumper"
        :total="heXinTotal"
        :current-page="heXinParams.page"
      >
      </el-pagination>
    </div>
    <div class="itemBox membersList" v-loading="puTongLoading">
      <p class="title">
        产业链普通成员
        <span class="subTitle"
          >{{ nodeName }}产业链中，普通成员{{ puTongTotal }}名</span
        >
      </p>
      <el-table
        ref="multipleTable3"
        :data="puTongData"
        stripe
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @sort-change="
          val => {
            sortChange(val, 3);
          }
        "
      >
        <el-table-column
          :show-overflow-tooltip="true"
          type="selection"
          width="85"
          label-class-name="selectLable"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          type="index"
          label="序号"
        >
          <template slot-scope="scope">
            <span>
              {{
                scope.$index +
                  (puTongParams.page - 1) * puTongParams.pageNum +
                  1
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="企业名称"
          class-name="tableTextLeft"
          label-class-name="tableTextLeft"
        >
          <template slot-scope="scope">
            <span @click="linkToCompanyInfo(scope.row)" class="blueSpan">{{
              scope.row.enterName
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="产业链板块"
          class-name="tableTextLeft"
          label-class-name="tableTextLeft"
        >
          <template slot-scope="scope">
            <span v-for="(item, index) in scope.row.relateChains" :key="index">
              {{ item.chainName }}
              <span v-if="index < scope.row.relateChains.length - 1">,</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="mainProducts"
          label="主要产品"
        >
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="所在集团">
          <template slot-scope="scope" @click="click1Fn(scope.row)">
            详情
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="企业关联方">
          <template slot-scope="scope" @click="click1Fn(scope.row)">
            详情
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="regLocation"
          label="注册省市"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="enterScale"
          label="企业规模"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="lifeSpan"
          label="生存年限"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="enterType"
          label="企业类型"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="currency"
          label="注册资金币种"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="注册资金(万)"
          sortable="custom"
          prop="regCapital"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.regCapital | numberToFiexd }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="establishTime"
          label="成立时间"
          sortable="custom"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="
          val => {
            handleSizeChange(val, 3);
          }
        "
        @current-change="
          val => {
            handleCurrentChange(val, 3);
          }
        "
        :page-sizes="[5, 10, 20]"
        :page-size="puTongParams.pageNum"
        layout="prev, pager, next, sizes, jumper"
        :total="puTongTotal"
        :current-page="puTongParams.page"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getListCompany,
  getLongTouCompany,
  getXinxiuCompany
} from "@/api/getData";
export default {
  data() {
    return {
      chainId: "",
      nodeName: "",
      longTouParams: {
        page: 1,
        pageNum: 5,
        fieldOrder: 0,
        order: 0
      },
      heXinParams: {
        page: 1,
        pageNum: 5,
        fieldOrder: 0,
        order: 0
      },
      puTongParams: {
        page: 1,
        pageNum: 5,
        fieldOrder: 0,
        order: 0
      },
      longTouData: [],
      heXinData: [],
      puTongData: [],
      longTouLoading: true,
      heXinLoading: true,
      puTongLoading: true,
      longTouTotal: 0,
      heXinTotal: 0,
      puTongTotal: 0
    };
  },
  created() {
    let query = this.$route.query;
    if (query.chainId && query.nodeName) {
      this.chainId = query.chainId;
      this.nodeName = query.nodeName;
      this.getRelatedList();
    } else {
      this.$router.push("/");
    }
  },
  filters: {
    numberToFiexd(val, num) {
      let _num = num || 1;
      if (val || val == 0) {
        return ((val - 0) / _num).toFixed(2);
      }
    }
  },
  methods: {
    // 获取列表
    getRelatedList() {
      let opt = {
        chainId: this.chainId,
        page: 1,
        pageNum: 5,
        fieldOrder: 0,
        order: 0
      };
      this.getLongTouList(opt);
      this.getHeXinList(opt);
      this.getPuTongList(opt);
    },
    // 获取龙头成员列表
    getLongTouList(opt) {
      this.longTouLoading = true;
      let _opt =
        opt || Object.assign(this.longTouParams, { chainId: this.chainId });
      getListCompany(_opt)
        .then(res => {
          if (res.code === 200) {
            this.longTouData = res.data.listCompanyOfChainMemberList;
            this.longTouTotal = res.data.parkCompanyStatic.otherCount;
          }
          this.longTouLoading = false;
        })
        .catch(rej => {
          console.log(rej);
          this.longTouData = [];
          this.longTouTotal = 0;
          this.longTouLoading = false;
        });
    },
    // 获取核心成员列表
    getHeXinList(opt) {
      let _opt =
        opt || Object.assign(this.heXinParams, { chainId: this.chainId });
      this.heXinLoading = true;
      getLongTouCompany(_opt)
        .then(res => {
          if (res.code === 200) {
            this.heXinData = res.data.companyViewList;
            this.heXinTotal = res.data.parkCompanyStatic.otherCount;
          }
          this.heXinLoading = false;
        })
        .catch(rej => {
          console.log(rej);
          this.heXinData = [];
          this.heXinTotal = 0;
          this.heXinLoading = false;
        });
    },
    // 获取普通成员列表
    getPuTongList(opt) {
      let _opt =
        opt || Object.assign(this.puTongParams, { chainId: this.chainId });
      this.puTongLoading = true;
      getXinxiuCompany(_opt)
        .then(res => {
          if (res.code === 200) {
            this.puTongData = res.data.companyViewList;
            this.puTongTotal = res.data.parkCompanyStatic.otherCount;
          }
          this.puTongLoading = false;
        })
        .catch(rej => {
          console.log(rej);
          this.puTongData = [];
          this.puTongTotal = 0;
          this.puTongLoading = false;
        });
    },
    // 勾选改变
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 排序改变
    sortChange(params, type) {
      console.log(params, type);
      let longtouSort = [
        "sharePriceNewest",
        "issuePERation",
        "totalMarketValue",
        "totalIncome",
        "netProfit"
      ];
      let hexinSort = [
        "regLocation",
        "establishTime",
        "lifeSpan",
        "enterScale",
        "enterType",
        "regCapital",
        "currency"
      ];
      switch (type) {
        case 1:
          this.longTouParams.fieldOrder = longtouSort.indexOf(params.prop) + 1;
          this.longTouParams.order = params.order
            ? params.order === "ascending"
              ? 1
              : 2
            : 0;
          this.getLongTouList();
          break;
        case 2:
          this.heXinParams.fieldOrder = hexinSort.indexOf(params.prop) + 1;
          this.heXinParams.order = params.order
            ? params.order === "ascending"
              ? 1
              : 2
            : 0;
          this.getHeXinList();
          break;
        case 3:
          this.puTongParams.fieldOrder = hexinSort.indexOf(params.prop) + 1;
          this.puTongParams.order = params.order
            ? params.order === "ascending"
              ? 1
              : 2
            : 0;
          this.getPuTongList();
          break;
        default:
          return false;
      }
    },
    click1Fn(params) {
      console.log(params);
    },
    // 页码每页条数改变
    handleSizeChange(val, type) {
      console.log(`每页 ${val} 条`);
      switch (type) {
        case 1:
          this.longTouParams.pageNum = val;
          this.longTouParams.page = 1;
          this.getLongTouList();
          break;
        case 2:
          this.heXinParams.pageNum = val;
          this.heXinParams.page = 1;
          this.getHeXinList();
          break;
        case 3:
          this.puTongParams.pageNum = val;
          this.puTongParams.page = 1;
          this.getPuTongList();
          break;
        default:
          return false;
      }
    },
    // 页码跳转
    handleCurrentChange(val, type) {
      console.log(`当前页: ${val}`);
      switch (type) {
        case 1:
          this.longTouParams.page = val;
          this.getLongTouList();
          break;
        case 2:
          this.heXinParams.page = val;
          this.getHeXinList();
          break;
        case 3:
          this.puTongParams.page = val;
          this.getPuTongList();
          break;
        default:
          return false;
      }
    },
    linkToCompanyInfo(data) {
      console.log(data);
      let _query = {
        companyId: data.id,
        companyName: data.companyName || data.enterName
      };
      let routeData = this.$router.resolve({
        path: "/company",
        query: _query
      });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>

<style lang="less">
.membersPage {
  width: 100%;
  padding: 20px;
  .title {
    font-size: 16px;
    line-height: 60px;
    color: #1027ad;
    text-indent: 0;
    .subTitle {
      display: inline-block;
      text-indent: 20px;
      font-size: 12px;
      color: rgb(170, 170, 170);
      line-height: 1.2;
    }
  }
  .membersList {
    width: 100%;
    padding: 0 20px;
    background: #fff;
    border: 1px solid #eeeeee;
    margin-bottom: 20px;
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
        content: "勾选监控";
      }
    }
    .el-pagination {
      text-align: center;
      padding-bottom: 20px;
    }
    .blueSpan {
      cursor: pointer;
    }
  }
}
</style>
