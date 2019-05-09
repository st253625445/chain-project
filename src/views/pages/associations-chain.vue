<template>
  <div class="associationChainPage">
    <p class="associationChainTitle">{{ associationName }}-协会成员</p>
    <div class="itemBox chainBox">
      <chain-pane />
    </div>

    <div class="itemBox associationChainListBox">
      <p class="title">
        {{ associationName }}
        <span class="subTitle"
          >协会成员 <span class="blueSpan">{{ enterNum }}</span
          >名
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
          <el-table-column label="序号">
            <template slot-scope="scope">
              <span>
                {{ scope.$index + (page - 1) * pageSize + 1 }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="协会成员"
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
            label="会员类型"
            class-name="tableTextLeft"
            label-class-name="tableTextLeft"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>
                {{ scope.row.roleList.join(",") }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="产业链板块"
            class-name="tableTextLeft"
            label-class-name="tableTextLeft"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span
                class="blueSpan pointerHover"
                v-for="(item, index) in scope.row.relateChains"
                :key="index"
              >
                {{ item.chainName }}，
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="mainProducts"
            label="主要产品"
            :show-overflow-tooltip="true"
          >
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
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="lifeSpan"
            label="生存年限"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="enterType"
            label="企业类型"
            sortable="custom"
            :show-overflow-tooltip="true"
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
            label="注册资金"
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
          :total="enterNum"
          :current-page="page"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import chainPane from "@/components/associationsPage/chainCanvas";
import { getSocialOrganMembers } from "@/api/getData";
export default {
  data() {
    return {
      associationName: "",
      associationId: "",
      page: 1,
      pageSize: 5,
      orderField: 0,
      order: 0,
      enterNum: 0,
      tableData: []
    };
  },
  filters: {
    timeFilter(val) {
      if (val) {
        return val.substring(0, 10);
      }
    }
  },
  created() {
    let query = this.$route.query;
    try {
      this.associationName = query.socialOrganName;
      this.associationId = query.socialOrganId;
      this.getCompanyList();
    } catch (err) {
      console.log(err);
    }
  },
  components: { chainPane },
  methods: {
    getCompanyList() {
      if (this.associationId) {
        let _opt = {
          id: this.associationId,
          page: this.page,
          pageSize: this.pageSize,
          orderField: this.orderField,
          order: this.order
        };
        getSocialOrganMembers(_opt)
          .then(res => {
            if (res.code === 200) {
              this.tableData = res.data.socialCompanyViewList;
              this.enterNum = res.data.socialOrganCompanyStatics.otherCount;
            } else {
              this.tableData = [];
              this.enterNum = 0;
            }
          })
          .catch(rej => {
            console.log(rej);
            this.tableData = [];
            this.enterNum = 0;
          });
      }
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
      this.getCompanyList();
    },
    clickFn(params) {
      console.log(params);
    },
    // 页码每页条数改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.page = 1;
      this.getCompanyList();
    },
    // 页码跳转
    handleCurrentChange(val) {
      this.page = val;
      this.getCompanyList();
    }
  }
};
</script>
<style lang="less">
.associationChainPage {
  width: 100%;
  padding: 20px;
  .associationChainTitle {
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
  .el-table .tableTextLeft {
    text-align: left;
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
