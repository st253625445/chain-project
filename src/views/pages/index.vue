<template>
  <div class="indexPage">
    <!-- <div class="chainTotalBox">
      <span
        v-for="(item, index) in chainTotalDatas"
        :key="index"
        class="chainTotalItem"
      >
        {{ item.name }} {{ item.data }}
      </span>
    </div> -->
    <div class="chainBox">
      <chain-pane @returnProbeName="returnProbeName" />
    </div>
    <div class="itemBox chainList" v-loading="tableLoading">
      <p class="title">产业链成员分类统计</p>
      <el-table
        ref="multipleTable"
        :data="tableData"
        stripe
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @sort-change="sortChange"
      >
        <el-table-column
          type="selection"
          width="100"
          label-class-name="selectLable"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          label="产业链板块"
          class-name="tableTextLeft"
          label-class-name="tableTextLeft"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.nodeName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="行业"
          class-name="tableTextLeft"
          label-class-name="tableTextLeft"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-for="(item, index) in scope.row.allIndustry" :key="index">
              {{ item }}
              <span v-if="index < scope.row.allIndustry.length - 1">,</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="stockCount"
          label="龙头企业"
          :show-overflow-tooltip="true"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          prop="longtouCount"
          label="核心企业"
          :show-overflow-tooltip="true"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          prop="xinxiuCount"
          label="普通企业"
          :show-overflow-tooltip="true"
          sortable="custom"
        ></el-table-column>
        <!-- <el-table-column
          prop="xinxiuCount"
          label="总企业数"
          :show-overflow-tooltip="true"
          sortable="custom"
        ></el-table-column> -->
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 20]"
        :page-size="params.pageNum"
        layout="prev, pager, next, sizes, jumper"
        :total="listTotal"
        :current-page="params.page"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import chainPane from "@/components/indexPage/chainCanvas";
import { getPdeigreeStatics, getNodeStatics } from "@/api/getData";
export default {
  data() {
    return {
      chainTotalDatas: [
        {
          name: "小微企业",
          data: 15273
        },
        {
          name: "小微企业",
          data: 15273
        },
        {
          name: "小微企业",
          data: 15273
        },
        {
          name: "小微企业",
          data: 15273
        },
        {
          name: "小微企业",
          data: 15273
        },
        {
          name: "小微企业",
          data: 15273
        }
      ],
      multipleSelection: [],
      tableData: [],
      params: {
        chainId: "",
        page: 1,
        pageNum: 5,
        fieldOrder: 0,
        order: 0
      },
      listTotal: 0,
      tableLoading: true,
      isByNodeName: false // 表格是否是通过节点请求
    };
  },
  components: { chainPane },
  created() {
    let query = this.$route.query;
    if (query.chainId || query.keyword) {
      console.log(query.chainId);
    } else {
      this.$router.push("/");
    }
  },
  watch: {
    $route: {
      handler() {
        let id = this.$route.query.chainId;
        if (id) {
          this.params = {
            chainId: id,
            page: 1,
            pageNum: 5,
            fieldOrder: 0,
            order: 0
          };
          this.getListByChainId();
        }
      },
      immediate: true
    }
  },
  methods: {
    // 根据产业链获得相关的公司统计展示
    getListByChainId() {
      this.tableLoading = true;
      this.isByNodeName = false;
      getPdeigreeStatics(this.params)
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            this.tableData = res.data.nodeRelatedCompanyStaticsFormatsList;
            this.listTotal = res.data.totalCount;
          }
          this.tableLoading = false;
        })
        .catch(rej => {
          console.log(rej);
          this.tableLoading = false;
          this.tableData = [];
          this.listTotal = 0;
        });
    },
    // 根据节点名称获得相关公司统计展示
    getListByChainName(name) {
      this.tableLoading = true;
      this.isByNodeName = true;
      getNodeStatics({ nodeName: name })
        .then(res => {
          console.log(res);
          this.tableLoading = true;
        })
        .catch(rej => {
          console.log(rej);
          this.tableLoading = false;
          this.tableData = [];
        });
    },
    // 返回探索节点
    returnProbeName(data) {
      console.log(data);
      this.getListByChainName(data);
    },
    // 勾选改变
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 页码每页条数改变
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.params.pageNum = val;
      this.params.page = 1;
      this.isByNodeName ? this.getListByChainName() : this.getListByChainId();
    },
    // 页码跳转
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.params.page = val;
      this.isByNodeName ? this.getListByChainName() : this.getListByChainId();
    },
    // 筛选
    sortChange(params) {
      console.log(params);
      let list = ["stockCount", "longtouCount", "xinxiuCount"];
      this.params.fieldOrder = list.indexOf(params.prop) + 1;
      this.params.order = params.order
        ? params.order === "ascending"
          ? 1
          : 2
        : 0;
      this.isByNodeName ? this.getListByChainName() : this.getListByChainId();
    }
  }
};
</script>

<style lang="less">
.indexPage {
  width: 100%;
  padding: 20px;
  > div {
    width: 100%;
    background: #fff;
    border: 1px solid #eeeeee;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .chainTotalBox {
    padding: 20px 5px 10px;
    .chainTotalItem {
      display: inline-block;
      height: 30px;
      padding: 0 5px;
      margin-bottom: 10px;
      margin-left: 5px;
      margin-right: 5px;
      border: 1px solid #4b61e7;
      color: #4b61e7;
      font-size: 14px;
      line-height: 28px;
    }
  }
  .chainBox {
    height: 602px;
  }
  .chainList {
    padding: 0 20px 20px;
    .title {
      font-size: 16px;
      line-height: 60px;
      color: #1027ad;
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
        content: "勾选监控";
      }
    }
    .el-pagination {
      text-align: center;
    }
  }
}
</style>
