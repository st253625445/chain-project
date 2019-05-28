<template>
  <div class="fundAllPage">
    <div class="seach-header">
      <span
        class="dropdown-link"
        @click="dropdownShow = !dropdownShow"
        v-clickoutside="dropdownOutClick"
      >
        {{ locationVal }}
        <i class="el-icon-arrow-down el-icon--right"></i>
        <i class="borderMask" v-if="dropdownShow"></i>
        <transition name="el-zoom-in-top">
          <div class="dropdownBox" v-if="dropdownShow" @click.stop>
            <ul>
              <li v-for="(item, key, index) of locationData" :key="index">
                <span class="title">{{ key }}</span>
                <span
                  class="item"
                  v-for="(item2, index2) in item"
                  :key="index2"
                  @click="locationDropdownItemClick(item2)"
                  >{{ item2 }}</span
                >
              </li>
            </ul>
          </div>
        </transition>
      </span>
      <el-dropdown
        trigger="click"
        @command="registeredCommand"
        placement="bottom-start"
        class="fundDropdownTop"
      >
        <span class="el-dropdown-link">
          注册资本<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="fundDropdown">
          <el-dropdown-item
            v-for="(item, index) in capitalLists"
            :key="index"
            :command="index"
            :class="{ active: index === registeredIndex }"
            >{{ item.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown
        trigger="click"
        @command="paidCommand"
        placement="bottom-start"
        class="fundDropdownTop"
      >
        <span class="el-dropdown-link">
          实缴资本<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="fundDropdown">
          <el-dropdown-item
            v-for="(item, index) in capitalLists"
            :key="index"
            :command="index"
            :class="{ active: index === paidIndex }"
            >{{ item.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown
        trigger="click"
        @command="yearLimitCommand"
        placement="bottom-start"
        class="fundDropdownTop"
        style="marginRight: auto;"
      >
        <span class="el-dropdown-link">
          成立年限<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="fundDropdown">
          <el-dropdown-item
            v-for="(item, index) in yearLimitLists"
            :key="index"
            :command="index"
            :class="{ active: index === yearLimitIndex }"
            >{{ item.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
      <el-input
        placeholder="产业基金名称关键字"
        v-model="params.query"
        class="fundAllNameSearch"
      >
        <el-button slot="append" @click="searchIconClick">搜索</el-button>
      </el-input>
    </div>
    <div class="fundAllTagsBox">
      <div class="tagsUl">
        <ul>
          <li :class="{ active: !baseIndex }">
            <span @click="baseItemClick()">全部</span>
          </li>
          <li
            v-for="(item, index) in locationList"
            :key="index"
            :class="{ active: baseIndex && baseIndex === index + 1 }"
          >
            <span @click="baseItemClick(index + 1)">{{ item }}</span>
          </li>
        </ul>
        <p class="title">地区</p>
      </div>
      <div class="tagsUl">
        <ul>
          <li :class="{ active: !chainNameIndex }">
            <span @click="chainNameItemClick()">全部</span>
          </li>
          <li
            v-for="(item, index) in industryList"
            :key="index"
            :class="{ active: chainNameIndex && chainNameIndex === index + 1 }"
          >
            <span @click="chainNameItemClick(index + 1)">{{ item }}</span>
          </li>
        </ul>
        <p class="title">产业</p>
      </div>
    </div>
    <div class="itemBox fundAllList" v-loading="tableLoading">
      <p class="title">
        <span class="subTitle"
          >{{ locationVal }}{{ params.district }}区域共计
          <span class="blueSpan">{{ tabelTotal.ownerCount }}</span>
          支产业基金，投资实体
          <span class="blueSpan">{{ tabelTotal.targetCount }}</span> 家</span
        >
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
                {{ scope.$index + (params.page - 1) * params.pageSize + 1 }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="产业基金名称"
            class-name="tableTextLeft"
            label-class-name="tableTextLeft"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span @click="openInfoBox(scope.row)" class="pointerHover">{{
                scope.row.name
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="regCapital"
            label="注册资本（万元）"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="currency"
            label="币种"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="establishDate"
            label="成立时间"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="directInvestCount"
            label="直接投资实体企业数"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column label="投资谱系" :show-overflow-tooltip="true"
            >>
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
          :page-size="params.pageSize"
          layout="prev, pager, next, sizes, jumper"
          :total="tabelTotal.ownerCount"
          :current-page="params.page"
        >
        </el-pagination>
      </div>
    </div>
    <div
      class="fundAllInfoBox"
      v-if="infoBoxShow"
      v-clickoutside="closeInfoBox"
    >
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
import { getCbcBaseInfo, getCbcSearch, getCompanyInfo } from "@/api/getData";
import { parseTime } from "@/utils";
export default {
  data() {
    return {
      locationVal: "全国",
      dropdownShow: false,
      infoBoxShow: false,
      baseDistricts: {},
      baseIndex: null,
      locationList: [],
      chainNameIndex: null,
      industryList: [],
      tableData: [],
      tabelTotal: {},
      tableLoading: true,
      locationData: {
        全国: ["全国"],
        直辖市: ["北京", "上海", "天津", "重庆"],
        华北: ["河北", "山西", "内蒙古"],
        华东: ["山东", "江苏", "安徽", "江西", "浙江", "福建", "台湾"],
        华中: ["湖北", "湖南", "河南"],
        华南: ["广东", "广西", "海南", "香港", "澳门"],
        西南: ["四川", "贵州", "云南", "西藏"],
        西北: ["陕西", "甘肃", "宁夏", "新疆", "青海"],
        东北: ["黑龙江", "吉林", "辽宁"]
      },
      capitalLists: [
        {
          name: "0-100万",
          start: "0",
          end: "100"
        },
        {
          name: "100万-1000万",
          start: "100",
          end: "1000"
        },
        {
          name: "1000万-3000万",
          start: "1000",
          end: "3000"
        },
        {
          name: "3000万-1亿",
          start: "3000",
          end: "10000"
        },
        {
          name: "1亿-5亿",
          start: "10000",
          end: "50000"
        },
        {
          name: "5亿+",
          start: "50000",
          end: null
        }
      ],
      yearLimitLists: [
        {
          name: "0-1年",
          start: 1,
          end: 0
        },
        {
          name: "1-3年",
          start: 3,
          end: 1
        },
        {
          name: "3-5年",
          start: 5,
          end: 3
        },
        {
          name: "5-10年",
          start: 10,
          end: 5
        },
        {
          name: "10年+",
          start: null,
          end: 10
        }
      ],
      registeredIndex: null, // 注册资本选中下标
      paidIndex: null, // 实缴资本选中下标
      yearLimitIndex: null, // 成立年限选中下标
      params: {
        base: "", // 省份
        query: "", // 搜索关键词
        chainName: "", // 热门产业词
        district: "", // 地区参数
        regCapitalJson: {},
        paidInCapitalJson: {},
        establishDateJson: {},
        page: 1,
        pageSize: 5
      },
      infoBoxData: {},
      infoLoading: true
    };
  },
  directives: { Clickoutside },
  mounted() {
    let query = this.$route.query;
    if (query.fundQuery) {
      this.params.query = query.fundQuery;
    }
    this.getBaseInfo();
    this.getList();
  },
  methods: {
    // 获取行政区划/热门行业标签
    getBaseInfo() {
      getCbcBaseInfo().then(res => {
        if (res.code === 200) {
          this.baseDistricts = res.data.baseDistricts;
          this.industryList = res.data.chainNames;
          this.locationList = this.baseDistricts["全国"];
        }
      });
    },
    // 请求产业基金列表
    getList() {
      let opt = {
        ...this.params,
        ...{
          base: this.locationVal === "全国" ? "" : this.locationVal,
          keyword:
            this.params.query === this.params.chainName
              ? ""
              : this.params.query,
          regCapitalJson: this.dropDownDataReturn(
            this.capitalLists,
            this.registeredIndex
          ),
          paidInCapitalJson: this.dropDownDataReturn(
            this.capitalLists,
            this.paidIndex
          ),
          establishDateJson: this.dropDownDataReturn(
            this.yearLimitLists,
            this.yearLimitIndex,
            true
          )
        }
      };
      this.tableLoading = true;
      getCbcSearch(opt)
        .then(res => {
          if (res.code === 200) {
            this.tabelTotal = res.data.districtInvestStatics;
            this.tableData = res.data.cbcCompanyViewList;
            this.tableLoading = false;
          } else {
            this.tabelTotal = res.data.districtInvestStatics;
            this.tableData = res.data.cbcCompanyViewList;
            this.tableLoading = false;
          }
        })
        .catch(rej => {
          console.log(rej);
          if (!rej.__CANCEL__) {
            this.tabelTotal = {};
            this.tableData = [];
            this.tableLoading = false;
          }
        });
    },
    // 搜索按钮点击
    searchIconClick() {
      this.params.page = 1;
      this.getList();
    },
    // 下拉数据处理
    dropDownDataReturn(data, index, isyear) {
      let _return = "";
      if (index !== null) {
        if (isyear) {
          let _date = parseTime(new Date()).substr(0, 10);
          _return = {
            low:
              data[index].start !== null
                ? _date.substr(0, 4) - data[index].start + _date.substr(4)
                : "",
            high:
              data[index].end !== null
                ? _date.substr(0, 4) - data[index].end + _date.substr(4)
                : ""
          };
        } else {
          _return = {
            low: data[index].start,
            high: data[index].end
          };
        }
      } else {
        _return = {};
      }
      return encodeURIComponent(JSON.stringify(_return));
    },
    // 地区下拉外部点击隐藏下拉
    dropdownOutClick() {
      this.dropdownShow = false;
    },
    // 注册资本下拉
    registeredCommand(command) {
      this.registeredIndex = this.registeredIndex === command ? null : command;
      this.params.page = 1;
      this.getList();
    },
    // 实缴资本下拉
    paidCommand(command) {
      this.paidIndex = this.paidIndex === command ? null : command;
      this.params.page = 1;
      this.getList();
    },
    // 成立年限下拉
    yearLimitCommand(command) {
      this.yearLimitIndex = this.yearLimitIndex === command ? null : command;
      this.params.page = 1;
      this.getList();
    },
    // 城市筛选点击
    locationDropdownItemClick(data) {
      this.locationVal = data;
      this.locationList = this.baseDistricts[data];
      this.baseIndex = null;
      this.paramsDistrict = "";
      this.dropdownShow = false;
      this.params.page = 1;
      this.getList();
    },
    // 地区点击
    baseItemClick(index) {
      if (index) {
        if (index === this.baseIndex) {
          this.baseIndex = null;
          this.params.district = "";
        } else {
          this.baseIndex = index;
          this.params.district = this.locationList[index - 1];
        }
      } else {
        this.baseIndex = null;
        this.params.district = "";
      }
      this.params.page = 1;
      this.getList();
    },
    // 热门产业点击
    chainNameItemClick(index) {
      if (index) {
        if (index === this.chainNameIndex) {
          this.chainNameIndex = null;
          this.params.query = "";
          this.params.chainName = "";
        } else {
          this.chainNameIndex = index;
          this.params.query = this.industryList[index - 1];
          this.params.chainName = this.industryList[index - 1];
        }
      } else {
        this.chainNameIndex = null;
        this.params.query = "";
        this.params.chainName = "";
      }
      this.params.page = 1;
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
      this.params.pageSize = val;
      this.params.page = 1;
      this.getList();
    },
    // 页码跳转
    handleCurrentChange(val) {
      this.params.page = val;
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
.fundAllPage {
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
    .fundAllNameSearch {
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
  .fundAllTagsBox {
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
      width: 48px;
      text-align: justify;
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
  .fundAllList {
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
    .pointerHover {
      color: #4b61e7;
    }
  }
  .fundAllInfoBox {
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
