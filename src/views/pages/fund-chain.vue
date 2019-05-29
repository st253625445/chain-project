<template>
  <div class="fundChainPage">
    <p class="fundChainTitle">{{ companyName }}-投资谱系</p>
    <div class="itemBox chainBox">
      <chain-pane :chainData="chainData" :chainLoading="chainLoading" />
    </div>

    <div class="itemBox fundChainListBox">
      <p class="title">
        <span class="subTitle"
          >{{ companyName }}投资实体企业
          <span class="blueSpan">{{ total }}</span> 家
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
            width="60"
            label="序号"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>
                {{ scope.$index + (page - 1) * pageSize + 1 }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="企业名称"
            class-name="tableTextLeft"
            label-class-name="tableTextLeft"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span @click="clickFn(scope.row)" class="pointerHover">{{
                scope.row.enterName
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="relateChains"
            label="产业链板块"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span
                v-for="(item, index) in scope.row.relateChains"
                :key="index"
              >
                {{ item.chainName }}
                <span v-if="index < scope.row.relateChains.length - 1">,</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="mainProducts"
            label="主要产品"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column label="所在集团" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span @click="clickFn(scope.row)" class="blueSpan pointerHover"
                >详情</span
              >
            </template>
          </el-table-column>
          <el-table-column label="企业关联方" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span @click="clickFn(scope.row)" class="blueSpan pointerHover"
                >详情</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="regLocation"
            label="注册省市"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="enterScale"
            label="企业规模"
            :show-overflow-tooltip="true"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="lifeSpan"
            label="生存年限"
            :show-overflow-tooltip="true"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="enterType"
            label="企业类型"
            :show-overflow-tooltip="true"
            sortable="custom"
          >
          </el-table-column>
          <el-table-column
            prop="currency"
            label="注册资金币种"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="regCapital"
            label="注册资金(万元)"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="establishTime"
            label="成立时间"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          layout="prev, pager, next, sizes, jumper"
          :total="total"
          :current-page="page"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import chainPane from "@/components/fundPage/chainCanvas";
import { getCbcPedigree, getCbcCompany } from "@/api/getData";
export default {
  data() {
    return {
      companyName: "",
      companyId: "",
      chainData: [],
      chainLoading: true,
      tableLoading: false,
      tableData: [],
      page: 1,
      pageSize: 5,
      orderField: 0,
      order: 0,
      total: 0,
      from: ""
    };
  },
  created() {
    let query = this.$route.query;
    if (query.companyId) {
      this.companyId = query.companyId;
      this.companyName = query.companyName;
      this.getData();
    } else {
      this.$router.push("/");
    }
  },
  components: { chainPane },
  methods: {
    // 请求数据
    getData() {
      this.getCbcPedigree();
      this.getCbcCompanyList();
    },
    // 请求投资谱系
    getCbcPedigree() {
      let opt = {
        id: this.companyId
      };
      this.chainLoading = true;
      getCbcPedigree(opt).then(res => {
        if (res.code === 200) {
          this.chainData = res.data;
          this.chainLoading = false;
        }
      });
    },
    // 获取列表
    getCbcCompanyList() {
      let opt = {
        id: this.companyId,
        page: this.page,
        pageSize: this.pageSize,
        orderField: this.orderField,
        order: this.order
      };
      getCbcCompany(opt)
        .then(res => {
          if (res.code === 200) {
            this.tableData = res.data.companyViewList;
            this.total = res.data.parkCompanyStatic.otherCount;
            this.tableLoading = false;
          } else {
            this.tableData = [];
            this.total = 0;
            this.tableLoading = false;
          }
        })
        .catch(rej => {
          console.log(rej);
          this.tableData = [];
          this.total = 0;
          this.tableLoading = false;
        });
    },
    // 勾选改变
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 排序改变
    sortChange(params) {
      let field;
      switch (params.prop) {
        case "regLocation":
          field = 1;
          break;
        // case "enterScale":
        //   field = 2;
        //   break;
        // case "lifeSpan":
        //   field = 3;
        //   break;
        // case "enterType":
        //   field = 4;
        //   break;
        // case "currency":
        //   field = 5;
        //   break;
        // case "regCapital":
        //   field = 6;
        //   break;
        // case "establishTime":
        //   field = 7;
        //   break;
        default:
          field = 0;
      }
      this.order = params.order ? (params.order === "ascending" ? 1 : 2) : 0;
      this.orderField = field;
      this.getCbcCompanyList();
    },
    clickFn(params) {
      console.log(params);
    },
    // 页码每页条数改变
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page = 1;
      this.pageSize = val;
      this.getCbcCompanyList();
    },
    // 页码跳转
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getCbcCompanyList();
    }
  }
};
</script>
<style lang="less">
.fundChainPage {
  width: 100%;
  padding: 20px;
  .fundChainTitle {
    font-size: 16px;
    color: rgb(16, 39, 173);
    margin-bottom: 10px;
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
}
</style>
