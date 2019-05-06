<template>
  <div class="indexPage">
    <div class="chainTotalBox">
      <span
        v-for="(item, index) in chainTotalDatas"
        :key="index"
        class="chainTotalItem"
      >
        {{ item.name }} {{ item.data }}
      </span>
    </div>
    <div class="chainBox">
      <chain-pane />
    </div>
    <div class="chainList">
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
        >
        </el-table-column>
        <el-table-column label="产业链板块">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="hy" label="行业"></el-table-column>
        <el-table-column
          prop="data1"
          label="龙头企业"
          sortable
        ></el-table-column>
        <el-table-column
          prop="data2"
          label="核心企业"
          sortable
        ></el-table-column>
        <el-table-column
          prop="data3"
          label="普通企业"
          sortable
        ></el-table-column>
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
</template>

<script>
import chainPane from "@/components/indexPage/chainCanvas";
import { chainCategories } from "@/api/getData";
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
      tableData: [
        {
          name: "xxx产业链",
          hy: "xxx行业",
          data1: "10",
          data2: "20",
          data3: "40"
        },
        {
          name: "xxx产业链",
          hy: "xxx行业",
          data1: "10",
          data2: "20",
          data3: "40"
        },
        {
          name: "xxx产业链",
          hy: "xxx行业",
          data1: "10",
          data2: "20",
          data3: "40"
        },
        {
          name: "xxx产业链",
          hy: "xxx行业",
          data1: "10",
          data2: "20",
          data3: "40"
        },
        {
          name: "xxx产业链",
          hy: "xxx行业",
          data1: "10",
          data2: "20",
          data3: "40"
        },
        {
          name: "xxx产业链",
          hy: "xxx行业",
          data1: "10",
          data2: "20",
          data3: "40"
        }
      ]
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
  mounted() {
    chainCategories().then(res => {
      console.log(res);
    });
  },
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
        content: "勾选监控";
      }
    }
    .el-pagination {
      text-align: center;
    }
  }
}
</style>
