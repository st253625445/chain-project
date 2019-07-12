<template>
  <div class="listedInfoBox" v-loading="listedLoading">
    <div class="countBox">
      <div class="companyItemBox">
        <div class="title">{{ sideNavData[0] }}</div>
        <el-row>
          <el-col :span="6">股票代码：{{ stockInfo.code | isNoData }}</el-col>
          <el-col :span="6"
            >总 市 值：{{ stockInfo.totalMarketValue | unitChange }}元</el-col
          >
          <el-col :span="6"
            >流通市值：{{ stockInfo.flowOfMarketValue | unitChange }}元</el-col
          >
          <el-col :span="6"
            >市 盈 率：{{ stockInfo.peRatio | isNoData }}</el-col
          >
        </el-row>
        <el-row>
          <el-col :span="6"
            >上市类型：{{ stockInfo.listType | isNoData }}</el-col
          >
          <el-col :span="6"
            >上市日期：{{ stockInfo.listDateBond | isNoData }}</el-col
          >
          <el-col :span="6"
            >网上发行日期：{{
              stockInfo.issueDateOnlineBond | isNoData
            }}</el-col
          >
          <el-col :span="6"></el-col>
        </el-row>
      </div>
      <div class="companyItemBotitlex">
        <div class="title">{{ sideNavData[1] }}</div>
        <el-row>
          <el-col :span="12">公司全称：{{ basicInfo.name | isNoData }}</el-col>
          <el-col :span="12"
            >英文名称：{{ basicInfo.englishName | isNoData }}</el-col
          >
        </el-row>
        <el-row>
          <el-col :span="6">
            所属行业：{{ basicInfo.eastFinanceIndustry | isNoData }}
          </el-col>
          <el-col :span="6"
            >上市曾用名：{{ basicInfo.historyNames | isNoData }}</el-col
          >
          <el-col :span="6">
            注册资本：{{ basicInfo.regCapitalNumClean | unitChange }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6"
            >管理人员数：{{ basicInfo.managerCount | isNoData }}</el-col
          >
          <el-col :span="6"
            >雇员人数：{{ basicInfo.employeeCount | isNoData }}</el-col
          >
        </el-row>
      </div>
      <div class="companyItemBox">
        <div class="title">{{ sideNavData[2] }}</div>
        <el-row>
          <el-col :span="12">A股代码：{{ stockInfo.codeA | isNoData }}</el-col>
          <el-col :span="12"
            >A股简称：{{ stockInfo.abbrNameOfA | isNoData }}</el-col
          >
        </el-row>
        <el-row>
          <el-col :span="12">B股代码：{{ stockInfo.codeB | isNoData }}</el-col>
          <el-col :span="12"
            >B股简称：{{ stockInfo.abbrNameOfB | isNoData }}</el-col
          >
        </el-row>
        <el-row>
          <el-col :span="12">H股代码：{{ stockInfo.codeH | isNoData }}</el-col>
          <el-col :span="12"
            >H股简称：{{ stockInfo.abbrNameOfH | isNoData }}</el-col
          >
        </el-row>
        <el-row>
          <el-col :span="12"
            >证券类别：{{ stockInfo.securityType | isNoData }}</el-col
          >
          <el-col :span="12"
            >律师事务所：{{ stockInfo.lawFirm | isNoData }}</el-col
          >
        </el-row>
        <el-row>
          <el-col :span="12"
            >会计师事务所：{{ stockInfo.accountFirm | isNoData }}</el-col
          >
        </el-row>
      </div>
      <div class="companyItemBox">
        <div class="title">{{ sideNavData[3] }}</div>
        <el-row>
          <el-col :span="12"
            >总 经 理：{{ keyPerson["总经理"] | textJoin }}</el-col
          >
          <el-col :span="12"
            >法人代表：{{ keyPerson["法定代表人"] | textJoin }}</el-col
          >
        </el-row>
        <el-row>
          <el-col :span="12"
            >董 秘：{{ keyPerson["董事会秘书"] | textJoin }}</el-col
          >
          <el-col :span="12"
            >董 事 长：{{ keyPerson["董事长"] | textJoin }}</el-col
          >
        </el-row>
        <el-row>
          <el-col :span="12"
            >证券事务代表：{{ keyPerson["证券事务代表"] | textJoin }}</el-col
          >
          <el-col :span="12"
            >独立董事：{{ keyPerson["独立董事"] | textJoin }}</el-col
          >
        </el-row>
      </div>
      <div class="companyItemBox">
        <div class="title">{{ sideNavData[4] }}</div>
        <el-row>
          <el-col :span="12"
            >联系电话：{{ contactData.phoneNumber | isNoData }}</el-col
          >
          <el-col :span="12"
            >电子邮箱：{{ contactData.email | isNoData }}</el-col
          >
        </el-row>
        <el-row>
          <el-col :span="12">传 真：{{ contactData.fax | isNoData }}</el-col>
          <el-col :span="12">
            公司网址：
            <a
              :href="'http://' + contactData.website"
              target="_blank"
              class="linkSpan"
            >
              {{ contactData.website | isNoData }}
            </a>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">区 域：{{ contactData.base | isNoData }}</el-col>
          <el-col :span="12"
            >邮政编码：{{ contactData.postCode | isNoData }}</el-col
          >
        </el-row>
        <el-row>
          <el-col :span="24"
            >办公地址：{{ contactData.officeAddress | isNoData }}</el-col
          >
        </el-row>
        <el-row>
          <el-col :span="24"
            >注册地址：{{ contactData.regLocation | isNoData }}</el-col
          >
        </el-row>
      </div>
      <div class="companyItemBox">
        <div class="title">{{ sideNavData[5] }}</div>

        <el-table
          :data="shareholderData"
          stripe
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="shareName"
            label="股东名称"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column label="股份类型" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>
                {{ scope.row.shareType | isNoData }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="持股数(股)" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>
                {{ scope.row.numberOfShare | rgxNumberNoFixed }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="持股比例" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>
                {{ scope.row.ratio | percentageChange }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="增减(股)" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span
                :class="{
                  red: scope.row.addOrReduce > 0,
                  green: scope.row.addOrReduce < 0
                }"
              >
                {{ scope.row.addOrReduce | rgxNumberNoFixed(true) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="变动比例" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <template
                v-if="scope.row.addOrReduce > 0 && scope.row.changeRatio"
              >
                <span class="icon-up" />
                <span class="red">
                  {{ scope.row.changeRatio | percentageChange }}</span
                >
              </template>
              <template
                v-else-if="scope.row.addOrReduce < 0 && scope.row.changeRatio"
              >
                <span class="icon-down" />
                <span class="green">
                  {{ scope.row.changeRatio | percentageChange }}</span
                >
              </template>
              <template v-else>
                <span>{{ scope.row.changeRatio | percentageChange }}</span>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="companyItemBox">
        <div class="title">{{ sideNavData[6] }}</div>
        <el-table
          :data="ceoDataShow"
          stripe
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>
                {{
                  scope.$index +
                    (ceoPagination.page - 1) * ceoPagination.pageSize +
                    1
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column label="年龄" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>
                {{ scope.row.age | isNoData }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="性别" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span v-if="scope.row.sex === '1'">
                男
              </span>
              <span v-else-if="scope.row.sex === '2'">
                女
              </span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column label="学历" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>
                {{ scope.row.education | isNoData }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="职务" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span>
                {{ scope.row.position | isNoData }}
              </span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 20]"
          :page-size="ceoPagination.pageSize"
          layout="prev, pager, next, sizes, jumper"
          :total="ceoPagination.total"
          :current-page="ceoPagination.page"
        >
        </el-pagination>
      </div>
      <div class="companyItemBox">
        <div class="title">{{ sideNavData[7] }}</div>
        <el-row>
          <el-col :span="12"
            >成立日期：{{ stockInfo.establishDate | isNoData }}</el-col
          >
          <el-col :span="12"
            >上市日期：{{ stockInfo.listDateIssue | isNoData }}</el-col
          >
        </el-row>
        <el-row>
          <el-col :span="12"
            >发行方式：{{ stockInfo.issueMode | isNoData }}</el-col
          >
          <el-col :span="12"
            >发行量(股)：{{ stockInfo.circulation | unitChange }}</el-col
          >
        </el-row>
        <el-row>
          <el-col :span="12"
            >发行总市值(元)：{{
              stockInfo.issueMarketValue | unitChange
            }}</el-col
          >
          <el-col :span="12">每股发行价(元)：{{ stockInfo.issuePrice }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="12"
            >募集资金净额(元)：{{ stockInfo.netFundRais | unitChange }}</el-col
          >
          <el-col :span="12">
            首日开盘价(元)：{{ stockInfo.openPriceF | isNoData }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12"
            >首日收盘价(元)：{{ stockInfo.closePriceF | isNoData }}</el-col
          >
          <el-col :span="12"
            >首日换手率：{{
              stockInfo.turnOverRateF | percentageChange
            }}</el-col
          >
        </el-row>
        <el-row>
          <el-col :span="12"
            >网下配售中签率：{{
              stockInfo.ratioOffLine | percentageChange
            }}</el-col
          >
          <el-col :span="12"
            >定价中签率：{{ stockInfo.priceWinRate | percentageChange }}</el-col
          >
        </el-row>
      </div>
      <div class="companyItemBox">
        <div class="title">{{ sideNavData[8] }}</div>

        <el-table
          :data="capitalData"
          stripe
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="label" label="股份构成(万股)/变更日期">
          </el-table-column>
          <el-table-column
            v-for="(item, index) in capitalTime"
            :key="index"
            :label="item.label"
          >
            <template slot-scope="scope">
              <span>
                {{ scope.row[item.index] | rgxNumberNoFixed }}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="companyItemBox">
        <div class="title">{{ sideNavData[9] }}</div>
        <p v-for="(item, index) in coreTopicsData" :key="index">
          <span>{{ item.topicTitle }}:</span><br />
          <span>{{ item.topicContent }}</span>
        </p>
      </div>
    </div>
    <div class="sideNav">
      <ul>
        <li
          v-for="(item, index) in sideNavData"
          :key="index"
          :class="{ active: sideNavVal === index }"
        >
          <span @click="sideNavValChange(index)">{{ item }}</span>
        </li>
      </ul>
    </div>
    <i class="toTopButton el-icon-arrow-up" @click="toUpScroll"></i>
  </div>
</template>

<script>
import {
  getCompanyBasicInfo,
  getCompanyKeyPerson,
  getCompanyContact,
  getCompanyStockInfo,
  getCompanyTenShareHolder,
  getCompanyExecutives,
  getCompanyEquity,
  getCompanyCoreTopics
} from "@/api/getData";
import { Promise } from "q";
import mixin from "./mixin";
export default {
  props: ["companyId"],
  mixins: [mixin],
  data() {
    return {
      listedLoading: false,
      sideNavData: [
        "股票详情",
        "基本信息",
        "证券信息",
        "重要人员",
        "联系信息",
        "十大股东",
        "公司高管",
        "发行相关",
        "股本结构",
        "核心题材"
      ],
      sideNavVal: 0,
      stockInfo: {}, // 股票信息
      basicInfo: {}, // 基本信息
      keyPerson: {}, // 重要人员
      contactData: {}, // 联系信息
      shareholderData: [], // 十大股东数据
      ceoDataAll: [], // 高管信息总数据
      ceoDataShow: [], // 高管信息分页数据
      ceoPagination: {
        page: 1,
        pageSize: 5,
        total: 0
      }, // 高管信息分页信息
      capitalTime: [], // 股本结构日期
      capitalData: [], // 股本结构
      coreTopicsData: [] // 核心题材
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取所有数据
    getData() {
      this.listedLoading = true;
      Promise.all([
        this.getBasicInfo(),
        this.getKeyPerson(),
        this.getContact(),
        this.getStockInfo(),
        this.getTenShareHolder(),
        this.getExecutives(),
        this.getEquity(),
        this.getCoreTopics()
      ]).then(res => {
        console.log(res);
        this.listedLoading = false;
        this.setNav();
      });
    },
    // 上市公司基本信息
    getBasicInfo() {
      return new Promise(resolve => {
        getCompanyBasicInfo({ companyId: this.companyId })
          .then(res => {
            if (res.code === 200) {
              this.basicInfo = res.data;
            }
            resolve();
          })
          .catch(rej => {
            console.log(rej);
            resolve();
          });
      });
    },
    // 上市公司核心人物信息
    getKeyPerson() {
      return new Promise(resolve => {
        getCompanyKeyPerson({ companyId: this.companyId })
          .then(res => {
            if (res.code === 200) {
              this.keyPerson = res.data;
            }
            resolve();
          })
          .catch(rej => {
            console.log(rej);
            resolve();
          });
      });
    },
    // 上市公司联系方式
    getContact() {
      return new Promise(resolve => {
        getCompanyContact({ companyId: this.companyId })
          .then(res => {
            if (res.code === 200) {
              this.contactData = res.data;
            }
            resolve();
          })
          .catch(rej => {
            console.log(rej);
            resolve();
          });
      });
    },
    // 上市公司股票信息
    getStockInfo() {
      return new Promise(resolve => {
        getCompanyStockInfo({ companyId: this.companyId })
          .then(res => {
            if (res.code === 200) {
              this.stockInfo = res.data;
            }
            resolve();
          })
          .catch(rej => {
            console.log(rej);
            resolve();
          });
      });
    },
    // 上市公司十大股东
    getTenShareHolder() {
      return new Promise(resolve => {
        getCompanyTenShareHolder({ companyId: this.companyId })
          .then(res => {
            if (res.code === 200) {
              this.shareholderData = res.data;
            }
            resolve();
          })
          .catch(rej => {
            console.log(rej);
            resolve();
          });
      });
    },
    // 上市公司高管信息
    getExecutives() {
      return new Promise(resolve => {
        getCompanyExecutives({ companyId: this.companyId })
          .then(res => {
            if (res.code === 200) {
              this.ceoDataAll = res.data;

              let start =
                (this.ceoPagination.page - 1) * this.ceoPagination.pageSize;
              let end = this.ceoPagination.page * this.ceoPagination.pageSize;
              this.ceoDataShow = this.ceoDataAll.slice(start, end);
              this.ceoPagination.total = res.data.length;
            }
            resolve();
          })
          .catch(rej => {
            console.log(rej);
            resolve();
          });
      });
    },
    // 上市公司股本结构信息
    getEquity() {
      return new Promise(resolve => {
        this.capitalTime = [];
        this.capitalData = [
          { label: "股份总数" },
          { label: "已上市流通A股" },
          { label: "受限流通股份" }
        ];
        getCompanyEquity({ companyId: this.companyId })
          .then(res => {
            if (res.code === 200) {
              let _data = res.data;
              for (let key in _data) {
                for (let i = 0; i < _data[key].length; i++) {
                  this.capitalTime.push({
                    index: `${key}${i}`,
                    label: `${key}`
                  });
                  this.capitalData[0][`${key}${i}`] = _data[key][i].totalShares;
                  this.capitalData[1][`${key}${i}`] =
                    _data[key][i].circulateShares;
                  this.capitalData[2][`${key}${i}`] =
                    _data[key][i].limitedShares;
                }
              }
            }
            resolve();
          })
          .catch(rej => {
            console.log(rej);
            resolve();
          });
      });
    },
    // 上市公司核心题材信息
    getCoreTopics() {
      return new Promise(resolve => {
        getCompanyCoreTopics({ companyId: this.companyId })
          .then(res => {
            if (res.code === 200) {
              this.coreTopicsData = res.data;
            }
            resolve();
          })
          .catch(rej => {
            console.log(rej);
            resolve();
          });
      });
    },
    // 页码每页条数改变
    handleSizeChange(val) {
      this.ceoPagination.pageSize = val;
      this.ceoPagination.page = 1;
      let start = (this.ceoPagination.page - 1) * this.ceoPagination.pageSize;
      let end = this.ceoPagination.page * this.ceoPagination.pageSize;
      this.ceoDataShow = this.ceoDataAll.slice(start, end);
    },
    // 页码跳转
    handleCurrentChange(val) {
      this.ceoPagination.page = val;
      let start = (this.ceoPagination.page - 1) * this.ceoPagination.pageSize;
      let end = this.ceoPagination.page * this.ceoPagination.pageSize;
      this.ceoDataShow = this.ceoDataAll.slice(start, end);
    }
  }
};
</script>

<style lang="less">
span.red {
  color: #ff4a4a;
}
span.green {
  color: #4dab45;
}
span.icon-up {
  position: relative;
  display: inline-block;
  width: 1em;
  height: 1em;
  line-height: 23px;
  background: #ff4a4a;
  vertical-align: middle;
  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-width: 0.4em;
    border-style: solid;
    top: -0.1em;
    left: 0.1em;
    border-color: transparent transparent #fff transparent;
  }
}
span.icon-down {
  position: relative;
  display: inline-block;
  width: 1em;
  height: 1em;
  line-height: 23px;
  background: #4dab45;
  vertical-align: middle;
  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-width: 0.4em;
    border-style: solid;
    top: 0.3em;
    left: 0.1em;
    border-color: #fff transparent transparent transparent;
  }
}
</style>
