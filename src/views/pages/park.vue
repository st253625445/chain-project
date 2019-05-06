<template>
  <div class="parkPage">
    <div class="seach-header">
      <span
        class="dropdown-link"
        @click="dropdownShow = !dropdownShow"
        v-clickoutside="dropdownOutClick"
      >
        {{ locationVal }}
        <i class="el-icon-arrow-down el-icon--right"></i>
        <i class="borderMask" v-if="dropdownShow"></i>
        <transition name="dropdown">
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
      <el-input
        placeholder="请输入产业园、产业集群关键字"
        v-model="parkNameQ"
        class="parkNameSearch"
      >
        <el-button slot="append" @click="searchButtomClick">搜索</el-button>
      </el-input>
    </div>
    <div class="parkTagsBox">
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
        <p class="title">热门产业</p>
      </div>
    </div>
    <div class="parkList" v-loading="tableLoading">
      <p class="title">
        <span class="subTitle"
          >{{ parkStatics.base }}{{ parkStatics.district }}区域共计{{
            parkStatics.parkNum
          }}个产业园，涉及{{ parkStatics.chainNum }}个产业链，{{
            parkStatics.companyNum
          }}家明星企业</span
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
          width="60"
          label-class-name="selectLable"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          label="产业园名称"
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
          prop="base"
          label="地区"
          width="80"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          label="成立时间"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.establishDate | timeFilter }} </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="industries"
          label="产业集群"
          class-name="tableTextLeft"
          label-class-name="tableTextLeft"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span @click="linkParkChain(scope.row)">
              <span class="pointerHover">{{
                scope.row.industries && scope.row.industries.join("，")
              }}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          width="120"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="companyNum"
          label="注册企业"
          width="100"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          label="产业园名企"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span @click="linkParkChain(scope.row)" class="pointerHover"
              >查看</span
            >
          </template>
        </el-table-column>
        <el-table-column
          label="园区资讯"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span @click="linkParkNews(scope.row)" class="pointerHover"
              >查看</span
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 20]"
        :page-size="paramsPageSize"
        layout="prev, pager, next, sizes, jumper"
        :total="parkStatics.parkNum"
        :current-page="paramsPage"
      >
      </el-pagination>
    </div>
    <div class="parkInfoBox" v-if="infoBoxShow" v-clickoutside="closeInfoBox">
      <div class="title">{{ parkInfoTitle }}</div>
      <div class="infoCount" v-loading="parkInfoLoading">
        <div>
          <p>{{ parkInfoCount }}</p>
        </div>
      </div>
      <div class="submit" @click="closeInfoBox">确 定</div>
    </div>
  </div>
</template>
<script>
import Clickoutside from "element-ui/src/utils/clickoutside";
import { getParkBaseInfo, getParkSearch, getParkInfo } from "@/api/getData";
export default {
  data() {
    return {
      locationVal: "全国",
      dropdownShow: false,
      infoBoxShow: false,
      tableLoading: true,
      parkNameQ: "",
      baseDistricts: {},
      locationList: [],
      industryList: [],
      baseIndex: null,
      chainNameIndex: null,
      tableData: [],
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
      parkStatics: {
        base: "",
        chainNum: 0,
        companyNum: 0,
        district: "",
        parkNum: 0
      },
      paramsDistrict: "",
      paramsChainName: "",
      paramsPage: 1,
      paramsPageSize: 5,
      parkInfoTitle: "",
      parkInfoCount: "",
      parkInfoLoading: true
    };
  },
  filters: {
    timeFilter(val) {
      if (val) {
        return val.substring(0, 10);
      }
    }
  },
  directives: { Clickoutside },
  mounted() {
    let query = this.$route.query;
    if (query.parkQuery) {
      this.parkNameQ = query.parkQuery;
    }
    this.getBaseInfo();
    this.getParkSearch();
  },
  methods: {
    // 获取行政区划/热门行业标签
    getBaseInfo() {
      getParkBaseInfo().then(res => {
        if (res.code === 200) {
          this.baseDistricts = res.data.baseDistricts;
          this.industryList = res.data.chainNames;
          this.locationList = this.baseDistricts["全国"];
        }
      });
    },
    // 下拉外部点击隐藏下拉
    dropdownOutClick() {
      this.dropdownShow = false;
    },
    // 城市筛选点击
    locationDropdownItemClick(data) {
      this.locationVal = data;
      this.locationList = this.baseDistricts[data];
      this.baseIndex = null;
      this.paramsDistrict = "";
      this.dropdownShow = false;
      this.paramsPage = 1;
      this.getParkSearch();
    },
    // 搜索按钮点击
    searchButtomClick() {
      let index = this.industryList.indexOf(this.parkNameQ);
      if (index === -1) {
        this.chainNameIndex = null;
        this.paramsChainName = "";
      } else {
        this.chainNameIndex = index + 1;
        this.paramsChainName = this.parkNameQ;
      }
      this.getParkSearch();
    },
    // 地区点击
    baseItemClick(index) {
      if (index) {
        this.baseIndex = index;
        this.paramsDistrict = this.locationList[index - 1];
      } else {
        this.baseIndex = null;
        this.paramsDistrict = "";
      }
      this.paramsPage = 1;
      this.getParkSearch();
    },
    // 热门产业点击
    chainNameItemClick(index) {
      if (index) {
        this.chainNameIndex = index;
        this.paramsChainName = this.industryList[index - 1];
        this.parkNameQ = this.industryList[index - 1];
      } else {
        this.chainNameIndex = null;
        this.paramsChainName = "";
        this.parkNameQ = "";
      }
      this.paramsPage = 1;
      this.getParkSearch();
    },
    // 根据地址和产业链名查询产业园
    getParkSearch() {
      let _opt = {
        base: this.locationVal === "全国" ? "" : this.locationVal,
        chainName: this.paramsChainName,
        keyword: this.parkNameQ === this.paramsChainName ? "" : this.parkNameQ,
        page: this.paramsPage,
        pageSize: this.paramsPageSize,
        district: this.paramsDistrict
      };
      this.tableLoading = true;
      getParkSearch(_opt)
        .then(res => {
          if (res.code === 200) {
            this.tableData = res.data.parkInfoList;
            this.parkStatics = res.data.parkStatics;
          } else {
            this.tableData = [];
            this.parkStatics = {
              base: "",
              chainNum: 0,
              companyNum: 0,
              district: "",
              parkNum: 0
            };
          }
          this.tableLoading = false;
        })
        .catch(rej => {
          console.log(rej);
          this.tableData = [];
          this.parkStatics = {
            base: "",
            chainNum: 0,
            companyNum: 0,
            district: "",
            parkNum: 0
          };
          this.tableLoading = false;
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
    // 页码每页条数改变
    handleSizeChange(val) {
      this.paramsPageSize = val;
      this.paramsPage = 1;
      this.getParkSearch();
    },
    // 页码跳转
    handleCurrentChange(val) {
      this.paramsPage = val;
      this.getParkSearch();
    },
    // 显示园区信息
    openInfoBox(data) {
      this.parkInfoTitle = data.name;
      this.parkInfoCount = "";
      this.infoBoxShow = true;
      this.parkInfoLoading = true;
      let _opt = {
        id: data.id
      };
      getParkInfo(_opt).then(res => {
        if (res.code === 200) {
          this.parkInfoCount = res.data;
        }
        this.parkInfoLoading = false;
      });
    },
    // 园区信息外部点击隐藏
    closeInfoBox() {
      this.infoBoxShow = false;
    },
    // 链接产业集群
    linkParkChain(data) {
      console.log(data);
      let _query = {
        parkId: data.id,
        parkName: data.name
      };
      let routeData = this.$router.resolve({
        path: "/parkChain",
        query: _query
      });
      window.open(routeData.href, "_blank");
    },
    // 链接园区资讯
    linkParkNews(data) {
      console.log(data);
      let _query = {
        parkId: data.id
      };
      let routeData = this.$router.resolve({
        path: "/parkNews",
        query: _query
      });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>

<style lang="less">
.parkPage {
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
      z-index: 2;
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
    .parkNameSearch {
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
  .parkTagsBox {
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
  .parkList {
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
  .parkInfoBox {
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
