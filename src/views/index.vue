<template>
  <div class="chain-index-main">
    <div class="chain-index-header">
      <div class="logo-box">
        <img src="../assets/img/logo.png" alt="logo" class="logo" />
        <span class="logo-text">数知·产业链</span>
      </div>
      <!-- 个人中心 start -->
      <div class="userMenuBox">
        <el-dropdown trigger="click" class="fl">
          <span class="style-icon small-icon iconAction">
            <img src="../assets/img/iconUser.png" class="iconfont" />
          </span>
          <el-dropdown-menu
            slot="dropdown"
            class="model-pop my-center-dropdown"
          >
            <ul>
              <li>
                <a href="/mycenter?activeName=first" target="_blank"
                  >账户信息</a
                >
              </li>
              <li>
                <a href="/mycenter?activeName=second" target="_blank"
                  >修改密码</a
                >
              </li>
              <li>
                <a href="/chain/myconcern" target="_blank">我的关注</a>
              </li>
              <li>
                <a href="javascript:;" @click="logOut">退出</a>
              </li>
            </ul>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- 搜索盒子 -->
      <div class="searchBox">
        <div class="searchTab">
          <span
            :class="searchTab === '0' ? 'active' : ''"
            @click="searchTabChange('0')"
            >产业链</span
          >
          <span
            :class="searchTab === '1' ? 'active' : ''"
            @click="searchTabChange('1')"
            >公司</span
          >
          <span
            :class="searchTab === '2' ? 'active' : ''"
            @click="searchTabChange('2')"
            >产业园区</span
          >
          <span
            :class="searchTab === '3' ? 'active' : ''"
            @click="searchTabChange('3')"
            >产业基金</span
          >
          <span
            :class="searchTab === '4' ? 'active' : ''"
            @click="searchTabChange('4')"
            >协会联盟</span
          >
        </div>
        <el-input
          v-if="searchTab === '0'"
          class="autocomplete"
          popper-class="autocomplete-main"
          placeholder="请输入关键词进行搜索"
          @keyup.enter.native="searchChain"
          v-model="chainQuery"
        >
          <i
            slot="suffix"
            class="el-input__icon el-icon-search"
            @click="searchChain"
          ></i>
        </el-input>
        <el-autocomplete
          v-if="searchTab === '1'"
          class="autocomplete"
          popper-class="autocompletePopper"
          :fetch-suggestions="searchCompany"
          :trigger-on-focus="false"
          placeholder="请输入公司名称或简称"
          v-model.trim="companyQuery"
          @select="companyItemClick"
        ></el-autocomplete>
        <el-input
          v-if="searchTab === '2'"
          class="autocomplete"
          popper-class="autocomplete-main"
          placeholder="请输入产业园区名称或简称"
          @keyup.enter.native="searchPark"
          v-model.trim="parkQuery"
        >
          <i
            slot="suffix"
            class="el-input__icon el-icon-search"
            @click="searchPark"
          ></i>
        </el-input>
        <el-input
          v-if="searchTab === '3'"
          class="autocomplete"
          popper-class="autocomplete-main"
          placeholder="请输入产业基金名称或简称"
          @keyup.enter.native="searchFund"
          v-model.trim="fundQuery"
        >
          <i
            slot="suffix"
            class="el-input__icon el-icon-search"
            @click="searchFund"
          ></i>
        </el-input>
        <el-input
          v-if="searchTab === '4'"
          class="autocomplete"
          popper-class="autocomplete-main"
          placeholder="请输入协会联盟名称或简称"
          @keyup.enter.native="searchAssociations"
          v-model.trim="associationsQuery"
        >
          <i
            slot="suffix"
            class="el-input__icon el-icon-search"
            @click="searchAssociations"
          ></i>
        </el-input>
      </div>
      <div class="listTab">
        <div>
          <div
            :class="listTab === '0' ? 'active' : ''"
            @click="listTabChange('0')"
          >
            <span class="listTitle">产业资讯</span>
            <br />
            <span class="listSubTitle">收藏的产业的咨询尽收眼底</span>
          </div>
          <div
            :class="listTab === '1' ? 'active' : ''"
            @click="listTabChange('1')"
          >
            <span class="listTitle">产业机会</span>
            <br />
            <span class="listSubTitle">帮助产业锁定公司的一举一动</span>
          </div>
        </div>
      </div>
    </div>
    <div class="chain-index-listBox" v-loading="loading">
      <div class="chain-news-list" v-show="listTab === '0'">
        <div class="newsItem" v-for="(item, index) in newsLists" :key="index">
          <div class="title">
            <a :href="item.url" target="_blank" class="newsTitle">
              <span>{{ item.title }}</span>
            </a>
          </div>
          <div class="contentBox">
            <div class="content">
              <p class="title">【摘要】</p>
              <p class="text">{{ item.digest }}</p>
              <p class="time">{{ item.publishTime | timeFilter }}</p>
            </div>
            <div class="chain" :ref="'chainListBox' + index">
              <p class="title">
                【受影响产业链】
                <span
                  class="moreButton"
                  @click="moreButtonClick(index)"
                  v-if="chainListBoxsHeight[index] > 102"
                  >展开更多</span
                >
              </p>
              <div class="chainList">
                <span
                  v-for="(chainItem, chainIndex) in item.chains"
                  :key="chainIndex"
                  @click="chainItemClick(chainItem)"
                  >{{ chainItem.chainName }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="noMore" v-if="!loading">
          <span>没有更多</span>
        </div>
      </div>
      <div class="chain-chance-list" v-show="listTab === '1'">
        <el-table
          :data="showChanceData"
          style="width: 100%"
          header-cell-class-name="chanceListTh"
          row-class-name="chanceListTr"
        >
          <el-table-column prop="name" label="公司名称">
            <template slot-scope="scope">
              <router-link
                :to="{
                  path: '/company',
                  query: {
                    companyId: scope.row.companyId,
                    companyName: scope.row.companyName
                  }
                }"
                target="_blank"
              >
                <span>{{ scope.row.companyName }}</span>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="nodeList" label="产业标签">
            <template slot-scope="scope">
              <span>{{ scope.row.nodeList | nodeListFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="seriesLevel" label="轮次"></el-table-column>
          <el-table-column prop="base" label="地区">
            <template slot-scope="scope">
              <span>{{ scope.row.base | addressFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="seriesTime" label="成立时间">
            <template slot-scope="scope">
              <span>{{ scope.row.seriesTime | timeFilter }}</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- <div class="noMore">
          <span>没有更多</span>
        </div>-->
        <el-pagination
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="chanceData.length"
          @current-change="companyPageChange"
        ></el-pagination>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import { trim } from "@/utils/index";
import { timeSub10, nameToShort } from "@/utils/filter";
import {
  getSearchCompany,
  getChainSuggest,
  getCompanySuggest
} from "@/api/getData";
import Footer from "@/components/common/footer";
export default {
  data() {
    return {
      searchTab: "0",
      listTab: "0",
      state: true,
      chainQuery: "",
      companyQuery: "",
      parkQuery: "",
      associationsQuery: "",
      fundQuery: "",
      panelShow: false,
      companyitems: [],
      newsLists: [],
      pageSize: 10,
      chanceData: [],
      showChanceData: [],
      loading: true,
      chainListBoxsHeight: []
    };
  },
  components: { Footer },
  computed: {},
  watch: {},
  filters: {
    timeFilter(time) {
      if (time) {
        return timeSub10(time);
      }
    },
    nodeListFilter(data) {
      if (data && data.length > 0) {
        return data.join(",");
      }
    },
    addressFilter(short) {
      return nameToShort(short);
    }
  },
  mounted() {
    this.getChainNews();
    this.getCompanyLists();
  },
  methods: {
    logOut() {
      // 退出
      if (confirm("确定退出吗？")) {
        this.$store.dispatch("LogOut").then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
      }
    },
    // 切换搜索类型
    searchTabChange(tab) {
      this.searchTab = tab;
    },
    // 切换列表
    listTabChange(tab) {
      this.listTab = tab;
    },
    // 搜索产业链
    async searchChain() {
      if (!trim(this.chainQuery)) {
        this.$message({
          showClose: true,
          message: "请输入关键词",
          type: "error"
        });
        return false;
      }
      let _query = {
        keyword: trim(this.chainQuery)
      };
      this.$router.push({ path: "/index", query: _query });
    },
    // 输入公司匹配
    searchCompany(query, cb) {
      if (query) {
        if (this.companyitems.length === 0) {
          cb(this.companyitems);
        }
        getSearchCompany(query)
          .then(res => {
            if (res.code === 200) {
              let _datas = res.data;
              for (let i = 0; i < _datas.length; i++) {
                _datas[i]["value"] = _datas[i].companyName;
              }
              cb(_datas);
              this.companyitems = _datas;
            }
          })
          .catch(rej => {
            console.log(rej);
          });
      }
    },
    // 搜索产业园区
    searchPark() {
      if (!this.parkQuery) {
        this.$message({
          showClose: true,
          message: "请输入关键词",
          type: "error"
        });
        return false;
      }
      let _query = {
        parkQuery: this.parkQuery
      };
      this.$router.push({ path: "/park", query: _query });
    },
    searchAssociations() {
      if (!this.associationsQuery) {
        this.$message({
          showClose: true,
          message: "请输入关键词",
          type: "error"
        });
        return false;
      }
      let _query = {
        associationsQuery: this.associationsQuery
      };
      this.$router.push({ path: "/associations", query: _query });
    },
    searchFund() {
      if (!this.fundQuery) {
        this.$message({
          showClose: true,
          message: "请输入关键词",
          type: "error"
        });
        return false;
      }
      let _query = {
        fundQuery: this.fundQuery
      };
      this.$router.push({ path: "/fundAll", query: _query });
    },
    // 公司名称跳转
    companyItemClick(data) {
      let routeData = this.$router.resolve({
        path: "/company",
        query: {
          companyId: data.companyId,
          companyName: data.companyName
        }
      });
      window.open(routeData.href, "_blank");
    },
    // 搜索产业资讯
    getChainNews() {
      getChainSuggest()
        .then(res => {
          if (res.code === 200) {
            this.loading = false;
            this.newsLists = res.data;
            this.$nextTick(() => {
              let _len = this.newsLists.length;
              let _data = [];
              for (let i = 0; i < _len; i++) {
                let _ref = this.$refs["chainListBox" + i][0];
                let _item = _ref.childNodes[1].clientHeight;
                if (_item) {
                  _data.push(_item);
                }
              }
              this.chainListBoxsHeight = _data;
            });
          }
        })
        .catch(rej => {
          console.log(rej);
        });
    },
    // 搜索产业机会
    getCompanyLists() {
      getCompanySuggest()
        .then(res => {
          if (res.code === 200) {
            this.chanceData = res.data;
            this.showChanceData = this.chanceData.slice(0, this.pageSize);
          }
        })
        .catch(rej => {
          console.log(rej);
        });
    },
    // 点击相关产业链
    chainItemClick(item) {
      let routeData = this.$router.resolve({
        path: "/index",
        query: { chainId: item.chainId, nodeName: item.chainName }
      });
      window.open(routeData.href, "_blank");
    },
    // 展开更多相关产业链
    moreButtonClick(index) {
      let _this = this.$refs["chainListBox" + index][0];
      let _h = _this.clientHeight;
      if (_h === 135) {
        _this.style.height = "auto";
      } else {
        _this.style.height = "135px";
      }
    },
    // 公司分页
    companyPageChange(val) {
      let start = (val - 1) * this.pageSize;
      let end = val * this.pageSize;
      this.showChanceData = this.chanceData.slice(start, end);
    }
  }
};
</script>

<style lang="less">
.chain-index-main {
  width: 100%;
  height: 100%;
  max-width: 1920px;
  margin: 0 auto;
}
.chain-index-header {
  position: relative;
  width: 100%;
  height: 465px;
  background: url(../assets/img/chain-index-header-bg.png) no-repeat center top;
  .logo-box {
    position: absolute;
    display: flex;
    width: 170px;
    height: 54px;
    left: 0;
    top: 0;
    align-items: center;
    padding-left: 20px;
    cursor: default;
    .logo {
      margin: 0;
      margin-right: 10px;
      width: 21px;
      height: 21px !important;
    }
    .logo-text {
      font-size: 18px;
      color: #fff;
    }
  }
  .userMenuBox {
    position: absolute;
    right: 0;
    top: 5px;
  }
  .style-icon {
    display: inline-block;
    height: 30px;
    color: #fff;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    position: relative;
    border-radius: 2px;
  }
  .style-icon i {
    font-size: inherit;
    color: inherit;
  }
  .small-icon {
    width: 56px;
    font-size: 18px;
    background: transparent;
    border: none;
    margin-top: 5px;
  }
  .button-icon {
    width: 100px;
    font-size: 14px;
  }
  .style-icon:hover {
    color: rgb(243, 243, 243);
  }
  .searchBox {
    position: absolute;
    width: 880px;
    left: 50%;
    top: 145px;
    margin-left: -400px;
    .autocomplete {
      width: 100%;
      &.el-input,
      .el-input {
        font-size: 16px;
      }
      .el-input__suffix {
        right: 15px;
        font-size: 20px;
      }
    }
    .searchCompanyBox {
      left: 0;
      top: 115px;
      background: #fff;
      z-index: 400;
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
    }
  }
  .searchTab {
    width: 100%;
    height: 36px;
    margin-bottom: 20px;
    span {
      display: inline-block;
      padding: 0 20px;
      font-size: 14px;
      line-height: 36px;
      color: #fff;
      cursor: pointer;
      & + span {
        margin-left: 40px;
      }
      &.active {
        background: #5063df;
      }
    }
  }
  .el-input__inner {
    border-radius: 0;
    height: 56px;
    line-height: 56px;
  }
  .listTab {
    position: absolute;
    width: 100%;
    height: 80px;
    bottom: 0;
    background: #484b5a;
    > div {
      display: flex;
      width: 100%;
      height: 100%;
      max-width: 1200px;
      margin: 0 auto;
      > div {
        display: inline-block;
        width: 50%;
        height: 100%;
        padding-left: 100px;
        padding-top: 15px;
        cursor: pointer;
        &.active {
          background: #5063df;
        }
      }
    }
    .listTitle {
      font-size: 20px;
      line-height: 30px;
      color: #fff;
    }
    .listSubTitle {
      font-size: 14px;
      line-height: 24px;
      color: #fff;
    }
  }
}
.chain-index-listBox {
  width: 100%;
  min-height: calc(100% - 465px);
  background: #fff;
  padding-top: 35px;
  .noMore {
    width: 100%;
    height: 45px;
    text-align: center;
    font-size: 14px;
    line-height: 45px;
    color: rgb(204, 204, 204);
  }
}
.chain-news-list {
  width: 1200px;
  margin: 0 auto;
  .newsItem {
    border: 1px solid rgb(234, 234, 234);
    margin-bottom: 20px;
    cursor: default;
    > .title {
      font-size: 22px;
      line-height: 60px;
      text-align: left;
      text-indent: 40px;
      padding-right: 200px;
      border-bottom: 1px solid rgb(238, 238, 238);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      a {
        color: rgb(51, 51, 51);
      }
      span {
        cursor: pointer;
        &:hover {
          color: #3851f6;
        }
      }
    }
    .contentBox {
      display: flex;
      width: 100%;
      font-size: 14px;
      padding: 20px 40px;
      .title {
        line-height: 30px;
        color: rgb(51, 51, 51);
      }
    }
    .content {
      width: 50%;
      padding-right: 60px;
      .text {
        height: 72px;
        text-indent: 28px;
        text-align: justify;
        color: rgb(102, 102, 102);
        line-height: 24px;
        margin-top: 5px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
      .time {
        margin-top: 25px;
        color: rgb(170, 170, 170);
      }
    }
    .chain {
      width: 50%;
      height: 135px;
      overflow: hidden;
      > .title {
        position: relative;
      }
      .moreButton {
        position: absolute;
        right: 0;
        color: #cccccc;
        border: 1px solid #cccccc;
        padding: 0 5px;
        line-height: 22px;
        &::before {
          content: "∨ ";
        }
        &:hover {
          color: #cccccc;
          background: transparent;
        }
      }
      .chainList {
        display: flex;
        flex-wrap: wrap;
        span {
          display: inline-block;
          padding: 0 10px;
          color: #3851f6;
          border: 1px solid #3851f6;
          margin-right: 10px;
          margin-top: 10px;
          cursor: default;
          &:hover {
            color: #fff;
            background: #3851f6;
          }
        }
      }
    }
    &:hover {
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
    }
  }
}
.chain-chance-list {
  width: 1200px;
  margin: 0 auto;
  .chanceListTh {
    background: #eceef6;
    font-size: 22px;
    line-height: 35px;
    color: rgb(51, 51, 51);
    font-weight: normal;
  }
  .chanceListTr {
    height: 80px;
    font-size: 16px;
    .cell {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .el-pagination {
    height: 100px;
    padding-top: 35px;
    text-align: center;
  }
  a {
    color: rgb(51, 51, 51);
  }
}

/*my-center-dropdown*/
.my-center-dropdown {
  padding: 0;
  width: 170px;
  text-align: center;
  border-radius: 2px;
  border: none;
  z-index: 3000 !important;
}
.my-center-dropdown li {
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #5f5f5f;
}
.my-center-dropdown li a {
  font-size: 14px;
  color: inherit;
  display: block;
  text-align: center;
}
.my-center-dropdown li:hover,
.my-center-dropdown .el-dropdown-menu__item:hover {
  background: #eee;
  color: #000;
}

.model-pop {
  background: rgb(247, 247, 247);
  position: relative;
  margin-top: 4px !important;
  border: none !important;
  border-top: 2px solid #43b9e5 !important;
  padding: 0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.autocompletePopper {
  border-radius: 0;
}
</style>
