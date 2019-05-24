<template>
  <div class="associationsPage">
    <div class="seach-header">
      <el-input
        placeholder="协会名称关键字"
        v-model="associationsNameQ"
        class="associationsNameSearch"
        @keyup.enter.native="searchButtomClick"
      >
        <el-button slot="append" @click="searchButtomClick">搜索</el-button>
      </el-input>
    </div>
    <div class="associationsTagsBox">
      <div class="tagsUl">
        <ul>
          <li :class="{ active: !chainNameIndex }">
            <span @click="chainNameItemClick()">全部</span>
          </li>
          <li
            v-for="(item, index) in tradeList"
            :key="index"
            :class="{ active: chainNameIndex && chainNameIndex === index + 1 }"
          >
            <span @click="chainNameItemClick(index + 1)">{{ item }}</span>
          </li>
        </ul>
        <p class="title">热门产业</p>
      </div>
    </div>
    <div class="associationsList" v-loading="tableLoading">
      <p class="title">
        <span class="subTitle"
          >{{ `${statics.industryName}行业` }}共计
          {{ statics.numOfSo }} 个协会，其中民政部登记的共
          {{ statics.numOfMCA }} 个,地方登记 {{ statics.others }} 个</span
        >
      </p>
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
        <el-table-column
          label="协会名称"
          class-name="tableTextLeft"
          label-class-name="tableTextLeft"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span @click="openInfoBox(scope.row)" class="pointerHover">{{
              scope.row.socialOrganizationName
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="establishDate"
          label="成立登记时间"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="registeredCapital"
          label="注册资金"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="registrationAuthority"
          label="登记管理机关"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="socialOrganizationType"
          label="社会组织机关"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="登记状态"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="memberCount"
          label="会员个数"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column label="协会成员" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span
              @click="linkAssociationsChain(scope.row)"
              class="pointerHover"
            >
              查看
            </span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 20]"
        :page-size="paramsPageSize"
        layout="prev, pager, next, sizes, jumper"
        :total="statics.numOfSo"
        :current-page="paramsPage"
      >
      </el-pagination>
    </div>
    <div
      class="associationsInfoBox"
      v-if="infoBoxShow"
      v-clickoutside="closeInfoBox"
    >
      <div class="title">{{ infoTitle }}</div>
      <div class="infoCount" v-loading="infoLoading">
        <div>
          <p v-html="infoCount"></p>
        </div>
      </div>
      <div class="submit" @click="closeInfoBox">确 定</div>
    </div>
  </div>
</template>
<script>
import Clickoutside from "element-ui/src/utils/clickoutside";
import {
  getSocialOrganBaseInfo,
  getSocialOrganInfo,
  getSocialOrganList
} from "@/api/getData";
export default {
  data() {
    return {
      infoBoxShow: false,
      associationsNameQ: "",
      tableLoading: true,
      tradeList: [],
      tableData: [],
      statics: {
        industryName: "",
        numOfSo: 0,
        numOfMCA: 0,
        others: 0
      },
      chainNameIndex: null,
      paramsChainName: "",
      paramsPage: 1,
      paramsPageSize: 5,
      infoTitle: "",
      infoCount: "",
      infoLoading: true
    };
  },
  directives: { Clickoutside },
  mounted() {
    let query = this.$route.query;
    if (query.associationsQuery) {
      this.associationsNameQ = query.associationsQuery;
    }
    this.getBaseInfo();
    this.getList();
  },
  methods: {
    getBaseInfo() {
      getSocialOrganBaseInfo()
        .then(res => {
          if (res.code === 200) {
            this.tradeList = res.data.baseChain;
          } else {
            this.tradeList = [];
          }
        })
        .catch(rej => {
          console.log(rej);
          this.tradeList = [];
        });
    },
    getList() {
      let _opt = {
        hotIndustryName: this.paramsChainName,
        keyword:
          this.associationsNameQ === this.paramsChainName
            ? ""
            : this.associationsNameQ,
        page: this.paramsPage,
        pageSize: this.paramsPageSize
      };
      this.tableLoading = true;
      getSocialOrganList(_opt).then(res => {
        this.tableLoading = false;
        if (res.code === 200) {
          this.tableData = res.data.socialOrganList;
          this.statics = res.data.socialOrganStatics;
        }
      });
    },
    searchButtomClick() {
      let index = this.tradeList.indexOf(this.associationsNameQ);
      if (index === -1) {
        this.chainNameIndex = null;
        this.paramsChainName = "";
      } else {
        this.chainNameIndex = index + 1;
        this.paramsChainName = this.associationsNameQ;
      }
      this.getList();
    },
    // 热门产业点击
    chainNameItemClick(index) {
      if (index) {
        if (index === this.chainNameIndex) {
          this.chainNameIndex = null;
          this.paramsChainName = "";
          this.associationsNameQ = "";
        } else {
          this.chainNameIndex = index;
          this.paramsChainName = this.tradeList[index - 1];
          this.associationsNameQ = this.tradeList[index - 1];
        }
      } else {
        this.chainNameIndex = null;
        this.paramsChainName = "";
        this.associationsNameQ = "";
      }
      this.paramsPage = 1;
      this.getList();
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
      this.paramsPageSize = val;
      this.paramsPage = 1;
      this.getList();
    },
    // 页码跳转
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.paramsPage = val;
      this.getList();
    },
    // 显示园区信息
    openInfoBox(data) {
      let _id = data.id;
      this.infoTitle = data.socialOrganizationName;
      this.infoCount = "";
      this.infoLoading = true;
      this.infoBoxShow = false;
      if (_id) {
        getSocialOrganInfo(_id).then(res => {
          if (res.code === 200) {
            this.infoCount = res.data;
            this.infoBoxShow = true;
          }
          this.infoLoading = false;
        });
      }
    },
    // 园区信息外部点击隐藏
    closeInfoBox() {
      this.infoBoxShow = false;
    },
    // 链接协会成员
    linkAssociationsChain(data) {
      let _query = {
        socialOrganId: data.id,
        socialOrganName: data.socialOrganizationName
      };
      let routeData = this.$router.resolve({
        path: "/associationsChain",
        query: _query
      });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>

<style lang="less">
.associationsPage {
  position: relative;
  width: 100%;
  padding: 20px;
  .seach-header {
    display: flex;
    .dropdown-link {
      position: relative;
      width: 70px;
      height: 24px;
      text-align: center;
      padding-right: 15px;
      margin-right: 10px;
      color: #4b61e7;
      background: #fff;
      border: 1px solid #4b61e7;
      i {
        position: absolute;
        right: 5px;
        top: 5px;
      }
      .borderMask {
        position: absolute;
        left: 0;
        top: 21px;
        width: 100%;
        height: 3px;
        background: #fff;
        z-index: 3;
      }
    }
    .dropdownBox {
      position: absolute;
      left: -1px;
      top: 22px;
      width: 320px;
      height: auto;
      padding: 10px 20px;
      border: 1px solid #4b61e7;
      background: #fff;
      z-index: 2002;
      ul {
        width: 100%;
      }
      li {
        position: relative;
        width: 100%;
        padding-left: 60px;
        text-align: left;
      }
      span {
        font-size: 14px;
        line-height: 32px;
      }
      span.item {
        display: inline-block;
        width: 25%;
        cursor: pointer;
      }
      span.title {
        position: absolute;
        left: 0;
        color: #000;
      }
    }
    .associationsNameSearch {
      width: 300px;
      height: 24px;
      margin-bottom: 10px;
    }
    .el-input__inner {
      height: 24px;
      line-height: 24px;
      border-radius: 0;
    }
    .el-input-group__append {
      border-radius: 0;
      background-color: #4b61e7;
      border-color: #4b61e7;
      color: #fff;
    }
  }
  .associationsTagsBox {
    width: 100%;
    margin-bottom: 10px;
    padding-bottom: 10px;
    font-size: 12px;
    line-height: 20px;
    color: #666666;
    background: #fff;
    border: 1px solid #eeeeee;
    .tagsUl {
      position: relative;
      width: 100%;
      padding: 0 20px 0 77px;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        max-width: 110px;
        margin: 10px 7px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        span {
          padding: 0 9px;
        }
        &:hover,
        &.active {
          color: #fff;
          background: #4b61e7;
        }
      }
    }
    .title {
      position: absolute;
      width: 50px;
      text-align: left;
      font-size: 12px;
      left: 20px;
      top: 10px;
      color: #000;
      &:after {
        content: "";
        display: inline-block;
        width: 100%;
      }
    }
  }
  .associationsList {
    width: 100%;
    padding: 0 20px;
    background: #fff;
    border: 1px solid #eeeeee;
    margin-bottom: 20px;
    .title {
      font-size: 16px;
      line-height: 60px;
      color: #4b61e7;
      .subTitle {
        display: inline-block;
        text-indent: 20px;
        font-size: 12px;
        color: rgb(170, 170, 170);
        line-height: 1.2;
      }
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
    .pointerHover {
      color: #4b61e7;
    }
  }
  .associationsInfoBox {
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
