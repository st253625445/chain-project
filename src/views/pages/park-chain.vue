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
          {{ parkName }}中，明星企业
          <span class="blueSpan">{{ enterNum }}</span> 名
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
            width="60"
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
                @click="openRelateChainsAll(scope.row)"
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
            label="成立时间"
            sortable="custom"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.establishTime | timeFilter }} </span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          layout="prev, pager, next, sizes, jumper"
          :total="enterNum"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import chainPane from "@/components/parkPage/chainCanvas";
import { getParkCompanyList } from "@/api/getData";
export default {
  data() {
    return {
      parkName: "张江高科技园区",
      parkId: "",
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
  components: { chainPane },
  created() {
    let query = this.$route.query;
    try {
      this.parkName = query.parkName;
      this.parkId = query.parkId;
      this.getParkCompanyList();
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    getParkCompanyList() {
      if (this.parkId) {
        let _opt = {
          id: this.parkId,
          page: this.page,
          pageSize: this.pageSize,
          orderField: this.orderField,
          order: this.order
        };
        getParkCompanyList(_opt)
          .then(res => {
            if (res.code === 200) {
              this.tableData = res.data.companyParkList;
              this.enterNum = res.data.parkCompanyStatic.otherCount;
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
      this.order = 0;
      switch (params.prop) {
        case "regLocation":
          field = 1;
          this.order = params.order
            ? params.order === "ascending"
              ? 1
              : 2
            : 0;
          break;
        default:
          field = 0;
      }
      this.orderField = field;
      this.getParkCompanyList();
    },
    clickFn(params) {
      console.log(params);
    },
    // 页码每页条数改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.page = 1;
      this.getParkCompanyList();
    },
    // 页码跳转
    handleCurrentChange(val) {
      this.page = val;
      this.getParkCompanyList();
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
  .relateChainsAllBox {
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
    .chainsCount {
      width: 100%;
      height: 270px;
      overflow: hidden;
      > div {
        display: flex;
        flex-wrap: wrap;
        width: calc(100% + 20px);
        height: 270px;
        padding-right: 20px;
        padding-bottom: 70px;
        overflow-y: scroll;
      }
      span {
        display: block;
        padding: 5px 0;
        font-size: 12px;
        line-height: 24px;
        text-indent: 2em;
        color: #1027ad;
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
