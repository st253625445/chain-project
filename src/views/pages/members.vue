<template>
  <div class="membersPage">
    <div class="membersList">
      <p class="title">
        产业链龙头成员
        <span class="subTitle">集成电路产业链中，龙头成员54名</span>
      </p>
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
          width="85"
          label-class-name="selectLable"
        >
        </el-table-column>
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="hy" label="产业链板块"> </el-table-column>
        <el-table-column prop="data1" label="主要产品"> </el-table-column>
        <el-table-column label="所在集团">
          <template slot-scope="scope" @click="click1Fn(scope.row)"
            >详情</template
          >
        </el-table-column>
        <el-table-column label="企业关联方">
          <template slot-scope="scope" @click="click1Fn(scope.row)"
            >详情</template
          >
        </el-table-column>
        <el-table-column prop="data1" label="最新股价(元)" sortable>
        </el-table-column>
        <el-table-column prop="data1" label="市值(亿元)" sortable>
        </el-table-column>
        <el-table-column prop="data1" label="市盈" sortable> </el-table-column>
        <el-table-column prop="data1" label="去年总收入" sortable>
        </el-table-column>
        <el-table-column prop="data1" label="去年净利润" sortable>
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
    <div class="membersList">
      <p class="title">
        产业链核心成员
        <span class="subTitle">集成电路产业链中，核心成员54名</span>
      </p>
      <el-table
        ref="multipleTable2"
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
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="hy" label="产业链板块"> </el-table-column>
        <el-table-column prop="data1" label="主要产品"> </el-table-column>
        <el-table-column label="所在集团">
          <template slot-scope="scope" @click="click1Fn(scope.row)"
            >详情</template
          >
        </el-table-column>
        <el-table-column label="企业关联方">
          <template slot-scope="scope" @click="click1Fn(scope.row)"
            >详情</template
          >
        </el-table-column>
        <el-table-column prop="data1" label="注册省市" sortable>
        </el-table-column>
        <el-table-column prop="data1" label="企业规模" sortable>
        </el-table-column>
        <el-table-column prop="data1" label="生存年限" sortable>
        </el-table-column>
        <el-table-column prop="data1" label="企业类型" sortable>
        </el-table-column>
        <el-table-column
          prop="data1"
          label="注册资金币种"
          sortable
        ></el-table-column>
        <el-table-column
          prop="data1"
          label="注册资金"
          sortable
        ></el-table-column>
        <el-table-column
          prop="data1"
          label="成立时间"
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
    <div class="membersList">
      <p class="title">
        产业链普通成员
        <span class="subTitle">集成电路产业链中，普通成员54名</span>
      </p>
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
          width="85"
          label-class-name="selectLable"
        >
        </el-table-column>
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="hy" label="产业链板块"> </el-table-column>
        <el-table-column prop="data1" label="主要产品"> </el-table-column>
        <el-table-column label="所在集团">
          <template slot-scope="scope" @click="click1Fn(scope.row)"
            >详情</template
          >
        </el-table-column>
        <el-table-column label="企业关联方">
          <template slot-scope="scope" @click="click1Fn(scope.row)"
            >详情</template
          >
        </el-table-column>
        <el-table-column prop="data1" label="注册省市" sortable>
        </el-table-column>
        <el-table-column prop="data1" label="企业规模" sortable>
        </el-table-column>
        <el-table-column prop="data1" label="生存年限" sortable>
        </el-table-column>
        <el-table-column prop="data1" label="企业类型" sortable>
        </el-table-column>
        <el-table-column
          prop="data1"
          label="注册资金币种"
          sortable
        ></el-table-column>
        <el-table-column
          prop="data1"
          label="注册资金"
          sortable
        ></el-table-column>
        <el-table-column prop="data1" label="成立时间" sortable>
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
</template>

<script>
import { getRelatedList } from "@/api/getData";
export default {
  data() {
    return {
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
  mounted() {
    let query = this.$route.query;
    if (query.nodeName) {
      this.getRelatedList(query.nodeName);
    }
  },
  methods: {
    // 获取列表
    getRelatedList(name) {
      getRelatedList(name)
        .then(res => {
          console.log(res);
        })
        .catch(rej => {
          console.log(rej);
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
    click1Fn(params) {
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
.membersPage {
  width: 100%;
  padding: 20px;
  .title {
    font-size: 16px;
    line-height: 60px;
    color: #1027ad;
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
      padding-bottom: 20px;
    }
  }
}
</style>
