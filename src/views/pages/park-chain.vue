<template>
  <div class="parkChainPage">
    <p class="parkChainTitle">{{ parkName }}-产业集群</p>
    <div class="itemBox chainBox">
      <chain-pane />
    </div>

    <div class="itemBox parkChainListBox">
      <p class="title">
        {{ parkName }}
        <span class="subTitle">
          {{ parkName }}中，明星企业 <span class="blueSpan">5</span>名
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
          <el-table-column label="企业名称">
            <template slot-scope="scope">
              <span @click="clickFn(scope.row)" class="pointerHover">{{
                scope.row.data1
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="data2" label="产业链板块"> </el-table-column>
          <el-table-column prop="data3" label="主要产品"> </el-table-column>
          <el-table-column label="所在集团">
            <template slot-scope="scope">
              <span @click="clickFn(scope.row)" class="blueSpan pointerHover"
                >详情</span
              >
            </template>
          </el-table-column>
          <el-table-column label="企业关联方">
            <template slot-scope="scope">
              <span @click="clickFn(scope.row)" class="blueSpan pointerHover"
                >详情</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="data3" label="注册省市" sortable>
          </el-table-column>
          <el-table-column prop="data3" label="企业规模" sortable>
          </el-table-column>
          <el-table-column prop="data3" label="生存年限" sortable>
          </el-table-column>
          <el-table-column prop="data3" label="企业类型" sortable>
          </el-table-column>
          <el-table-column prop="data3" label="注册资金币种" sortable>
          </el-table-column>
          <el-table-column prop="data3" label="注册资金" sortable>
          </el-table-column>
          <el-table-column prop="data3" label="成立时间" sortable>
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
  </div>
</template>
<script>
import chainPane from "@/components/indexPage/chainCanvas";
export default {
  data() {
    return {
      parkName: "张江高科技园区",

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
  components: { chainPane },
  methods: {
    // 勾选改变
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 排序改变
    sortChange(params) {
      console.log(params);
    },
    clickFn(params) {
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
.parkChainPage {
  width: 100%;
  padding: 20px;
  .parkChainTitle {
    font-size: 16px;
    color: rgb(16, 39, 173);
    margin-bottom: 10px;
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
}
</style>
